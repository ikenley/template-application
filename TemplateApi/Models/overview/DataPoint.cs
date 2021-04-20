
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

        /// <summary>Percent changed from index year</summary>
        [NotMapped]
        public double? PercentChangeFromIndex { get; set; }

        public double? CalculatePercentChange(DataPoint next)
        {
            if (next == null || next.Enrollment == 0)
            {
                return null;
            }

            double curr = this.Enrollment ?? 0;
            double nxt = next.Enrollment ?? 0;

            double growthRate = (nxt - curr) / curr;
            return growthRate;
        }
    }
}