using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eMeh.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/orders")]

    public class OrdersV1Controller : ControllerBase
    {
        [Authorize]
        [HttpPost("complete")]
        public async Task<IActionResult> CompleteOrder1()
        {
            return Ok("Ordered from V1 controller");
        }
    }
}
