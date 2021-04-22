
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class RegionService : IRegionService
    {
        private readonly DataContext _dataContext;

        public RegionService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Region>> GetRegionsAsync()
        {
            return await _dataContext.Regions.Select(r => r).ToListAsync();
        }

        public async Task<List<RegionDataPoint>> GetTopRegionsAsync(int institutionId, int limit = 10)
        {
            return await _dataContext.RegionDataPoints.FromSqlInterpolated($@"select r.id 
	, r.name
	, r.long_name 
	, e.enrollment 
	, e.enrollment_share as market_share
	, mk.enrollment as population
from public.observed_enrollment e
join public.regions r
	on e.region_id = r.id
join public.observed_market_enrollment mk
	on r.id = mk.region_id 
join (
	select max(year) as last_observed_year
	from public.years
	where is_prediction = false
) y
	on e.year = y.last_observed_year
		and mk.year = y.last_observed_year
where e.unitid = {institutionId}
	and r.id <> 90 -- exclude foreign
order by e.enrollment desc
limit {limit}
;
            ").ToListAsync();
        }
    }
}