
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IRegionService
    {
        Task<List<Region>> GetRegionsAsync();

        /// <summary>Gets top x Regions for a given Institution</summary>
        Task<List<Region>> GetTopRegionsAsync(int institutionId);
    }
}