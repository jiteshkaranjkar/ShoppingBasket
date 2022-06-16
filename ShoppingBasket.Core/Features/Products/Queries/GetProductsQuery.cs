using MediatR;
using Serilog;
using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Interfaces;

namespace ShoppingBasket.Core.Common.Features.Products.Queries
{
    public class GetProductsQuery : IRequest<List<Product>>
    {
        public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<Product>>
        {
            private readonly IUnitOfWork _uow;

            public GetProductsQueryHandler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<List<Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
            {
                Log.Information("Get Products using CQRS with MediatR pattern with EFCore!");
                var result =  await _uow.ProductRepo.GetAllProducts();
                return result;
            }
        }
    }
}