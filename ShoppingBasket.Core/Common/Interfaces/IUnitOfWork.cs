namespace ShoppingBasket.Core.Common.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository ProductRepo { get; }
    }
}