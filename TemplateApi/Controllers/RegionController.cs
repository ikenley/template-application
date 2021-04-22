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
    public class RegionController : ControllerBase
    {
        private readonly ILogger<RegionController> _logger;
        private readonly IRegionService _regionService;

        public RegionController(ILogger<RegionController> logger, IRegionService regionService)
        {
            _logger = logger;
            _regionService = regionService;
        }

        // GET: api/region/top/194824
        [HttpGet("top/{institutionId}")]
        public async Task<ActionResult<Region>> GetTopRegion(int institutionId)
        {
            var regions = await _regionService.GetTopRegionsAsync(institutionId, 1);
            var region = regions.FirstOrDefault();
            return region;
        }
    }
}
