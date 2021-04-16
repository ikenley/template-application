
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
        public async Task<OverviewResult> GetOverviewResultAsync(Guid sessionId, int? institutionId = null)
        {
            var session = await _sessionService.GetSession(sessionId);
            int instId = institutionId ?? session.InstitutionId;
            int regionId = session.RegionId;
            int marketShareModel = (int)session.MarketShareModel;
            bool hasCustomMarketShare = session.MarketShareModel == MarketShareModel.Custom;

            var observedPoints = await GetObservedPoints(instId, regionId);
            var predictedPoints = await GetPredictedPoints(instId, regionId, marketShareModel, hasCustomMarketShare, sessionId);

            ImputePredictedForeignDataPoints(observedPoints, predictedPoints);

            var allDataPoints = observedPoints.Concat(predictedPoints).ToList();

            var result = new OverviewResult();
            result.ObservedPoints = AggreggateByYear(observedPoints);
            result.PredictedPoints = AggreggateByYear(predictedPoints);

            var aggregatedPoints = result.ObservedPoints.Concat(result.PredictedPoints).ToList();
            CalculatePercentTotalEnrollment(allDataPoints, aggregatedPoints);

            result.ObservedAverageAnnualGrowth = GetAverageAnnualGrowthRate(result.ObservedPoints);
            result.PredictedAverageAnnualGrowth = GetAverageAnnualGrowthRate(result.PredictedPoints);
            result.ProjectedChange = GetProjectedChange(result.ObservedPoints, result.PredictedPoints);

            result.RegionIds = GetRegionIdsOrderedByEnrollmentDescending(allDataPoints);

            result.RegionRows = await GetRegionRows(allDataPoints, result.RegionIds);

            result.YearSummary = await _yearService.GetYearSummaryAsync();

            CalculatePercentChangedFromIndex(result.YearSummary, aggregatedPoints);

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
            int marketShareModel,
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

        private async Task<List<DataPoint>> GetPredictedPointsStandard(int unitId, int regionId, int marketShareModel)
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

        /// <summary>
        /// Generates predicted foreign values using observed foreign data
        /// </summary>
        private void ImputePredictedForeignDataPoints(
            List<DataPoint> observedPoints,
            List<DataPoint> predictedPoints
        )
        {
            // Get most recent year of foreign data
            var latest = observedPoints
                .Where(p => p.RegionId == Region.Foreign)
                .OrderByDescending(p => p.Year)
                .FirstOrDefault();

            if (latest == null)
            {
                return;
            }

            // For each prediction year, add copy of most recent foreign data
            int[] predictedYears = predictedPoints
                .Select(p => p.Year)
                .Distinct()
                .ToArray();
            foreach (int year in predictedYears)
            {
                predictedPoints.Add(new DataPoint
                {
                    Year = year,
                    RegionId = Region.Foreign,
                    IsForecast = true,
                    Enrollment = latest.Enrollment,
                    MarketShare = latest.MarketShare,
                    Population = latest.Population
                });
            }
        }

        /// <summary>
        /// Generates predicted foreign values using observed foreign data
        /// </summary>
        private void CalculatePercentTotalEnrollment(
            List<DataPoint> allDataPoints,
            IEnumerable<DataPoint> aggregateDataPoints
        )
        {
            // Create map of year => total enrollment
            var yearTotalEnrollmentMap = aggregateDataPoints.ToDictionary(p => p.Year, t => t.Enrollment);

            // For each DataPoint calculate % of total enrollment for that year
            foreach (var point in allDataPoints)
            {
                if (yearTotalEnrollmentMap.ContainsKey(point.Year))
                {
                    double total = yearTotalEnrollmentMap[point.Year] ?? 0;
                    point.PercentTotalEnrollment = total > 0 ? point.Enrollment / total : null;
                }
            }
        }

        /// <summary>
        /// Aggreggates points by year
        /// </summary>
        /// <param name="points"></param>
        /// <returns></returns>
        private DataPoint[] AggreggateByYear(List<DataPoint> points)
        {
            return points.GroupBy(p => p.Year)
                .Select(g => new DataPoint
                {
                    Year = g.First().Year,
                    RegionId = -1,
                    IsForecast = g.First().IsForecast,
                    Enrollment = Math.Round(g.Sum(f => f.Enrollment) ?? 0),
                    MarketShare = null, // TODO?
                    Population = Math.Round(g.Sum(f => f.Population) ?? 0)
                })
                .OrderBy(p => p.Year)
                .ToArray();
        }

        /// <summary>
        /// Calculates average annual growth rate for an ordered set of data points
        /// As described in: https://www.investopedia.com/terms/a/aagr.asp
        /// </summary>
        /// <param name="points"></param>
        /// <returns></returns>
        private double? GetAverageAnnualGrowthRate(DataPoint[] points)
        {
            if (points.Length == 0)
            {
                return null;
            }
            else if (points.Length == 1)
            {
                return 0;
            }

            // Calculate growth rate for each year
            var growthRates = new List<double>();
            for (int i = 0, j = 1; j < points.Length; j++)
            {
                if (points[i].Enrollment > 0)
                {
                    double growthRate = CalculatePercentChange(points[i], points[j]) ?? 0;
                    growthRates.Add(growthRate);
                }
            }

            double avgAnnualGrowthRate = growthRates.Sum() / growthRates.Count;
            return avgAnnualGrowthRate;
        }

        private double? CalculatePercentChange(DataPoint previous, DataPoint current)
        {
            if (previous == null || current == null || previous.Enrollment == 0)
            {
                return null;
            }

            double prev = previous.Enrollment ?? 0;
            double curr = current.Enrollment ?? 0;

            double growthRate = (curr - prev) / prev;
            return growthRate;
        }

        /// <summary>
        /// Calculates overall percentage change from last observed point to last predicted point
        /// </summary>
        private double? GetProjectedChange(DataPoint[] observedPoints, DataPoint[] predictedPoints)
        {
            if (observedPoints == null
                || observedPoints.Length == 0
                || predictedPoints == null
                || predictedPoints.Length == 0
                || observedPoints[0].Enrollment == 0
            )
            {
                return null;
            }

            double? change = CalculatePercentChange(observedPoints.Last(), predictedPoints.Last());
            return change;
        }

        private async Task<List<RegionRow>> GetRegionRows(List<DataPoint> dataPoints, List<int> regionIds)
        {
            List<RegionRow> rows = new List<RegionRow>();

            // Calculate "All Regions" total
            var totalRow = new RegionRow { RegionId = Region.AllRegionsId, RegionName = Region.AllRegionsName };
            totalRow.YearDataPointMap = AggreggateByYear(dataPoints).ToDictionary(p => p.Year);
            rows.Add(totalRow);

            // Calculate each region
            ILookup<int, DataPoint> regionDataPointMap = dataPoints.ToLookup(p => p.RegionId);

            var regions = await _regionService.GetRegionsAsync();
            var regionMap = regions.ToDictionary(r => r.Id);

            foreach (int regionId in regionIds)
            {
                var row = new RegionRow { RegionId = regionId };

                row.RegionName = regionMap.ContainsKey(regionId) ? regionMap[regionId].Name : null;

                row.YearDataPointMap = regionDataPointMap[regionId].ToDictionary(p => p.Year);

                rows.Add(row);
            }



            return rows;
        }

        private List<int> GetRegionIdsOrderedByEnrollmentDescending(List<DataPoint> dataPoints)
        {
            // TODO determine if Distinct is order-preserving
            // The docs suggest it is not, but it appears to generally work
            return dataPoints
                .OrderByDescending(p => p.Enrollment)
                .Select(p => p.RegionId)
                .Distinct()
                .ToList();
        }

        /// <summary>
        /// Calculates percent changed from baseline year. Assumes all points are in the same region.
        /// </summary>
        private void CalculatePercentChangedFromIndex(YearSummary yearSummary, List<DataPoint> dataPoints)
        {
            var baseline = dataPoints.Where(d => d.Year == yearSummary.FirstObserved).FirstOrDefault();

            if (baseline == null || baseline.Enrollment == null || baseline.Enrollment == 0)
            {
                return;
            }

            foreach (var point in dataPoints)
            {
                point.PercentChangeFromIndex = CalculatePercentChange(baseline, point);
            }
        }
    }
}