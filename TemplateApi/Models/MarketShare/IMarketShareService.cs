
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IMarketShareService
    {
        Task<MarketShareResult> GetMarketShareResultAsync(MarketShareModel marketShareModel, int institutionId);

        Task<Dictionary<int, List<CustomMarketShareOption>>> GetCustomMarketShareOptionsAsync(int institutionId);
    }
}