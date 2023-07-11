public class SuperMarket {
    
   public decimal totalAmount;
   public integer count=0;
    string str1;
    
    public list<Product> lstproduct = new list<Product>();
    
    public string billing(integer productCode,integer quantity){
        if(lstproduct.size()==0){
            system.debug('No product available to do Billing');
            return 'No product available to do Billing';
        }
        for(Product p: lstproduct){
             if(p.code==productCode && p.stock>=quantity){
                totalAmount=quantity*(p.price-(p.price*(p.discount/100)));
                p.stock=p.stock- quantity;
                system.debug('-------Billing the Product--------');
                system.debug('Total Bill Amount:'+totalAmount);
                str1=string.valueOf(totalAmount);
                return str1;
             } else if(p.code==productCode && p.stock<quantity){
                 system.debug('less stock available:'+p.name+'='+p.stock);
                 return 'less stock available';
             } else {
                 count=count+1;
                }
        }
        
           if(count>2){
            system.debug('Invalid Product code');
            }
        return 'Invalid Product code';
    }
       
 
    
    public string reOrder(){
        if(lstproduct.size()==0){
            system.debug('No product in the list');
            return 'No product in the list';
        }
        for(Product p:lstproduct){
            if(p.stock<20){
                system.debug('Product Code:'+p.code);
                system.debug('Product Name:'+p.name);
                system.debug('Product Code:'+p.stock);
            }
        }
        return 'Stock less than 20 are there';
    }
         
        
    public string displayStock(){
        if(lstproduct.size()==0){
            system.debug('No product in the list to Display');
            return 'No product in the list to Display';
}

           for(Product p:lstproduct){
            system.debug(p);
           
        }
         return 'Product available to display';

     }
}