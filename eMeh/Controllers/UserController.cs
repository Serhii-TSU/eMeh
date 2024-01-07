using eMeh.DBContext;
using eMeh.Extensions;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("get")]
        public IActionResult GetAllUsers()
        {
            return Ok("Ok");
        }

        [HttpGet("get/{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok("Ok");
        }
    }
}
