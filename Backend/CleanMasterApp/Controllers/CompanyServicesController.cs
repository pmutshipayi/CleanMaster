using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CleanMasterApp.Data;
using CleanMasterApp.Models;
using CleanMasterApp.Services;

namespace CleanMasterApp.Controllers
{
    public class CompanyServicesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ICompanySessionService _sessionService;

        public CompanyServicesController(
            AppDbContext context,
            ICompanySessionService sessionService)
        {
            _context = context;
            _sessionService = sessionService;
        }

        // GET: CompanyServices
        public async Task<IActionResult> Index()
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            var appDbContext = _context.Services
                .Include(c => c.Company)
                .Where(x => x.CompanyId == _sessionService.User().CompanyId);
            return View(await appDbContext.ToListAsync());
        }

        // GET: CompanyServices/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var companyService = await _context.Services
                .Include(c => c.Company)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (companyService == null)
            {
                return NotFound();
            }

            return View(companyService);
        }

        // GET: CompanyServices/Create
        public IActionResult Create()
        {
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email");
            return View();
        }

        // POST: CompanyServices/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Title,Description,Id")] CompanyService companyService)
        {
            if (ModelState.IsValid)
            {
                companyService.CompanyId = _sessionService.User().CompanyId;
                _context.Add(companyService);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email", companyService.CompanyId);
            return View(companyService);
        }

        // GET: CompanyServices/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var companyService = await _context.Services.FindAsync(id);
            if (companyService == null || companyService.CompanyId != _sessionService.User().CompanyId)
            {
                return NotFound();
            }
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email", companyService.CompanyId);
            return View(companyService);
        }

        // POST: CompanyServices/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CompanyId,Title,Description,Id")] CompanyService companyService)
        {
            if (id != companyService.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    companyService.CompanyId = _sessionService.User().CompanyId;
                    _context.Update(companyService);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompanyServiceExists(companyService.Id))
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
            ViewData["CompanyId"] = new SelectList(_context.Companies, "Id", "Email", companyService.CompanyId);
            return View(companyService);
        }

        // GET: CompanyServices/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var companyService = await _context.Services
                .Include(c => c.Company)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (companyService == null)
            {
                return NotFound();
            }

            return View(companyService);
        }

        // POST: CompanyServices/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var companyService = await _context.Services.FindAsync(id);
            _context.Services.Remove(companyService);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CompanyServiceExists(int id)
        {
            return _context.Services.Any(e => e.Id == id);
        }
    }
}
