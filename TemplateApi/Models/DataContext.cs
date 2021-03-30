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

        public DbSet<TodoItem> TodoItems { get; set; }

        public DbSet<DemoAnimal> DemoAnimals { get; set; }
    }
}
