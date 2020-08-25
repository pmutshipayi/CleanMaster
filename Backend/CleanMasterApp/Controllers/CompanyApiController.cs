using CleanMasterApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CleanMasterApp.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompanyApiController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CompanyApiController(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> GetAll()
        {
            var companies = await _db.Companies
                .Include(x => x.Services)
                .ToListAsync();
            return Ok(companies);
        }
    }
}
