@isTest
public class testMarket {

   
    @isTest
    public static void dotestBilling(){
        Product p1=new Product(001,'wm',1000,10,100);
        Product p2=new Product(002,'tv',1000,10,100);
        Product p3=new Product(003,'ac',1000,10,100);
        SuperMarket sm=new SuperMarket();
         sm.lstproduct.add(p1);
         sm.lstproduct.add(p2);
         sm.lstproduct.add(p3);
           
        string r=sm.displayStock();
        system.assertEquals( 'Product available to display',r,'size is greater than expected');
        
       r=sm.reOrder();
       system.assertEquals('Stock less than 20 are there',r,'size is greater than expected');
        
         r=sm.billing(001,80);
        system.assertEquals('72000.0',r,'Acutal amount is not returning');
        
        r=sm.billing(001,800);
        system.assertEquals('less stock available',r,'Acutal amount is not returning');
        
         r=sm.billing(0010,800);
        system.assertEquals('Invalid Product code',r,'Acutal amount is not returning');
      }
     @isTest
    public static void dotestSize(){
       Product p1=new Product(001,'wm',1000,10,100);
        Product p2=new Product(002,'tv',1000,10,100);
        Product p3=new Product(003,'ac',1000,10,100);
        SuperMarket sm=new SuperMarket();
        
        string r=sm.reOrder();
        system.assertEquals('No product in the list',r,'some products in the list');
        
        r=sm.displayStock();
        system.assertEquals('No product in the list to Display',r,'some products in the list');      
        
        r=sm.billing(001,100);
        system.assertEquals('No product available to do Billing',r,'some products in the list');    
    }
}