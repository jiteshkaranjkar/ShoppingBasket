using ShoppingBasket.Core.Common.Entities;

namespace ShoppingBasket.Core.Common.Interfaces
{
    public interface IProductRepository : IDisposable
    {
        Task<List<Product>> GetAllProducts();
    }
}
