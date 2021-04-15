
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace TemplateApi.Models
{
    public class SessionService : ISessionService
    {
        private IMemoryCache _cache;
        private readonly DataContext _dataContext;
        private readonly IRegionService _regionService;
        private readonly IInstitutionService _institutionService;

        public SessionService(IMemoryCache memoryCache, DataContext dataContext, IRegionService regionService, IInstitutionService institutionService)
        {
            _cache = memoryCache;
            _dataContext = dataContext;
            _regionService = regionService;
            _institutionService = institutionService;
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
            session.CustomMarketShareOptionMap = await GetCustomMarketShareOptionsAsync(session);
            return session;
        }

#nullable enable
        private async Task<Session?> TryGetSessionByUserId(string userId)
#nullable disable
        {
            var session = await _dataContext.Session.FirstOrDefaultAsync(s => s.UserId == userId);
            session.CustomMarketShareOptionMap = await GetCustomMarketShareOptionsAsync(session);
            return session;
        }

        public async Task<Session> GetSession(Guid sessionId)
        {
            var session = await _dataContext.Session.SingleAsync(s => s.SessionId == sessionId);
            session.CustomMarketShareOptionMap = await GetCustomMarketShareOptionsAsync(session);
            return session;
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
            if (updateSessionParams.CustomMarketShareOptionMap != null)
            {
                session.CustomMarketShareOptionMap = updateSessionParams.CustomMarketShareOptionMap;
                await UpdateCustomMarketShareOptionAsync(session, session.CustomMarketShareOptionMap);
            }

            session.LastUpdated = DateTime.Now;

            await _dataContext.SaveChangesAsync();
            return session;
        }

        public async Task<SessionOptionSet> GetSessionOptionSet()
        {
            SessionOptionSet optionSet;

            if (!_cache.TryGetValue(CacheKeys.GetSessionOptionSet, out optionSet))
            {
                optionSet = new SessionOptionSet();

                optionSet.Institutions = await _institutionService.GetInstitutionsAsync();

                optionSet.Regions = await _regionService.GetRegionsAsync();

                _cache.Set(CacheKeys.GetSessionOptionSet, optionSet);
            }
            return optionSet;
        }

        private async Task<Dictionary<int, int>> GetCustomMarketShareOptionsAsync(Session session)
        {
            if (session.MarketShareModel == MarketShareModel.Custom)
            {
                var optionMap = await _dataContext.SessionCustomMarketShareOption
                .Where(s => s.SessionId == session.SessionId)
                .ToDictionaryAsync(opt => opt.RegionId, opt => opt.OptionId);
                return optionMap;
            }
            return new Dictionary<int, int>();
        }

        private async Task UpdateCustomMarketShareOptionAsync(
            Session session,
            Dictionary<int, int> customMarketShareOptionMap
        )
        {
            // Delete existing options for session
            var oldOptions = await _dataContext.SessionCustomMarketShareOption
                .Where(opt => opt.SessionId == session.SessionId)
                .ToListAsync();
            _dataContext.SessionCustomMarketShareOption.RemoveRange(oldOptions);

            // Convert map of RegionId => OptionId into rows and insert
            var nextOptions = new List<SessionCustomMarketShareOption>();
            foreach (int regionId in customMarketShareOptionMap.Keys)
            {
                nextOptions.Add(new SessionCustomMarketShareOption
                {
                    SessionId = session.SessionId,
                    RegionId = regionId,
                    OptionId = customMarketShareOptionMap[regionId]
                });
            }
            await _dataContext.SessionCustomMarketShareOption.AddRangeAsync(nextOptions);

            await _dataContext.SaveChangesAsync();
        }
    }
}