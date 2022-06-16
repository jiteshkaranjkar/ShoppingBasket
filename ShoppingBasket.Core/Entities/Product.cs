namespace ShoppingBasket.Core.Common.Entities
{
    public class Product
    {
        private string _currency = "AUD";

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Price { get; set; } = 0;
        public double CurrencyPrice { get; set; } = 0;
        public double PromtionalPrice { get; set; } = 0;
        public double CurrencyPromtionalPrice { get; set; } = 0;
        public int Quantity { get; set; } = 0;
        public string Currency
        {
            get { return _currency; }
        }
    }
}
