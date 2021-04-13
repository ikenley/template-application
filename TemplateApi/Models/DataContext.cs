using System;
using Microsoft.EntityFrameworkCore;
using TemplateApi.Models;

namespace TemplateApi.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DataPoint>().ToTable(nameof(DataPoint), t => t.ExcludeFromMigrations());
            modelBuilder.Entity<MarketShareRow>().ToTable(nameof(MarketShareRow), t => t.ExcludeFromMigrations());
            modelBuilder.Entity<CustomMarketShareOption>().HasKey(t => new { t.UnitId, t.RegionId, t.OptionId });
            modelBuilder.Entity<SessionCustomMarketShareOption>().HasKey(t => new { t.SessionId, t.RegionId });
        }

        public DbSet<Session> Session { get; set; }

        public DbSet<DataPoint> DataPoints { get; set; }

        public DbSet<Region> Regions { get; set; }

        public DbSet<Institution> Institutions { get; set; }

        public DbSet<MarketShareRow> MarketShareRows { get; set; }

        public DbSet<TemplateApi.Models.MarketShareResult> MarketShareResult { get; set; }

        public DbSet<CustomMarketShareOption> CustomMarketShareOption { get; set; }

        public DbSet<SessionCustomMarketShareOption> SessionCustomMarketShareOption { get; set; }
    }
}
