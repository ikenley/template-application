
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IMarketInfoService
    {
        Task<MarketInfoResult> GetMarketInfoResultAsync(int institutionId);
    }
}