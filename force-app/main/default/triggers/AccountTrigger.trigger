trigger AccountTrigger on Account (before insert,after insert,before delete,after undelete,after update) {
    
          if(trigger.isBefore && trigger.isInsert){
                AccountTriggerHandler.beforeAccountInsert();
           }
           if(trigger.isBefore && trigger.isDelete){
              AccountTriggerHandler.beforeAccountDelete();
            }
    
          if(trigger.isAfter && trigger.isUndelete){
                AccountTriggerHandler.afterAccountUndelete();
            }
    
           if(trigger.isAfter &&  trigger.isInsert ){
                AccountTriggerHandler.afterAccountInsert();
            }
}