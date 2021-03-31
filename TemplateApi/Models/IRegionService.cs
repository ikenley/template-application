
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IRegionService
    {
        Task<List<Region>> GetRegionsAsync();
    }
}