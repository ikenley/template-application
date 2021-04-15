
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IYearService
    {
        Task<YearSummary> GetYearSummaryAsync();
    }
}