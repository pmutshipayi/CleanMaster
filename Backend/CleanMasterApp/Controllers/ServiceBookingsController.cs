using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CleanMasterApp.Data;
using CleanMasterApp.Models;

namespace CleanMasterApp.Controllers
{
    [Route("api/serviceBookings")]
    [ApiController]
    public class ServiceBookingsControllerApi : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceBookingsControllerApi(AppDbContext context)
        {
            _context = context;
        }

        private async Task<UserSession> GetSession()
        {
            var token = Request.Headers[UsersController.TokenName];
            if (string.IsNullOrWhiteSpace(token))
                return null;
            var session = await _context.UserSessions
              .Include(x => x.User)
              .FirstOrDefaultAsync(x => x.Token == token);
            return session;
        }

        // GET: api/ServiceBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceBooking>>> GetServiceEnquiries()
        {
            var session = await GetSession();
            if (session == null)
                return NotFound();

            return await _context
                .ServiceBookings
                .Include(x => x.Service)
                    .ThenInclude(x => x.Company)
                .Where(x => x.UserId == session.UserId)
                .OrderBy(x => x.Id)
                .ToListAsync();
        }

        // GET: api/ServiceBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceBooking>> GetServiceBooking(int id)
        {
            var serviceBooking = await _context.ServiceBookings.FindAsync(id);
            var session = await GetSession();
            if (serviceBooking == null || session == null || session.UserId != serviceBooking.UserId)
            {
                return NotFound();
            }

            return serviceBooking;
        }

        // PUT: api/ServiceBookings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceBooking(int id, ServiceBooking serviceBooking)
        {
            if (id != serviceBooking.Id)
            {
                return BadRequest();
            }

            _context.Entry(serviceBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceBookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ServiceBookings
        [HttpPost]
        public async Task<ActionResult<ServiceBooking>> PostServiceBooking(ServiceBooking serviceBooking)
        {
            var session = await GetSession();
            if (session == null)
                return BadRequest();
            serviceBooking.UserId = session.UserId;
            _context.ServiceBookings.Add(serviceBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceBooking", new { id = serviceBooking.Id }, serviceBooking);
        }

        // DELETE: api/ServiceBookings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceBooking>> DeleteServiceBooking(int id)
        {
            var serviceBooking = await _context.ServiceBookings.FindAsync(id);
            if (serviceBooking == null || serviceBooking.UserId != (await GetSession()).UserId)
            {
                return NotFound();
            }

            _context.ServiceBookings.Remove(serviceBooking);
            await _context.SaveChangesAsync();

            return serviceBooking;
        }

        private bool ServiceBookingExists(int id)
        {
            return _context.ServiceBookings.Any(e => e.Id == id);
        }
    }
}
