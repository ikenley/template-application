
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// ORM for market_info result
    /// </summary>
    [Keyless]
    public class MarketInfoRow
    {
        public int RegionId { get; set; }
        public string RegionName { get; set; }
        public double Enrollment { get; set; }
        public double EnrollmentShare { get; set; }
        public int PminYear { get; set; }
        public double PminMarketEnrollment { get; set; }
        public int PmaxYear { get; set; }
        public double PmaxMarketEnrollment { get; set; }
        public double PredictedMarketGrowth { get; set; }
    }
}