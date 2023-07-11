public class SuperMarketMap {
    
    public decimal totalAmount;
    
        public map<integer,ProductMap> mapProduct = new map<integer,ProductMap>();
        
        public string billing(integer productCode ,integer quantity){
        if(mapProduct.size()==0){
            system.debug('No product available to do Billing');
            return 'No product available to do Billing';
        }
          
        if(mapProduct.containsKey(productCode) && mapProduct.get(productCode).stock>=quantity ){
                totalAmount=quantity*(mapProduct.get(productCode).price-(mapProduct.get(productCode).price*(mapProduct.get(productCode).discount/100)));
                mapProduct.get(productCode).stock=mapProduct.get(productCode).stock- quantity;
                system.debug('-------Billing the Product--------');
                system.debug('Total Bill Amount:'+totalAmount);
                string str1=string.valueOf(totalAmount);
                return str1;
            } else if(mapProduct.containsKey(productCode) && mapProduct.get(productCode).stock<quantity){
                system.debug('Less Stock:'+mapProduct.get(productCode).stock);
                return 'Less Stock';
                } else {
                system.debug('invalid Product Code');
            }
            return 'Invalid Code';
        }
        
       public string reOrder(){
        if(mapProduct.size()==0){
            system.debug('No product in the list');
        }
           for(integer key:mapProduct.keyset()){
               if(mapProduct.get(key).stock>20){
                   system.debug('all product in order');
                   return 'all product in order';
               } else if(mapProduct.get(key).stock<20){
                   system.debug('product code:'+mapProduct.get(key));
                   system.debug('product name:'+mapProduct.get(key).name);
                   system.debug('product stock:'+mapProduct.get(key).stock);
                   
               }
             return 'Some products are less in order';
          }
       return 'No product in the list';
       
   }      
    public string displayStock(){
        if(mapProduct.size()==0){
            system.debug('No product in the list to Display');
            return 'No product in the list to Display';
        }
        for(integer key:mapProduct.keyset()){
            system.debug(mapProduct.get(key));
        }
        return 'print the product';
     }
}