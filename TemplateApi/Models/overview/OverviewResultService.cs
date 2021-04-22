
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class OverviewResultService : IOverviewResultService
    {
        private readonly DataContext _dataContext;
        private readonly IRegionService _regionService;
        private readonly IYearService _yearService;
        private readonly ISessionService _sessionService;

        public OverviewResultService(
            DataContext dataContext,
            IRegionService regionService,
            IYearService yearService,
            ISessionService sessionService
        )
        {
            _dataContext = dataContext;
            _regionService = regionService;
            _yearService = yearService;
            _sessionService = sessionService;
        }

        /// <summary>
        /// Gets OverviewResult for a given session, optionally overriding the institutionId
        /// </summary>
        /// <param name="sessionId"></param>
        /// <param name="institutionId"></param>
        /// <returns></returns>
        public async Task<OverviewResult> GetOverviewResultAsync(
            Guid sessionId,
            int? institutionId = null,
            MarketShareModel? marketShareModel = null
        )
        {
            var session = await _sessionService.GetSession(sessionId);
            int instId = institutionId ?? session.InstitutionId;
            int regionId = session.RegionId;
            MarketShareModel msModel = marketShareModel ?? session.MarketShareModel;
            bool hasCustomMarketShare = msModel == MarketShareModel.Custom;

            var result = new OverviewResult();

            result.YearSummary = await _yearService.GetYearSummaryAsync();
            int indexYear = result.YearSummary.FirstObserved;

            var observedPoints = await GetObservedPoints(instId, regionId);
            var predictedPoints = await GetPredictedPoints(instId, regionId, msModel, hasCustomMarketShare, sessionId);

            result.Observed = new OverviewDataset(observedPoints, null, indexYear);
            result.Predicted = new OverviewDataset(predictedPoints, observedPoints, indexYear);

            // If MostRecentYear scenario selected, just copy Prediction into Baseline
            if (msModel == MarketShareModel.MostRecentYear)
            {
                result.Baseline = result.Predicted;
            }
            else
            {
                var baselinePoints = await GetPredictedPoints(instId, regionId, MarketShareModel.MostRecentYear, hasCustomMarketShare, sessionId);
                result.Baseline = new OverviewDataset(baselinePoints, observedPoints, indexYear);
                result.HasPredicted = true;
            }

            result.RegionRows = await GetRegionRows(
                result.YearSummary,
                result.Observed,
                result.Baseline,
                result.Predicted,
                result.HasPredicted,
                regionId
            );

            return result;
        }

        private async Task<List<DataPoint>> GetObservedPoints(int unitId, int regionId)
        {
            // throw new NotImplementedException();
            var dataPoints = await _dataContext.DataPoints
                .FromSqlInterpolated($@"select inst.year
	, inst.region_id
    , false as is_forecast
	, inst.enrollment
	, inst.enrollment_share as market_share
    , null as population
    , null as percent_total_enrollment
from public.observed_enrollment inst
join public.regions r
	on inst.region_id = r.id
where inst.unitid = {unitId}
    -- Show all regions for type 0, else filter by regionId
	and (0 = {regionId} or inst.region_id = {regionId})
order by inst.enrollment desc")
                .ToListAsync();

            return dataPoints;
        }

        private async Task<List<DataPoint>> GetPredictedPoints(
            int unitId,
            int regionId,
            MarketShareModel marketShareModel,
            bool hasCustomMarketShare,
            Guid sessionId
        )
        {
            if (hasCustomMarketShare)
            {
                return await GetPredictedPointsCustom(unitId, regionId, sessionId);
            }
            return await GetPredictedPointsStandard(unitId, regionId, marketShareModel);
        }

        private async Task<List<DataPoint>> GetPredictedPointsStandard(
            int unitId,
            int regionId,
            MarketShareModel marketShareModel
        )
        {
            // throw new NotImplementedException();
            var dataPoints = await _dataContext.DataPoints
                .FromSqlInterpolated($@"select pe.year
	, pe.region_id
	, true as is_forecast
	, pe.enrollment * shr.market_share as enrollment
	, shr.market_share
	, pe.enrollment as population
    , null as percent_total_enrollment
from public.predicted_market_enrollment pe 
join public.predicted_market_share shr
	on pe.region_id = shr.region_id
		and pe.year = shr.year
left join public.regions r 
	on pe.region_id = r.id 
where shr.unitid = {unitId}
	and shr.market_share_model_id = {marketShareModel}
    -- Show all regions for type 0, else filter by regionId
	and (0 = {regionId} or shr.region_id = {regionId})
order by pe.year
	, pe.region_id")
                .ToListAsync();

            return dataPoints;
        }

        private async Task<List<DataPoint>> GetPredictedPointsCustom(int unitId, int regionId, Guid sessionId)
        {
            // throw new NotImplementedException();
            var dataPoints = await _dataContext.DataPoints
                .FromSqlInterpolated($@"select pe.year
	, pe.region_id
	, true as is_forecast
	, pe.enrollment * shr.market_share as enrollment
	, shr.market_share
	, pe.enrollment as population
    , null as percent_total_enrollment
from public.predicted_market_enrollment pe 
join (
	select r.id as region_id
		, opt.market_share 
	from public.regions r 
	left outer join (
		select *
		from public.session_custom_market_share_option
		where session_id = {sessionId}
	) s
		on r.id = s.region_id
	join public.custom_market_share_option opt
		on r.id = opt.region_id 
			and coalesce(s.option_id, 0) = opt.option_id 
	where r.id <> 0
		and opt.unit_id = {unitId}
) shr
	on pe.region_id = shr.region_id
-- Show all regions for type 0, else filter by regionId
where (0 = {regionId} or shr.region_id = {regionId})
order by pe.year
	, pe.region_id")
                .ToListAsync();

            return dataPoints;
        }

        private async Task<List<RegionRow>> GetRegionRows(
            YearSummary yearSummary,
            OverviewDataset observed,
            OverviewDataset baseline,
            OverviewDataset predicted,
            bool hasPredicted,
            int selectedRegionId
        )
        {
            List<RegionRow> rows = new List<RegionRow>();

            // If "All Regions" is selected, calculate "All Regions" total
            if (selectedRegionId == Region.AllRegionsId)
            {
                var totalRow = new RegionRow(Region.AllRegionsId, Region.AllRegionsName);
                totalRow.YearObservedMap = observed.AggregatedDataPoints.ToDictionary(p => p.Year);
                totalRow.YearBaselineMap = baseline.AggregatedDataPoints.ToDictionary(p => p.Year);
                if (hasPredicted)
                {
                    totalRow.YearPredictedMap = predicted.AggregatedDataPoints.ToDictionary(p => p.Year);
                }
                rows.Add(totalRow);
            }

            // Calculate each region
            ILookup<int, DataPoint> regionObservedMap = observed.DataPoints.ToLookup(p => p.RegionId);
            ILookup<int, DataPoint> regionBaselineMap = baseline.DataPoints.ToLookup(p => p.RegionId);
            ILookup<int, DataPoint> regionPredictedMap = hasPredicted ? predicted.DataPoints.ToLookup(p => p.RegionId) : null;

            var regionIds = GetRegionIdsOrderedByEnrollmentDescending(observed.DataPoints, yearSummary);
            var regions = await _regionService.GetRegionsAsync();
            var regionMap = regions.ToDictionary(r => r.Id);

            foreach (int regionId in regionIds)
            {
                string regionName = regionMap.ContainsKey(regionId) ? regionMap[regionId].Name : null;
                var row = new RegionRow(regionId, regionName);

                row.YearObservedMap = regionObservedMap[regionId].ToDictionary(p => p.Year);
                row.YearBaselineMap = regionBaselineMap[regionId].ToDictionary(p => p.Year);
                if (hasPredicted)
                {
                    row.YearPredictedMap = regionPredictedMap[regionId].ToDictionary(p => p.Year);
                }

                rows.Add(row);
            }

            return rows;
        }

        private List<int> GetRegionIdsOrderedByEnrollmentDescending(List<DataPoint> dataPoints, YearSummary yearSummary)
        {
            int year = yearSummary.LastObserved;

            return dataPoints
                .Where(p => p.Year == year)
                .OrderByDescending(p => p.Enrollment)
                .Select(p => p.RegionId)
                .Distinct()
                .ToList();
        }
    }
}