using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eMeh.Controllers.V2
{
    [ApiController]
    [ApiVersion("2.0")]
    [Route("api/orders")]
    public class OrdersV2Controller : ControllerBase
    {
        [Authorize]
        [HttpPost("complete")]
        public async Task<IActionResult> CompleteOrder2()
        {
            return Ok("Ordered from V2 controller");
        }
    }
}
