using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ShoppingBasket.Core.Common.Interfaces;
using ShoppingBasket.Infrastructure.Persistence;
using ShoppingBasket.Repository;
using ShoppingBasket.Repository.Context;

namespace ShoppingBasket.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddDbContext<ProductDBContext>(options => options.UseInMemoryDatabase("ShoppingBasket"), ServiceLifetime.Scoped, ServiceLifetime.Scoped);
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();

            return services;
        }
    }
}
