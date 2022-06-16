using Microsoft.EntityFrameworkCore;
using ShoppingBasket.Core.Common.Entities;

namespace ShoppingBasket.Core.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Product> Products { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
