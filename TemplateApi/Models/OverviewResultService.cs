
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
    }
}