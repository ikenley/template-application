
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Region, but with institution enrollment data as well
    /// </summary>
    [Keyless]
    public class RegionDataPoint : Region
    {
        public double? Enrollment { get; set; }
        public double? MarketShare { get; set; }

        /// <summary>
        /// Total population of market
        /// </summary>
        /// <value></value>
        public double? Population { get; set; }
    }
}