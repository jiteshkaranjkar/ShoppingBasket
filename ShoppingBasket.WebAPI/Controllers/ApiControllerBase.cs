using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ShoppingBasket.WebAPI.Controllers
{
    /// <summary>
    /// Base api controller associated with a service application.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        private ISender _mediator = null!;
        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();


        public JsonResult JsonResult<T>(T? obj)
        {
            return new JsonResult(obj,
                new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
        }
    }

}
