using eMeh.CustomExceptions;
using eMeh.DBContext;
using eMeh.Extensions;
using eMeh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eMeh.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly EmehDbContext _emehDbContext;

        public UsersController(EmehDbContext emehDbContext)
        {
            _emehDbContext = emehDbContext;
        }

        [HttpPost("adduser")]
        public async Task<IActionResult> Add([FromBody] UserData userData)
        {
            try
            {
                var userDb = await _emehDbContext.Users
                    .FirstOrDefaultAsync(x => x.Email == userData.Email);

                if (userDb != null)
                    throw new InvalidCredentialException("User with this email already exists.");

                var response = await _emehDbContext
                    .AddAsync(userData.ToEntity());

                if (response != null)
                    _emehDbContext.SaveChanges();

                return Ok("User created successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }      
        }

        [Authorize]
        [HttpGet("get")]
        public async Task<IActionResult> GetUserById()
        {
            var userId = HttpContext.Request.Cookies["UserId"];

            if (userId == null)
                return Unauthorized();

            var userDb = await _emehDbContext.Users
                .FirstOrDefaultAsync(x => x.Id != null && x.Id.ToString() == userId);

            if (userDb == null)
                throw new NotFoundException("User not found.");

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(userDb.ClearSensitiveData()));
        }

        [Authorize]
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UserData user)
        {
            try
            {
                var userDb = await _emehDbContext.Users
                    .FirstOrDefaultAsync(x => x.Email == user.Email);

                if (userDb == null)
                    throw new NotFoundException("User not found.");

                userDb.Update(user);

                _emehDbContext.SaveChanges();

                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUserById()
        {
            var userId = HttpContext.Request.Cookies["UserId"];

            if (userId == null)
                return Unauthorized();

            var userDb = await _emehDbContext.Users
                .FirstOrDefaultAsync(x => x.Id != null && x.Id.ToString() == userId);

            if (userDb == null)
                throw new NotFoundException("User not found.");

            _emehDbContext.Users.Remove(userDb);
            _emehDbContext.SaveChanges();

            HttpContext.Response.Cookies.Delete("token");
            HttpContext.Response.Cookies.Delete("UserId");
            HttpContext.Response.Cookies.Delete("HasPhoneNumber");

            return Ok("User deleted successfully");
        }
    }
}
