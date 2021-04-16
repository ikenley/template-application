
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Individual row in ComparisonResult. Used for both chart and grid in UI
    /// </summary>
    public class ComparisonRow
    {
        public int Year { get; set; }

        /// <summary>
        /// Whether data exists for any institution for given year
        /// </summary>
        public bool HasData { get; set; }

        /// <summary>
        /// Datapoint for each institution
        /// </summary>
        public DataPoint[] DataPoints { get; set; }
    }
}