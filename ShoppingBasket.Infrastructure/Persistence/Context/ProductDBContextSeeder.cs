using ShoppingBasket.Common.Contants;
using ShoppingBasket.Core.Common.Entities;

namespace ShoppingBasket.Repository.Context
{
    public class ProductDBContextSeeder
    {
        public void Seed(ProductDBContext dbContext)
        {
            Product product = new()
            {
                Id = 1,
                Name = CommonConstants.DYNOMO_NAME,
                Description = CommonConstants.DYNOMO_DESC,
                Price = 23.00,
                CurrencyPrice = 23.00,
                PromtionalPrice = 11.50,
                CurrencyPromtionalPrice = 11.50
            };
            dbContext.Products.Add(product);

            product = new Product()
            {
                Id = 2,
                Name = CommonConstants.ORAL_NAME,
                Description = CommonConstants.ORAL_DESC,
                Price = 100.00,
                CurrencyPrice = 100.00,
                PromtionalPrice = 50.00,
                CurrencyPromtionalPrice = 50.00
            };
            dbContext.Products.Add(product);

            product = new Product()
            {
                Id = 3,
                Name = CommonConstants.NIVEA_NAME,
                Description = CommonConstants.NIVEA_DESC,
                Price = 9.00,
                CurrencyPrice = 9.00,
                PromtionalPrice = 4.50,
                CurrencyPromtionalPrice = 4.50
            };
            dbContext.Products.Add(product);

            product = new Product()
            {
                Id = 4,
                Name = CommonConstants.KITKAT_NAME,
                Description = CommonConstants.KITKAT_DESC,
                Price = 5.00,
                CurrencyPrice = 5.00,
                PromtionalPrice = 2.50,
                CurrencyPromtionalPrice = 2.50
            };
            dbContext.Products.Add(product);
        }
    }
}