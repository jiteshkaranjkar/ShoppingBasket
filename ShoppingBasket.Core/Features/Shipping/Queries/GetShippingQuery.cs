using MediatR;
using Serilog;
using ShoppingBasket.Common.Enums;

namespace ShoppingBasket.Core.Common.Features.Products.Queries
{
    public class GetShippingQuery : IRequest<double>
    {
        public double TotalCost { get; }
        public string currencyUsed { get; } = null!;

        public GetShippingQuery(double totalCost, string currency)
        {
            TotalCost = totalCost;
            currencyUsed = currency;
        }
        public class GetShippingQueryHandler : IRequestHandler<GetShippingQuery, double>
        {

            public async Task<double> Handle(GetShippingQuery request, CancellationToken cancellationToken)
            {
                Log.Information("Get the total shipping cost based on total shopping amount!");
                //The checkout page will call a backend to calculate the total shipping cost. $10 shipping cost for orders less of $50 dollars and less. $20 for orders more than $50.
                if (request.currencyUsed == Currency.INR.ToString())
                {
                    if (request.TotalCost >= 50 * 54)
                        return 20 * 54;
                    else
                        return 10 * 54;
                }
                else if(request.currencyUsed == Currency.USD.ToString())
                {
                    if (request.TotalCost >= 50 * 0.70)
                        return 20 * 0.70;
                    else
                        return 10 * 0.70;
                }
                else
                {
                    if (request.TotalCost >= 50 * 54)
                        return 20;
                    else
                        return 10;
                }
            }
        }
    }
}