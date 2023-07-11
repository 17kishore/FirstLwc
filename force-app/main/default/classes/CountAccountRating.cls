/********************************************************************
 * Class Name: CountAccountRating
 * Created by: kishore v
 * Created on: 26/12/22
 * use of Class: To Count Rating of Account Based on Values
 * ******************************************************************/

public class CountAccountRating {

/******************************************************************
 * Method Name :countRating 
 * Use of Method : To Count Rating of Account Based on Values
 * Params Used  : No params Used
 * ******************************************************************/ 
    public static void countRating(){
        
        /* map<string,integer> ratingCount=new map<string,integer>();

        List<Account> acc=[select Rating from Account where Rating!=NULL];
        for(Account a:acc){
            string rating=a.Rating;
            
            if(ratingCount.containsKey(rating)){
                ratingCount.put(rating,ratingCount.get(rating)+1);
            } 
            else {
                ratingCount.put(rating,1);
            }
        }
        system.debug(ratingCount);
     }*/
       Map<string,Integer> mapRating=new Map<string,Integer>();
        
       List<Schema.PicklistEntry> picklistValues = Account.Rating.getDescribe().getPicklistValues();
       for (Schema.PicklistEntry picklistValue : picklistValues) {
       mapRating.put(picklistValue.getLabel(),0);
       } 
        
        List<AggregateResult> results=[select Rating,Count(id) total from Account 
                                       Where Rating!=NULL AND Rating IN:(mapRating.keyset())
                                       Group By Rating];
      
            for(AggregateResult ar:results){
            
            string rating=(string)ar.get('Rating');
            Integer count=(Integer)ar.get('total');
            mapRating.put(rating,count); 
         }
       system.debug(mapRating);
    }
}