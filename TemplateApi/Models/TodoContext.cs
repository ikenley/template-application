using System;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        // The following configures EF to create a Sqlite database file as `C:\blogging.db`.
        // For Mac or Linux, change this to `/tmp/blogging.db` or any other absolute path.
        // protected override void OnConfiguring(DbContextOptionsBuilder options)
        //     => options.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }
}
