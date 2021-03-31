
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

        public OverviewResultService(DataContext dataContext, IRegionService regionService)
        {
            _dataContext = dataContext;
            _regionService = regionService;
        }

        public async Task<OverviewResult> GetOverviewResultAsync()
        {
            // TODO get values from session
            string unitId = "194824";
            var result = new OverviewResult();

            var observedPoints = await GetObservedPoints(unitId);
            var predictedPoints = await GetPredictedPoints(unitId);

            ImputePredictedForeignDataPoints(observedPoints, predictedPoints);

            result.ObservedPoints = AggreggateByYear(observedPoints);
            result.PredictedPoints = AggreggateByYear(predictedPoints);

            var allDataPoints = observedPoints.Concat(predictedPoints).ToList();

            result.Years = GetYears(allDataPoints);
            result.RegionIds = GetRegionIdsOrderedByEnrollmentDescending(allDataPoints);

            result.RegionRows = await GetRegionRows(allDataPoints, result.RegionIds);

            result.ObservedAverageAnnualGrowth = 0;
            result.PredictedAverageAnnualGrowth = 0;
            result.ProjectedChange = 0;

            return result;
        }

        private async Task<List<DataPoint>> GetObservedPoints(string unitId)
        {
            // throw new NotImplementedException();
            var dataPoints = await _dataContext.DataPoints
                .FromSqlInterpolated($@"select inst.year
	, inst.region_id
    , false as is_forecast
	, inst.enrollment
	, inst.enrollment_share as market_share
    , null as population
from public.observed_enrollment inst
join public.regions r
	on inst.region_id = r.id
where inst.unitid = {unitId}
order by inst.enrollment desc")
                .ToListAsync();

            return dataPoints;
        }

        private async Task<List<DataPoint>> GetPredictedPoints(string unitId)
        {
            // throw new NotImplementedException();
            var dataPoints = await _dataContext.DataPoints
                .FromSqlInterpolated($@"select pe.year
	, pe.region_id
	, true as is_forecast
	, pe.enrollment * shr.enrollment_share as enrollment
	, shr.enrollment_share as market_share
	, pe.enrollment as population
from public.predicted_market_enrollment pe 
join (
	select x.region_id
		, x.enrollment_share 
	from public.observed_enrollment x
	where x.unitid = {unitId}
		and year = 2018
) shr
	on pe.region_id = shr.region_id
left join public.regions r 
	on pe.region_id = r.id 
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
                .First();

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
        /// Aggreggates points by year
        /// </summary>
        /// <param name="points"></param>
        /// <returns></returns>
        private List<DataPoint> AggreggateByYear(List<DataPoint> points)
        {
            return points.GroupBy(p => p.Year)
                .Select(g => new DataPoint
                {
                    Year = g.First().Year,
                    RegionId = -1,
                    IsForecast = g.First().IsForecast,
                    Enrollment = g.Sum(f => f.Enrollment),
                    MarketShare = null, // TODO?
                    Population = g.Sum(f => f.Population)
                })
                .ToList();
        }

        private async Task<List<RegionRow>> GetRegionRows(List<DataPoint> dataPoints, List<int> regionIds)
        {
            ILookup<int, DataPoint> regionDataPointMap = dataPoints.ToLookup(p => p.RegionId);

            var regions = await _regionService.GetRegionsAsync();
            var regionMap = regions.ToDictionary(r => r.Id);

            List<RegionRow> rows = new List<RegionRow>();
            foreach (int regionId in regionIds)
            {
                var row = new RegionRow { RegionId = regionId };

                row.RegionName = regionMap.ContainsKey(regionId) ? regionMap[regionId].Name : null;

                row.YearDataPointMap = regionDataPointMap[regionId].ToDictionary(p => p.Year);

                rows.Add(row);
            }

            return rows;
        }

        private List<int> GetYears(List<DataPoint> dataPoints)
        {
            return dataPoints
                .Select(p => p.Year)
                .Distinct()
                .OrderBy(p => p)
                .ToList();
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
    }
}