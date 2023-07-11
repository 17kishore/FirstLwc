trigger CustomerProjectTrigger on Customer_Project__c (After insert) {
    
    if(trigger.isAfter && trigger.isInsert ){
        CustomerProjectTriggerHandler.afterCustomerProjectInsert();
    }

}