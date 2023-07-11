@isTest
public class TestMarketMap{
    
    @isTest
    public static void mapTestBilling(){
    ProductMap p1=new ProductMap('wm',1000,10,100);
    ProductMap p2=new ProductMap('tv',1000,10,100);
    ProductMap p3=new ProductMap('ac',1000,10,100);
    SuperMarketMap sm=new SuperMarketMap();
     sm.mapProduct.put(001,p1);
     sm.mapProduct.put(002,p2);
     sm.mapProduct.put(003,p3);

     string r=sm.billing(001,10);
     system.assertEquals('9000.0', r,'Problem in Billing Amount');
      
     r=sm.billing(001,1000);
     system.assertEquals('Less Stock', r,'More Stock May be Available');
      
     r=sm.billing(0010,1000);
     system.assertEquals('Invalid Code', r,' May be product Available');
        
     r=sm.reOrder();
     system.assertEquals('all product in order', r,' May be some product are less');
      
     r=sm.displayStock();
     system.assertEquals('print the product', r,' May be some product are less');  
    }
    
    @isTest
    public Static Void doTestSize(){
    ProductMap p1=new ProductMap('wm',1000,10,100);
    ProductMap p2=new ProductMap('tv',1000,10,100);
    ProductMap p3=new ProductMap('ac',1000,10,100);
    SuperMarketMap sm=new SuperMarketMap();
        
     string r=sm.billing(001,100);
     system.assertEquals('No product available to do Billing',r,'May be some product avaliable');
        
     r=sm.reOrder();
     system.assertEquals('No product in the list',r,'May be some product avaliable');
     
     r=sm.displayStock();
     system.assertEquals('No product in the list to Display',r,'May be some product avaliable');
        
     
    }
    @isTest
    public static void mapTestDisplay(){
    ProductMap p1=new ProductMap('wm',1000,10,100);
    ProductMap p2=new ProductMap('tv',1000,10,100);
    ProductMap p3=new ProductMap('ac',1000,10,100);
    SuperMarketMap sm=new SuperMarketMap();
     sm.mapProduct.put(001,p1);
     sm.mapProduct.put(002,p2);
     sm.mapProduct.put(003,p3);
        
     string r=sm.billing(001,100);
     system.assertEquals('90000.0', r,'Problem in Billing Amount');
      
    r=sm.reOrder();
   system.assertEquals('Some products are less in order',r,'May be some product are more');   

}
}