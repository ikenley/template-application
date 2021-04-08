
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

        public async Task<List<Region>> GetTopRegionsAsync(int institutionId)
        {
            return await _dataContext.Regions.FromSqlInterpolated($@"select r.id 
	, r.name
from public.observed_enrollment e
join public.regions r
	on e.region_id = r.id
where e.unitid = 194824
	and r.id <> 90 -- exclude foreign
	and e.year = (
		select max(year)
		from public.years
		where is_prediction = false
	)
order by e.enrollment desc
limit 10
;
            ").ToListAsync();
        }
    }
}