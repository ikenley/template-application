
using System;
using System.Threading.Tasks;

namespace TemplateApi.Models
{
    public interface ISessionService
    {
        Task<Session> CreateOrGetSession(string userId);

        Task<Session> GetSession(Guid sessionId);

        Task<Session> UpdateSession(UpdateSessionParams updateSessionParams);
    }
}