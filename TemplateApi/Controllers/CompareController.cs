using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TemplateApi.Models;

namespace TemplateApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompareController : ControllerBase
    {
        private readonly ILogger<CompareController> _logger;
        private readonly ICompareService _compareService;

        public CompareController(ILogger<CompareController> logger, ICompareService compareService)
        {
            _logger = logger;
            _compareService = compareService;
        }

        // GET: api/compare/{sessionId}
        [HttpGet("{sessionId}")]
        public async Task<ActionResult<ComparisonResult>> GetComparisonResult(Guid sessionId)
        {
            var result = await _compareService.GetComparisonResultAsync(sessionId);
            return result;
        }
    }
}
