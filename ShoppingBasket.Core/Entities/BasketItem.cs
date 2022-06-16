namespace ShoppingBasket.Core.Common.Entities
{
    public class BasketItem
    {
        public List<Product> Products { get; set; }

        public int TotalQuantity { get; set; }

        public int TotalPrice { get; set; }

        public int ShippingCost { get; set; }

        public BasketItem(List<Product> products, int totalQuantity, int totalPrice, int shippingCost)
        {
            Products = products;
            TotalQuantity = totalQuantity;
            TotalPrice = totalPrice;
            ShippingCost = shippingCost;
        }
    }
}