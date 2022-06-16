using Microsoft.Extensions.Configuration;
using ShoppingBasket.Core.Common.Interfaces;

namespace ShoppingBasket.Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private bool disposed = false;
        public IProductRepository ProductRepo { get; set; }

        public UnitOfWork(IProductRepository productRepository)
        {
            ProductRepo = productRepository;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    ProductRepo.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}