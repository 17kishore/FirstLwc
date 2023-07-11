public class CustomerProjectTriggerHandler {
    
    public static void afterCustomerProjectInsert(){
        
    Set<Id> oppids=new set<id>();
    List<Opportunity> oppToUpdate = new List<Opportunity>();
    
    for(Customer_Project__c cp:(List<Customer_Project__c>)trigger.new){
        if(cp.OpportunityId__c!=null && cp.Status__c=='Active'){
            Opportunity opp=new Opportunity();
              opp.Id=cp.OpportunityId__c;
              opp.Active_Customer_Project__c=true;
              oppToUpdate.add(opp);
            
        }
    }
         update oppToUpdate;
    }
}