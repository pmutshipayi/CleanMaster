using CleanMasterApp.Data;
using CleanMasterApp.Models;
using CleanMasterApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CleanMasterApp.Controllers
{
    public class CompanyUsersController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ICompanySessionService _sessionService;

        public CompanyUsersController(
            AppDbContext context,
            ICompanySessionService sessionService)
        {
            _context = context;
            _sessionService = sessionService;
        }

        // GET: CompanyUsers
        public async Task<IActionResult> Index()
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            var appDbContext = _context.CompanyUsers
                .Include(c => c.Company)
                .Where(x => x.CompanyId == _sessionService.User().CompanyId);
            return View(await appDbContext.ToListAsync());
        }

        // GET: CompanyUsers/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            if (id == null)
            {
                return NotFound();
            }

            var companyUser = await _context.CompanyUsers
                .Include(c => c.Company)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (companyUser == null)
            {
                return NotFound();
            }

            return View(companyUser);
        }

        // GET: CompanyUsers/Create
        public IActionResult Create()
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email");
            return View();
        }

        // POST: CompanyUsers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FullName,Username,Password,CompanyId,Id")] CompanyUser companyUser)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            if (ModelState.IsValid)
            {
                companyUser.CompanyId = _sessionService.User().CompanyId;
                _context.Add(companyUser);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email", companyUser.CompanyId);
            return View(companyUser);
        }

        // GET: CompanyUsers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            if (id == null)
            {
                return NotFound();
            }

            var companyUser = await _context.CompanyUsers.FindAsync(id);
            if (companyUser == null || companyUser.CompanyId != _sessionService.User().CompanyId)
            {
                return NotFound();
            }
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email", companyUser.CompanyId);
            return View(companyUser);
        }

        // POST: CompanyUsers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("FullName,Username,Password,CompanyId,Id")] CompanyUser companyUser)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            if (id != companyUser.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    companyUser.CompanyId = _sessionService.User().CompanyId;
                    _context.Update(companyUser);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompanyUserExists(companyUser.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email", companyUser.CompanyId);
            return View(companyUser);
        }

        // GET: CompanyUsers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            if (id == null)
            {
                return NotFound();
            }

            var companyUser = await _context.CompanyUsers
                .Include(c => c.Company)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (companyUser == null)
            {
                return NotFound();
            }

            return View(companyUser);
        }

        // POST: CompanyUsers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            var companyUser = await _context.CompanyUsers.FindAsync(id);
            _context.CompanyUsers.Remove(companyUser);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CompanyUserExists(int id)
        {
            return _context.CompanyUsers.Any(e => e.Id == id);
        }
    }
}
