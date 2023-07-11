trigger ContactTrigger on Contact (After insert,After delete,After unDelete) {
    
    
    if(trigger.isAfter && (trigger.isInsert || trigger.isunDelete) ){ 
    /* ContactTriggerHandler.afterContactInsert_Delete_Undelete(trigger.new);*/
        string jsonString=json.serialize(trigger.new);
        FutureContact.countContacts(jsonString);  
    }

     if(trigger.isAfter && trigger.isDelete){ 
      /*ContactTriggerHandler.afterContactInsert_Delete_Undelete(trigger.old);*/
        string jsonString=json.serialize(trigger.old);
        FutureContact.countContacts(jsonString);  
         
     }
    
}