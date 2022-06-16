using ShoppingBasket.Core.Common.Entities;
using ShoppingBasket.Core.Common.Interfaces;
using ShoppingBasket.Repository.Context;

namespace ShoppingBasket.Repository
{
    public class ProductRepository : IProductRepository
    {
        private ProductDBContext _context;

        public ProductRepository(ProductDBContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return _context.Products.Local.ToList();
        }
    }
}