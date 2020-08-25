using CleanMasterApp.Data;
using CleanMasterApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CleanMasterApp.Controllers
{
    [Route("bookings")]
    public class BookingController : Controller
    {
        private readonly AppDbContext _db;
        private readonly ICompanySessionService _sessionService;

        public BookingController(
            AppDbContext db, 
            ICompanySessionService sessionService) {
            _db = db;
            _sessionService = sessionService;
        }

        public IActionResult Index()
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            var bookings = _db.ServiceBookings
                .Include(x => x.User)
                .Include(x => x.Service)
                .Where(x => x.Service.CompanyId == _sessionService.User().CompanyId)
                .OrderByDescending(x => x.Id)
                .ToList();
            return View(bookings);
        }
    }
}
