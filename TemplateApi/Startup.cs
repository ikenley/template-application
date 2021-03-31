using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TemplateApi.Models;

namespace TemplateApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Fetch SSM parameters that are required during startup
            AwsParameterStoreClient client = new AwsParameterStoreClient(Amazon.RegionEndpoint.USEast1);
            string connectionString = client.GetValueAsync("/template-app/main-connection-string").GetAwaiter().GetResult();

            // Configure data contexts
            //services.AddDbContext<DataContext>(opt => opt.UseSqlite(@"Data Source=C:\Users\ikenl\todo_items.db"));
            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(connectionString)
                    .UseSnakeCaseNamingConvention()
            );

            services.AddScoped<IOverviewResultService, OverviewResultService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
