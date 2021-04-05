
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TemplateApi.Models
{
    public class SessionService : ISessionService
    {
        private readonly DataContext _dataContext;

        public SessionService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Session> CreateOrGetSession(string userId)
        {
            // Try to get existing user Session
            var session = await TryGetSessionByUserId(userId);
            if (session != null)
            {
                return session;
            }

            // If none exist, create with default values
            var createdSession = await CreateDefaultSession(userId);
            return createdSession;
        }

        /// <summary>
        /// Creates a Session and populates with default values
        /// /// </summary>
        private async Task<Session> CreateDefaultSession(string userId)
        {
            var session = Session.CreateDefault(userId);
            await _dataContext.Session.AddAsync(session);
            await _dataContext.SaveChangesAsync();
            return session;
        }

#nullable enable
        private async Task<Session?> TryGetSessionByUserId(string userId)
#nullable disable
        {
            return await _dataContext.Session.FirstOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<Session> GetSession(Guid sessionId)
        {
            return await _dataContext.Session.SingleAsync(s => s.SessionId == sessionId);
        }

        public async Task<Session> UpdateSession(UpdateSessionParams updateSessionParams)
        {
            // Get existing session
            var sessionId = updateSessionParams.SessionId;
            var session = await GetSession(sessionId);

            // Update non-null arguments
            if (updateSessionParams.InstitutionId.HasValue)
            {
                session.InstitutionId = updateSessionParams.InstitutionId.Value;
                session.InstitutionName = updateSessionParams.InstitutionName ?? "";
            }
            if (updateSessionParams.RegionId.HasValue)
            {
                session.RegionId = updateSessionParams.RegionId.Value;
                session.RegionName = updateSessionParams.RegionName;
            }
            if (updateSessionParams.MarketShareModel.HasValue)
            {
                session.MarketShareModel = updateSessionParams.MarketShareModel.Value;
            }

            session.LastUpdated = DateTime.Now;

            await _dataContext.SaveChangesAsync();
            return session;
        }
    }
}