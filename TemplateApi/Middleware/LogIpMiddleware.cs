

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Serilog.Context;

namespace TemplateApi.Middleware
{
    public class LogIpMiddleware
    {
        private readonly RequestDelegate next;

        public LogIpMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public Task Invoke(HttpContext context)
        {
            LogContext.PushProperty("ClientIP", context.Connection.RemoteIpAddress);

            return next(context);
        }
    }
}