trigger ContactRelationshipTrigger on Contact_Relationship__c (After update) {
    
    if(trigger.isAfter && trigger.isUpdate){
        
        ContactRelationshipTriggerHandler.afterUpdateContactRelationship();
    }
}