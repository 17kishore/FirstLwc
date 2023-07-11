trigger OpportunityLineItem on OpportunityLineItem (after insert,After delete) {
    
    if(trigger.isAfter && trigger.isInsert){
     OpportunityLineItemTriggerHandler.afterLineItemInsertandDelete(trigger.new);
   }
    
    if(trigger.isAfter && trigger.isDelete){
      OpportunityLineItemTriggerHandler.afterLineItemInsertandDelete(trigger.old);
  }
    
}