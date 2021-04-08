
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Response wrapper for /api/marketshare/{institution}
    /// </summary>
    [Keyless]
    public class MarketShareResult
    {
        public List<Region> Regions { get; set; }

        /// <summary>
        /// Map of Year => RegionId => MarketShareRow
        /// </summary>
        [NotMapped]
        public Dictionary<int, Dictionary<int, MarketShareRow>> MarketShareRowMap { get; set; }
    }
}