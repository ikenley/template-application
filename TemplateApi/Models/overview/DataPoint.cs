
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Most granular unit of data for year-region-values
    /// </summary>
    [Keyless]
    public class DataPoint
    {
        public int Year { get; set; }
        public int RegionId { get; set; }
        public bool? IsForecast { get; set; }
        public double? Enrollment { get; set; }
        public double? MarketShare { get; set; }

        /// <summary>
        /// Total population of market
        /// </summary>
        /// <value></value>
        public double? Population { get; set; }

        /// <summary>
        /// Percent of total institution enrollment for given region-year
        /// </summary>
        public double? PercentTotalEnrollment { get; set; }
    }
}