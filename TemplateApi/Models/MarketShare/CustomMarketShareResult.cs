
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Response wrapper for /api/marketshare/custom-options/{institution}
    /// </summary>
    public class CustomMarketShareResult
    {
        public List<Region> Regions { get; set; }

        /// <summary>
        /// Map of Year => RegionId => MarketShareRow
        /// </summary>
        public Dictionary<int, List<CustomMarketShareOption>> OptionMap { get; set; }
    }
}