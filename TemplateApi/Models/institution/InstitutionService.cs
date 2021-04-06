
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class InstitutionService : IInstitutionService
    {
        private readonly DataContext _dataContext;

        public InstitutionService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Institution>> GetInstitutionsAsync()
        {
            // TODO add caching
            return await _dataContext.Institutions.ToListAsync();
        }
    }
}