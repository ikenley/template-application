
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace TemplateApi.Models
{
    public class YearService : IYearService
    {
        IMemoryCache _cache;
        private readonly DataContext _dataContext;

        public YearService(IMemoryCache memoryCache, DataContext dataContext)
        {
            _cache = memoryCache;
            _dataContext = dataContext;
        }

        public async Task<YearSummary> GetYearSummaryAsync()
        {
            YearSummary yearSummary;

            if (!_cache.TryGetValue(CacheKeys.GetYearSummaryAsync, out yearSummary))
            {
                var yearRows = await _dataContext.YearRows.ToListAsync();

                yearSummary = new YearSummary(yearRows);

                _cache.Set(CacheKeys.GetYearSummaryAsync, yearSummary);
            }
            return yearSummary;
        }
    }
}