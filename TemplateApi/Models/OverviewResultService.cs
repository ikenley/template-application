
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

        public OverviewResultService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<OverviewResult> GetOverviewResultAsync()
        {
            // TODO get values from session
            string unitId = "194824";
            var result = new OverviewResult();
            result.ObservedPoints = await GetObservedPoints(unitId);
            result.PredictedPoints = await GetPredictedPoints(unitId);
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
    }
}