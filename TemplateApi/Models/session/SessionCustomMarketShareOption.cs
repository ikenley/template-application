
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// Option within slider for custom market share
    /// </summary>
    public class SessionCustomMarketShareOption
    {
        public Guid SessionId { get; set; }
        public int RegionId { get; set; }
        public int OptionId { get; set; }
    }
}