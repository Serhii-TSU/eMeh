using eMeh.CustomExceptions;
using eMeh.DBContext;
using eMeh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eMeh.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EmehDbContext _emehDbContext;

        public CartController(EmehDbContext emehDbContext)
        {
            _emehDbContext = emehDbContext;
        }

        [Authorize]
        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var userId = HttpContext.Request.Cookies["UserId"];

                if (userId == null)
                    return Unauthorized();

                var cartProducts = _emehDbContext.Cart
                    .Where(product => product.UserId == userId).ToList();

                var ids = cartProducts
                    .Select(product => product.ProductId).ToList();

                if (cartProducts.Count == 0)
                    return Ok(new List<Product>());

                var products = _emehDbContext.Products
                    .Where(product => ids.Contains(product.Id)).ToList();

                if (products.Count == 0)
                    throw new NotFoundException("No products were found");

                foreach (var product in products)
                {
                    foreach (var cartProduct in cartProducts)
                    {
                        if (product.Id == cartProduct.ProductId)
                        {
                            product.Quantity = cartProduct.Quantity;
                            _emehDbContext.SaveChanges();
                        }
                    }
                }

                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(products));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] string? productId)
        {
            try
            {
                var userId = HttpContext.Request.Cookies["UserId"];

                if (userId == null)
                    return Unauthorized();

                var cartProductDb = await _emehDbContext.Cart
                    .FirstOrDefaultAsync(x => x.ProductId == productId && x.UserId == userId);

                if (cartProductDb != null)
                {
                    cartProductDb.Quantity += 1;
                    _emehDbContext.SaveChanges();

                    return Ok("Product added to shopping cart successfully");
                }

                var productDb = await _emehDbContext.Products
                    .FirstOrDefaultAsync(x => x.Id == productId);

                var cartProduct = new CartProduct
                {
                    ProductId = productId,
                    UserId = userId,
                    Quantity = 1,
                    DateTime = DateTime.Now.ToString()
                };

                var response = await _emehDbContext.Cart
                    .AddAsync(cartProduct);

                if (response == null)
                    throw new Exception("Error adding product to shopping cart.");
                
                _emehDbContext.SaveChanges();

                return Ok("Product added to shopping cart successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromQuery] string? id)
        {
            try
            {
                var cartProductDb = await _emehDbContext.Cart
                    .FirstOrDefaultAsync(x => x.ProductId == id);

                if (cartProductDb == null)
                    throw new NotFoundException("Product not found.");

                if (cartProductDb.Quantity > 1)
                {
                    cartProductDb!.Quantity = cartProductDb!.Quantity - 1;
                    _emehDbContext.SaveChanges();

                    return Ok("Product updated successfully");
                }

                _emehDbContext.Cart.Remove(cartProductDb!);
                _emehDbContext.SaveChanges();

                return Ok("Product updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
