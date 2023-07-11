public class Product{
    public integer code,stock;
    public string name;
    public decimal price,discount;
    
   public Product(Integer code,string name,decimal price,decimal discount,integer stock)
        {
          this.code=code;
          this.stock=stock;
          this.name=name;
          this.price=price;
          this.discount=discount;
        }
}