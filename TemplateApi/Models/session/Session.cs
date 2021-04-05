
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    /// <summary>
    /// A Session containing filter selections
    /// </summary>
    [Index(nameof(UserId))]
    public class Session
    {
        public Guid SessionId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }

        public DateTime? DateDeleted { get; set; }

        public int InstitutionId { get; set; }

        public string InstitutionName { get; set; }

        public int RegionId { get; set; }

        public string RegionName { get; set; }

        public MarketShareModel MarketShareModel { get; set; }

        public static Session CreateDefault(string userId)
        {
            var session = new Session
            {
                SessionId = Guid.NewGuid(),
                UserId = userId,
                DateCreated = DateTime.Now,
                LastUpdated = DateTime.Now,
                InstitutionId = 0, // TODO store this as a const
                InstitutionName = "EAB University",
                RegionId = Region.AllRegionsId,
                RegionName = Region.AllRegionsName,
                MarketShareModel = MarketShareModel.MostRecentYear
            };
            return session;
        }

    }
}