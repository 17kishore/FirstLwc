public class OpportunityLineItemTriggerHandler {
    
    public static void afterLineItemInsertandDelete(List<OpportunityLineItem> lstLineItem){
        
    Set<Id> oppIds = new Set<Id>();
    List<Opportunity> lstToUpdate=new  List<Opportunity>();
   
    for (OpportunityLineItem lineItem :lstLineItem) {
     oppIds.add(lineItem.OpportunityId);
    }
        
        for(Opportunity opp: [Select id, Name, Opp_LineItem_ProductCode__c,
                              (Select Id,ProductCode from OpportunityLineItems) 
                              from Opportunity where Id IN:oppIds]) {
                                  
        Opportunity opp1= new Opportunity();
        opp1.Id = opp.Id;
        List<String> productCodes= new List<String>(0); 
             for(OpportunityLineItem item:opp.OpportunityLineItems){
                 ProductCodes.add(item.ProductCode);
              }
              opp1.Opp_LineItem_ProductCode__c = String.join(productCodes,',');
              lstToUpdate.add(opp1);
            }
        update lstToUpdate;
     }
}