
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// ORM for predicted_market_share result
    /// </summary>
    [Keyless]
    public class MarketShareRow
    {
        public int Year { get; set; }
        public int RegionId { get; set; }
        public double MarketShare { get; set; }
    }
}