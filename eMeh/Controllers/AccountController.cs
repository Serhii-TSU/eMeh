using eMeh.DBContext;
using eMeh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;

namespace eMeh.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : Controller
    {

        private readonly EmehDbContext _emehDbContext;
        private readonly IConfiguration _configuration;

        public AccountController(EmehDbContext emehDbContext, IConfiguration configuration)
        {
            _emehDbContext = emehDbContext;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] JsonValue loginModelJson)
        {
            try
            {
                if (loginModelJson == null)
                    throw new NullReferenceException("JsonValue received from the request body is null.");

                var loginModel = Newtonsoft.Json.JsonConvert.DeserializeObject<LoginModel>(loginModelJson.ToString());

                if (loginModel == null)
                    throw new JsonException($"Failed to deserialize JSON: {nameof(loginModelJson)}");

                var email = loginModel.Email ?? throw new NullReferenceException(nameof(loginModel));

                var user = await _emehDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (user != null && user.Password == loginModel.Password)
                {
                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(

                        expires             : DateTime.Now.AddMinutes(30),
                        claims              : authClaims,
                        signingCredentials  : new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)

                    );

                    HttpContext.Response.Cookies.Append("token", new JwtSecurityTokenHandler().WriteToken(token));
                    HttpContext.Response.Cookies.Append("UserId", user.Id.ToString());
                    HttpContext.Response.Cookies.Append("HasPhoneNumber", string.IsNullOrEmpty(user.PhoneNumber) ? "false" : "true");

                    var apiVersion = string.IsNullOrEmpty(user.PhoneNumber) ? "v2" : "v1";

                    return Ok("Logged in successfully. ApiVersion: " + apiVersion);
                }

                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public ActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete("token");
            HttpContext.Response.Cookies.Delete("UserId");
            HttpContext.Response.Cookies.Delete("HasPhoneNumber");

            return Ok("Logged out successfully.");
        }
    }
}
