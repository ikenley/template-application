
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface IInstitutionService
    {
        Task<List<Institution>> GetInstitutionsAsync();
        Task<List<Institution>> GetInstitutionsAsync(int[] institutionIds);
    }
}