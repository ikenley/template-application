
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
            // TODO add caching
            return await _dataContext.Regions.Select(r => r).ToListAsync();
        }
    }
}