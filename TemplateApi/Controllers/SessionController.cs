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
    public class SessionController : ControllerBase
    {
        private readonly ILogger<SessionController> _logger;
        private readonly ISessionService _sessionService;

        public SessionController(ILogger<SessionController> logger, ISessionService sessionService)
        {
            _logger = logger;
            _sessionService = sessionService;
        }

        // GET: api/Session/CreateOrGet/12345
        // TODO update to infer from auth token
        [HttpGet("CreateOrGet/{userId}")]
        public async Task<ActionResult<Session>> CreateOrGetSession(string userId)
        {
            var session = await _sessionService.CreateOrGetSession(userId);
            return session;
        }

        // GET: api/session/9d16653d-7d70-4729-bc99-4504df69ca6e
        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(Guid id)
        {
            var session = await _sessionService.GetSession(id);

            if (session == null)
            {
                return NotFound();
            }

            return session;
        }

        // POST: api/session/update
        [HttpPost("update")]
        public async Task<ActionResult<Session>> UpdateSession(UpdateSessionParams updateSessionParams)
        {
            var session = await _sessionService.UpdateSession(updateSessionParams);
            return session;
        }

        // GET /api/session/optionset
        [HttpGet("optionset")]
        public async Task<ActionResult<SessionOptionSet>> GetSessionOptionSet()
        {
            var optionSet = await _sessionService.GetSessionOptionSet();
            return optionSet;
        }
    }
}
