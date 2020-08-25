using AutoMapper;
using CleanMasterApp.Data;
using CleanMasterApp.Models;
using CleanMasterApp.Services;
using CleanMasterApp.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;

namespace CleanMasterApp.Controllers
{
    public class CompanyController : Controller
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _env;
        private readonly ICompanySessionService _sessionService;
        public const string SESSION_KEY = "company_cookie_key";

        public CompanyController(
            AppDbContext appDbContext, 
            IMapper mapper,
            IHostingEnvironment environment,
            ICompanySessionService sessionService)
        {
            _db = appDbContext;
            _mapper = mapper;
            _env = environment;
            _sessionService = sessionService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + Guid.NewGuid().ToString().Substring(0, 4)
                      + Path.GetExtension(fileName);
        }

        private string SaveFile(IFormFile file)
        {
            // _env.WebRootPath

            var uniqueFileName = GetUniqueFileName(file.FileName);
            var uploads = Path.Combine(_env.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, uniqueFileName);
            file.CopyTo(new FileStream(filePath, FileMode.Create));
            return uniqueFileName;
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(CompanyCreateViewModel viewModel)
        {
            if (!ModelState.IsValid)
                return View(viewModel);

            var user = new CompanyUser
            {
                FullName = viewModel.FullName,
                Password = viewModel.Password,
                Username = viewModel.Username
            };
            var company = new Company
            {
                Name = viewModel.Name,
                Address = viewModel.Address,
                Email = viewModel.Email
            };
            user.Company = company;

            // check for the company profile image

            if (viewModel.File != null)
            {
                user.Company.ProfilePicture = SaveFile(viewModel.File);
            }

            // Create session

            var session = new CompanySession
            {
                User = user,
                Token = Guid.NewGuid().ToString()
            };
            _db.Add(session);
            _db.SaveChanges();
            Response.Cookies.Append(SESSION_KEY, session.Token, new CookieOptions
            {
                Path = "/"
            });
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(UserLoginViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);
            var spEmail = model.Email.Split("+");
            if (spEmail.Length == 1)
            {
                ModelState.AddModelError("Email", "Invalid email address");
                return View(model);
            }

            var company = _db.Companies.Where(x => x.Email.ToLower() == spEmail[1].ToLower())
                .FirstOrDefault();
            if (company == null)
            {
                ModelState.AddModelError("Email", "We did not recognise this email address");
                return View(model);
            }

            var user = _db.CompanyUsers
                .Where(x => x.CompanyId == company.Id && x.Username.ToLower() == spEmail[0].ToLower())
                .FirstOrDefault();
            if (user == null)
            {
                ModelState.AddModelError("Email", "The username is not found ");
                return View(model);
            }

            // check password

            if (user.Password != model.Password)
            {
                ModelState.AddModelError("Password", "Invalid password");
                return View(model);
            }

            // create session

            var session = new CompanySession
            {
                User = user,
                Token = Guid.NewGuid().ToString()
            };
            _db.Add(session);
            _db.SaveChanges();
            Response.Cookies.Append(SESSION_KEY, session.Token, new CookieOptions
            {
                Path = "/"
            });
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Update()
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            return View(_sessionService.User().Company);
        }

        [HttpPost]
        public IActionResult Update(Company company)
        {
            if (!_sessionService.IsAuthenticated())
            {
                return RedirectToAction("Register", "Company");
            }
            if (company.File != null)
            {
                company.ProfilePicture = SaveFile(company.File);
            }
            _db.Update(company);
            _db.SaveChanges();
            return RedirectToAction("Index", "Home");
        }
    }
}
