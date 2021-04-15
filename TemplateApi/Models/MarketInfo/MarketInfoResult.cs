
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Response wrapper for /api/marketshare/custom-options/{institution}
    /// </summary>
    public class MarketInfoResult
    {
        public YearSummary YearSummary { get; set; }
        public List<MarketInfoRow> MarketInfoRows { get; set; }
    }
}