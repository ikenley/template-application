
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IMarketShareService
    {
        Task<MarketShareResult> GetMarketShareResultAsync(MarketShareModel marketShareModel, int institutionId);
    }
}