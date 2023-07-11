trigger ContactTrigger2 on Contact (After insert,Before Update,Before Delete,After Undelete){
    
    if(trigger.isAfter && trigger.isInsert){
        ContactTriggerHandler.afterContactInsertCR();
    }
    
     if(trigger.isBefore && trigger.isDelete){
        
     ContactTriggerHandler.BeforeContactDeleteCR();
        
    }
    
    if(trigger.isAfter && trigger.isUndelete){
        
      ContactTriggerHandler.afterContactUnDeleteCR();
  }

}