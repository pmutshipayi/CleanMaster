using CleanMasterApp.Controllers;
using CleanMasterApp.Data;
using CleanMasterApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CleanMasterApp.Services
{
    public class CompanySessionService : ICompanySessionService
    {
        private readonly AppDbContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CompanySessionService(AppDbContext db,
            IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// 
        /// </summary>
        private string Cookie => _httpContextAccessor.HttpContext.Request.Cookies[CompanyController.SESSION_KEY];

        public bool IsAuthenticated()
        {
            if (string.IsNullOrWhiteSpace(Cookie))
                return false;
            return _db.CompanySessions.Any(x => x.Token == Cookie);
        }

        public string GetProfileImage()
        {
            if (!IsAuthenticated())
                return "no_image.jpg";
            var image = _db.CompanySessions
                .Include(x => x.User)
                    .ThenInclude(x => x.Company)
                .FirstOrDefault(x => x.Token == Cookie);
            return !string.IsNullOrWhiteSpace(image.User.Company.ProfilePicture) ? image.User.Company.ProfilePicture : "no_image.jpg";
        }

        public CompanyUser User()
        {
            var session = _db.CompanySessions
                .Include(x => x.User)
                    .ThenInclude(x => x.Company)
                .FirstOrDefault(x => x.Token == Cookie);
            return session?.User;
        }
    } 
}
