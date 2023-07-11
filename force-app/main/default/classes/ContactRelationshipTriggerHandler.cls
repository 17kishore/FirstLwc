public class ContactRelationshipTriggerHandler {
    
    public static void afterUpdateContactRelationship(){
        
       Map<Id,Contact_Relationship__c> oldRecords=(Map<Id,Contact_Relationship__c>)Trigger.oldmap;
       List<Contact_Relationship__c> lstToAdd=new List<Contact_Relationship__c>();
        
       List<Contact_Relationship__c> lstconRelationship=[select id,Owner.Name,OwnerId 
                                                         from Contact_Relationship__c 
                                                         where id in:trigger.new];
        
       for(Contact_Relationship__c cR:lstconRelationship){
           
          Contact_Relationship__c  oldcR=oldRecords.get(cR.Id);
            if(oldcR.OwnerId!=cR.OwnerId){
             cR.Name=cR.Owner.Name;
             lstToAdd.add(cR);                                           
                }
           }
       update lstToAdd;
    }

}