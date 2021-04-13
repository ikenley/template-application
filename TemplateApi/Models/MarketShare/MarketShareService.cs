
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class MarketShareService : IMarketShareService
    {
        private readonly DataContext _dataContext;
        private readonly IRegionService _regionService;

        public MarketShareService(DataContext dataContext, IRegionService regionService)
        {
            _dataContext = dataContext;
            _regionService = regionService;
        }

        public async Task<MarketShareResult> GetMarketShareResultAsync(MarketShareModel marketShareModel, int institutionId)
        {
            var result = new MarketShareResult();

            result.Regions = await _regionService.GetTopRegionsAsync(institutionId);

            result.MarketShareRowMap = await GetYearMarketShareRowMapAsync(marketShareModel, institutionId);

            return result;
        }

        private async Task<Dictionary<int, Dictionary<int, MarketShareRow>>> GetYearMarketShareRowMapAsync(
            MarketShareModel marketShareModel,
            int institutionId
        )
        {

            var marketShareRows = await _dataContext.MarketShareRows.FromSqlInterpolated($@"select ms.year
	, ms.region_id 
	, ms.market_share 
from public.predicted_market_share ms
join (
	select r.id as region_id
	from public.observed_enrollment e
	join public.regions r
		on e.region_id = r.id
	where e.unitid = {institutionId}
		and r.id <> 90 -- exclude foreign
		and e.year = (
			select max(year)
			from public.years
			where is_prediction = false
		)
	order by e.enrollment desc
	limit 10
) ts
	on ms.region_id = ts.region_id
where ms.market_share_model_id = {marketShareModel}
	and ms.unitid = {institutionId}
order by ms.market_share_model_id 
	, ms.year 
	, ms.market_share desc
	, ms.region_id 
;"
            ).ToListAsync();

            var marketShareRowMap = new Dictionary<int, Dictionary<int, MarketShareRow>>();
            var yearRowMap = marketShareRows.ToLookup(r => r.Year);
            foreach (int year in yearRowMap.Select(m => m.Key))
            {
                marketShareRowMap[year] = yearRowMap[year].ToDictionary(m => m.RegionId);
            }

            return marketShareRowMap;
        }

        /// <summary>
        /// Returns a Lookup of RegionId => CustomMarketShareOption
        /// </summary>
        /// <param name="institutionId"></param>
        /// <returns></returns>
        public async Task<Dictionary<int, List<CustomMarketShareOption>>> GetCustomMarketShareOptionsAsync(int institutionId)
        {
            var options = await _dataContext.CustomMarketShareOption
                .Where(m => m.UnitId == institutionId)
                .ToListAsync();

            var optionLookup = options.ToLookup(opt => opt.RegionId);
            var map = new Dictionary<int, List<CustomMarketShareOption>>();
            foreach (int regionId in optionLookup.Select(opt => opt.Key))
            {
                map[regionId] = optionLookup[regionId].ToList();
            }

            return map;
        }
    }
}