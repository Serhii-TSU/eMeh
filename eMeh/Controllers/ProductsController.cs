using eMeh.DBContext;
using eMeh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eMeh.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly EmehDbContext _emehDbContext;

        public ProductsController(EmehDbContext emehDbContext)
        {
            _emehDbContext = emehDbContext;
        }

        [Authorize]
        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(_emehDbContext.Products.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
