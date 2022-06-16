using MediatR;
using Serilog;
using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static ShoppingBasket.Core.Common.Features.Products.Queries.GetShippingQuery;

namespace ShoppingBasket.Core.Common.Features.Products.Queries
{
    public class GetShippingQueryTests : IRequest<double>
    {

        [Theory]
        [InlineData(0, 10)]
        [InlineData(10, 10)]
        [InlineData(50, 20)]
        [InlineData(70, 20)]
        public async Task GetShippingCostForAUDTest(double totalCost, int shippingCost)
        {

            var query = new GetShippingQuery(totalCost, "AUD");
            var handler = new GetShippingQueryHandler();
            var result = await handler.Handle(query, CancellationToken.None);
            result.ShouldNotBe(0);
            result.ShouldBeOfType<double>();
            result.ShouldBeOneOf(new double[] { 10, 20 });
            Assert.Equal(shippingCost, result);
        }


        [Theory]
        [InlineData(0, 10, "INR")]
        [InlineData(10, 10, "INR")]
        [InlineData(50, 20, "USD")]
        [InlineData(70, 20, "USD")]
        [InlineData(60, 20, "INR")]
        [InlineData(5, 20, "USD")]
        public async Task GetShippingCostCurrencyTest(double totalCost, int shippingCost, string currency)
        {
            var query = new GetShippingQuery(totalCost, currency);
            var handler = new GetShippingQueryHandler();
            var result = await handler.Handle(query, CancellationToken.None);
            result.ShouldNotBe(0);
            result.ShouldBeOfType<double>();
            result.ShouldBeOneOf(new double[] { 10, 20 });
            Assert.Equal(shippingCost, result);
        }
    }
}