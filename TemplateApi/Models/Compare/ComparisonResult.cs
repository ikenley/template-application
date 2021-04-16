
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Response wrapper for /api/compare
    /// </summary>
    public class ComparisonResult
    {
        public YearSummary YearSummary { get; set; }
        public List<Institution> Institutions { get; set; }
        public List<ComparisonRow> ComparisonRows { get; set; }
    }
}