
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Available arguments for updating a session. Only non-null properties are updated
    /// </summary>
    public class UpdateSessionParams
    {
        public Guid SessionId { get; set; }

        public int? InstitutionId { get; set; }

        public string InstitutionName { get; set; }

        public int? RegionId { get; set; }

        public string RegionName { get; set; }

        public MarketShareModel? MarketShareModel { get; set; }

        /// <summary>
        /// Map of RegionId => selected OptionId
        /// </summary>
#nullable enable
        public Dictionary<int, int>? CustomMarketShareOptionMap { get; set; }
#nullable disable

    }
}