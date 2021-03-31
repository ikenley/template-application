using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TemplateApi.Models;

namespace TemplateApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OverviewController : ControllerBase
    {
        private readonly ILogger<OverviewController> _logger;
        private readonly IOverviewResultService _resultService;

        public OverviewController(ILogger<OverviewController> logger, IOverviewResultService resultService)
        {
            _logger = logger;
            _resultService = resultService;
        }

        [HttpGet]
        public async Task<OverviewResult> GetAsync()
        {
            var result = await _resultService.GetOverviewResultAsync();
            return result;
        }
    }
}
