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
    public class MarketShareController : ControllerBase
    {
        private readonly ILogger<MarketShareController> _logger;
        private readonly IMarketShareService _marketShareService;

        public MarketShareController(ILogger<MarketShareController> logger, IMarketShareService marketShareService)
        {
            _logger = logger;
            _marketShareService = marketShareService;
        }

        // GET: api/Session/CreateOrGet/12345
        // TODO update to infer from auth token
        [HttpGet("{marketShareModel}/{institutionId}")]
        public async Task<ActionResult<MarketShareResult>> GetMarketShareResult(int marketShareModel, int institutionId)
        {
            var model = (MarketShareModel)marketShareModel;
            var result = await _marketShareService.GetMarketShareResultAsync(model, institutionId);
            return result;
        }
    }
}
