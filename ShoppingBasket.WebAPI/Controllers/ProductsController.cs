using Microsoft.AspNetCore.Mvc;
using Serilog;
using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Features.Products.Queries;

namespace ShoppingBasket.WebAPI.Controllers
{
    public class ProductsController : ApiControllerBase
    {
        // GET: api/products
        [HttpGet]
        public async Task<List<Product>> Get()
        {
            Log.Information("This API call is to Get all Products!");
            return await Mediator.Send(new GetProductsQuery());
        }
    }
}
