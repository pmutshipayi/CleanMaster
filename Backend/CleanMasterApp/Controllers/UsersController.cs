using CleanMasterApp.Data;
using CleanMasterApp.Models;
using CleanMasterApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanMasterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public const string TokenName = "authorization";
         
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            //_context.Users.Add(user);
            //await _context.SaveChangesAsync();

            var session = new UserSession
            {
                User = user,
                Token = Guid.NewGuid().ToString()
            };
            _context.Add(session);
            await _context.SaveChangesAsync();

            // Set the authentification token

            Response.Headers.Add(TokenName, session.Token);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Headers[TokenName];
            var session = await _context.UserSessions
               .Include(x => x.User)
               .FirstOrDefaultAsync(x => x.Token == token);
            if (session == null)
                return Ok();

            // delete cookie

            _context.Remove(session);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("auth")]
        public async Task<IActionResult> Login(UserLoginViewModel viewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == viewModel.Email);
            if (user == null)
            {
                ModelState.AddModelError("email", "This email address does not exist");
                return BadRequest(ModelState);
            }
            if (user.Password != viewModel.Password)
            {
                ModelState.AddModelError("password", "This password is not correct");
                return BadRequest(ModelState);
            }

            var session = new UserSession
            {
                User = user,
                Token = Guid.NewGuid().ToString()
            };
            _context.Add(session);
            await _context.SaveChangesAsync();

            // Set the authentification token

            Response.Headers.Add(TokenName, session.Token);
            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
