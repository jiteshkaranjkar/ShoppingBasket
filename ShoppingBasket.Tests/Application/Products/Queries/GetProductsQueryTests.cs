using Moq;
using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Features.Products.Queries;
using ShoppingBasket.Core.Common.Interfaces;
using ShoppingBasket.Tests.Mocks;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using static ShoppingBasket.Core.Common.Features.Products.Queries.GetProductsQuery;

namespace ShoppingBasket.Tests.Application.Products.Queries
{
    public class GetProductsQueryTests
    {
        private readonly Mock<IProductRepository> _mockProductsRepo;
        private readonly Mock<IUnitOfWork> _uow;
        public GetProductsQueryTests()
        {
            _mockProductsRepo = MockProductRepository.GetProductRepository();
            _uow = MockUnitOfWork.GetUnitOfWork();
        }

        [Fact]
        public async Task GetAllProductsTest()
        {
            var query = new GetProductsQuery();
            var handler = new GetProductsQueryHandler(_uow.Object);
            var result = await handler.Handle(query, CancellationToken.None);
            result.ShouldNotBeNull();
            result.ShouldBeOfType<List<Product>>();
            result.Count().ShouldBe(2);
        }
    }
}