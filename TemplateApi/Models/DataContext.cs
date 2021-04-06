using System;
using Microsoft.EntityFrameworkCore;

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
        }

        public DbSet<Session> Session { get; set; }

        public DbSet<DataPoint> DataPoints { get; set; }

        public DbSet<Region> Regions { get; set; }

        public DbSet<Institution> Institutions { get; set; }
    }
}
