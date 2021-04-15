
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Summary stats on years of data available
    /// </summary>
    public class YearSummary
    {
        List<YearRow> Years { get; set; }

        public int FirstObserved { get; set; }
        public int LastObserved { get; set; }

        public int FirstPredicted { get; set; }

        public int LastPredicted { get; set; }

        public YearSummary(List<YearRow> years)
        {
            Years = years;

            var observedYears = years.Where(y => !y.IsPrediction).OrderBy(y => y.Year);
            FirstObserved = observedYears.First().Year;
            LastObserved = observedYears.Last().Year;

            var predictedYears = years.Where(y => y.IsPrediction).OrderBy(y => y.Year);
            FirstPredicted = predictedYears.First().Year;
            LastPredicted = predictedYears.Last().Year;
        }
    }
}