
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Option within slider for custom market share
    /// </summary>
    public class CustomMarketShareOption
    {
        public int UnitId { get; set; }
        public int RegionId { get; set; }
        public int OptionId { get; set; }
        public double MarketShare { get; set; }
    }
}