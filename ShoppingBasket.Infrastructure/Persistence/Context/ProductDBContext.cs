using Microsoft.EntityFrameworkCore;
using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Interfaces;

namespace ShoppingBasket.Repository.Context
{
    public class ProductDBContext : DbContext, IApplicationDbContext
    {
        public ProductDBContext(DbContextOptions<ProductDBContext> options) : base(options)
        {
            ProductDBContextSeeder seedProducts = new();
            seedProducts.Seed(this);
        }
        public DbSet<Product> Products { get; set; }

    }
}
