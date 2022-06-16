using Microsoft.AspNetCore.Mvc;
using Serilog;
using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Features.Products.Queries;

namespace ShoppingBasket.WebAPI.Controllers
{
    public class ShippingController : ApiControllerBase
    {
        // POST: api/shipping/calculateShipping
        [HttpGet]
        public async Task<double> Get([FromQuery] double totalCost, string currency)
        {
            if (totalCost <= 0 && string.IsNullOrEmpty(currency))
            {
                Log.Information("Invalid input ${0} to calculate Shipping cost!", totalCost);
                return 0;
            }
            Log.Information("This API call is to Get all Products!");
            return await Mediator.Send(new GetShippingQuery(totalCost, currency));
        }


        [HttpPost]
        public bool PlaceOrder([FromBody] BasketItem basket)
        {
            if (basket != null)
                return true;

            return false;
        }
    }
}
