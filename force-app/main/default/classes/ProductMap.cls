public class ProductMap{
    public integer stock;
    public string name;
    public decimal price,discount;
    
   public ProductMap(string name,decimal price,decimal discount,integer stock)
        {
          this.stock=stock;
          this.name=name;
          this.price=price;
          this.discount=discount;
        }
}