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
    public class MarketInfoController : ControllerBase
    {
        private readonly ILogger<MarketInfoController> _logger;
        private readonly IMarketInfoService _marketInfoService;

        public MarketInfoController(ILogger<MarketInfoController> logger, IMarketInfoService marketInfoService)
        {
            _logger = logger;
            _marketInfoService = marketInfoService;
        }

        // GET: api/marketinfo/0/194824
        [HttpGet("{institutionId}")]
        public async Task<ActionResult<MarketInfoResult>> GetMarketInfoResult(int institutionId)
        {
            var result = await _marketInfoService.GetMarketInfoResultAsync(institutionId);
            return result;
        }

        [HttpGet("predicted-enrollment/{regionId}")]
        public async Task<ActionResult<List<PredictedMarketEnrollment>>> GetPredictedMarketEnrollment(int regionId)
        {
            var result = await _marketInfoService.GetPredictedMarketEnrollmentsAsync(regionId);
            return result;
        }
    }
}
