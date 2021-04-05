
using System;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IOverviewResultService
    {
        Task<OverviewResult> GetOverviewResultAsync(Guid sessionId);
    }
}