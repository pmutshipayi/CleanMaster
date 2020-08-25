using CleanMasterApp.Data;
using CleanMasterApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanMasterApp.Controllers
{
    [Route("api/services")]
    [ApiController]
    public class CompanyServiceControllerApi : ControllerBase
    {
        private readonly AppDbContext _db;

        public CompanyServiceControllerApi(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<List<CompanyService>> GetAllAsync([FromQuery] SearchCreteria searchModel)
        {
            var query = _db.Services
                .Include(x => x.Company)
                .AsQueryable();

            // filter by title

            if (!string.IsNullOrWhiteSpace(searchModel.Title))
            {
                query = query.Where(x => x.Title.ToLower().Contains(searchModel.Title.ToLower()));
            }


            // filter by company

            if (searchModel.CompanyId != 0)
            {
                query = query.Where(x => x.CompanyId == searchModel.CompanyId);
            }

            var pageIndex = searchModel.PageIndex > 0 ? searchModel.PageIndex : 1;
            var pageSize = searchModel.PageSize > 1 ? searchModel.PageSize : 20;
            var skip = (pageIndex - 1) * pageSize;

            // Apply pagination

            var result = await query.Skip(skip).Take(pageSize)
                .ToListAsync();
            return result;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class SearchCreteria
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string Title { get; set; }
        public int CompanyId { get; set; }
    }
}
