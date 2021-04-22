
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class MarketInfoService : IMarketInfoService
    {
        private readonly DataContext _dataContext;
        private readonly IYearService _yearService;

        public MarketInfoService(DataContext dataContext, IYearService yearService)
        {
            _dataContext = dataContext;
            _yearService = yearService;
        }

        public async Task<MarketInfoResult> GetMarketInfoResultAsync(int institutionId)
        {
            var result = new MarketInfoResult();

            result.YearSummary = await _yearService.GetYearSummaryAsync();

            result.MarketInfoRows = await GetMarketInfoRowsAsync(institutionId);

            return result;
        }

        private async Task<List<MarketInfoRow>> GetMarketInfoRowsAsync(int institutionId)
        {

            var rows = await _dataContext.MarketInfoRows.FromSqlInterpolated($@"select r.id as region_id
	, r.name as region_name
	, coalesce(inst.enrollment, 0) as enrollment
	, coalesce(inst.enrollment_share, 0) as enrollment_share
	, pmin.year as pmin_year
	, pmin.enrollment as pmin_market_enrollment
	, pmax.year as pmax_year
	, pmax.enrollment as pmax_market_enrollment
	, 	case 
			when pmin.enrollment is null then 0
			when pmin.enrollment = 0 then 0
			else (pmax.enrollment - pmin.enrollment) / pmin.enrollment
		end as predicted_market_growth
from public.regions r 
join (
	select *
	from predicted_market_enrollment pme 
	where pme.year = (
		select min(y.year) 
		from public.years y 
		where is_prediction = true
	)
) pmin
	on r.id = pmin.region_id
join (
	select *
	from predicted_market_enrollment pme 
	where pme.year = (
		select max(y.year) 
		from public.years y 
		where is_prediction = true
	)
) pmax
	on pmin.region_id = pmax.region_id
left join (
	select region_id
		, enrollment
		, enrollment_share
	from public.observed_enrollment
	where unitid = {institutionId}
		and year = (
			select max(y.year) 
			from public.years y 
			where is_prediction = false
		)
) inst 
	on r.id = inst.region_id 
order by predicted_market_growth desc
;"
            ).ToListAsync();

            return rows;
        }

        public async Task<List<PredictedMarketEnrollment>> GetPredictedMarketEnrollmentsAsync(int regionId)
        {
            return await _dataContext.PredictedMarketEnrollment
                .Where(pm => pm.RegionId == regionId)
                .OrderBy(pm => pm.Year)
                .ToListAsync();
        }
    }
}