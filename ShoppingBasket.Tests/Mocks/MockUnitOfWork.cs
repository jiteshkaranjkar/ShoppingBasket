using Moq;
using ShoppingBasket.Core.Common.Interfaces;

namespace ShoppingBasket.Tests.Mocks
{
    public class MockUnitOfWork
    {
        public static Mock<IUnitOfWork> GetUnitOfWork()
        {
            var mockUow = new Mock<IUnitOfWork>();

            var mockProductsRepo = MockProductRepository.GetProductRepository();

            mockUow.Setup(r => r.ProductRepo).Returns(mockProductsRepo.Object);

            return mockUow;
        }
    }
}
