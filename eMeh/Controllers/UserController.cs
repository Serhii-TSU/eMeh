using eMeh.DBContext;
using eMeh.Extensions;
using eMeh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;

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
        public async Task<IActionResult> Add([FromBody] JsonValue userJson)
        {
            try
            {
                var response = await _emehDbContext.AddAsync(userJson.DeserializedAndValidated());

                if (response != null)
                    _emehDbContext.SaveChanges();

                return Ok("User created successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }      
        }

        [HttpGet("getall")]
        public IActionResult GetAllUsers()
        {
            return Ok("Ok");
        }

        [Authorize]
        [HttpGet("get")]
        public async Task<IActionResult> GetUserById()
        {
            var userId = HttpContext.Request.Cookies["UserId"];

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _emehDbContext.Users.FirstOrDefaultAsync(x => x.Id.ToString() == userId);

            user.Password = string.Empty;

            var serializedUser = Newtonsoft.Json.JsonConvert.SerializeObject(user);

            return Ok(serializedUser);
        }

        [Authorize]
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] JsonValue userJson)
        {
            try
            {
                var validatedUser = userJson.DeserializedAndValidated(); // stop point error
                var user = await _emehDbContext.Users.FirstOrDefaultAsync(x => x.Email == validatedUser.Email);
                if (user != null)
                {
                    
                    if (user.Name != validatedUser.Name)
                        user.Name = validatedUser.Name;

                    if (user.Surname != validatedUser.Surname)
                        user.Surname = validatedUser.Surname;

                    if (user.Country != validatedUser.Country)
                        user.Country = validatedUser.Country;

                    if (user.City != validatedUser.City)
                        user.City = validatedUser.City;

                    if (user.Address != validatedUser.Address)
                        user.Address = validatedUser.Address;

                    if (user.PostalCode != validatedUser.PostalCode)
                        user.PostalCode = validatedUser.PostalCode;

                    if (user.Email != validatedUser.Email)
                        user.Email = validatedUser.Email;

                    if (user.PhoneNumber != validatedUser.PhoneNumber)
                        user.PhoneNumber = validatedUser.PhoneNumber;

                    if (user.Password != validatedUser.Password && 
                        !string.IsNullOrEmpty(validatedUser.Password))
                        user.Password = validatedUser.Password;

                    _emehDbContext.SaveChanges();
                }

                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
