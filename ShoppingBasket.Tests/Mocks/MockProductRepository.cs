using Moq;
using ShoppingBasket.Common.Contants;
using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Interfaces;
using System.Collections.Generic;

namespace ShoppingBasket.Tests.Mocks
{
    public class MockProductRepository
    {
        public static Mock<IProductRepository> GetProductRepository()
        {
            var products = new List<Product>()
            {
                new()
                {
                    Id = 1,
                    Name = CommonConstants.DYNOMO_NAME,
                    Description = CommonConstants.DYNOMO_DESC,
                    Price = 23.00,
                    PromtionalPrice = 11.50
                },
                new Product()
                {
                    Id = 2,
                    Name = CommonConstants.ORAL_NAME,
                    Description = CommonConstants.ORAL_DESC,
                    Price = 100.00,
                    PromtionalPrice = 50.00
                }
            };

            var mockProductsRepo = new Mock<IProductRepository>();

            mockProductsRepo.Setup(r => r.GetAllProducts()).ReturnsAsync(products);

            return mockProductsRepo;
        }
    }
}
