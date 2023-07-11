public class LeadBatchOwnerChange  implements Database.Batchable<sObject>,Database.stateful{
    
    List<string> leadWithErrors=new List<string>();
    List<string> taskWithErrors=new List<string>();
    string defaultManagerId=System.Label.Default_Lead_Owner_Without_Manager;
    string orgUrl=URL.getSalesforceBaseUrl().toExternalForm();
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        
        string str1='Working - Contacted';
        string str2='Open - Not Contacted';
        string query='select id,OwnerId from Lead'
                          + ' where CreatedDate=Today And IsConverted=false' 
                           + ' And (Status=:str1 Or Status=:str2)';
        
        return Database.getQueryLocator(query);
        
  }
     public void execute(Database.BatchableContext bc,List<Lead> lstLeads){
         
         string orgUrl=URL.getSalesforceBaseUrl().toExternalForm();
         
         Set<Id> leadOwnerIds=new Set<Id>();
         Map<Id,user> userManagerId=new Map<Id,User>();
         List<Lead> leadToUpdate=new List<Lead>();
         List<Task> ManagerTask=new List<Task>();
         
         for(Lead ld:lstLeads){
            leadOwnerIds.add(ld.OwnerId); 
         }
         
        List<user> ManagerIds=[Select ManagerId from User where Id In:leadOwnerIds AND ManagerId!=Null];
        
         
         for(user userRec:ManagerIds){
             userManagerId.put(userRec.Id,UserRec);
         }

         for(Lead leadOwner:lstLeads){
       
             if(userManagerId.get(leadOwner.OwnerId)==NULL){
                 LeadOwner.OwnerId=defaultManagerId;
             } else {
                 LeadOwner.OwnerId=userManagerId.get(leadOwner.OwnerId).ManagerId;
             }
                 Task tasks=new Task();
                 tasks.WhoId=leadOwner.Id;
                 tasks.ActivityDate=system.today();
                 tasks.Subject='Owner Changed';
                 tasks.Priority='High';
                 tasks.Description='Lead With No Activity';
                 tasks.OwnerId=leadOwner.OwnerId;
                 
                 leadToUpdate.add(leadOwner);
                 ManagerTask.add(tasks);
         }
         
        List<Database.SaveResult> ErrorLead=Database.update(leadToUpdate,false);
          
          for(Database.SaveResult sr:ErrorLead){
            if(!sr.isSuccess()){
               leadWithErrors.add(orgUrl+'/'+sr.getId()); 
            }
        }
         
        List<Database.SaveResult> ErrorTask=Database.insert(ManagerTask,false);
         
          for(Database.SaveResult sr:ErrorTask){
            if(!sr.isSuccess()){
                for(Database.Error error:sr.getErrors()){
                    taskWithErrors.add(error.getMessage());
               } 
            }
        }
         
   }
    
     public void finish(Database.BatchableContext bc){
         
         if(leadWithErrors.size()>0){
            
        List<string> emailId=new List<string>{system.Label.Batch_Email_Id};
        string subject='Updated Failed Error in Lead Records';
        string plainTextBody='The Following Lead Records are Failed to update: \n';
        for(string lcc:leadWithErrors){
            plainTextBody+=lcc + '\n';
            
         }
        EmailUtilityFromBatch.sendEmailToOwner(emailId,subject,plainTextBody); 
        }
         
         if(taskWithErrors.size()>0){
             
        List<string> emailId=new List<string>{system.Label.Batch_Email_Id};
        string subject='Updated Failed Error in Task Records';
        string plainTextBody='The Following Task Records are Failed to Insert: \n';  
          
         for(string lcc:TaskWithErrors){
            plainTextBody+=lcc + '\n';
          }
        EmailUtilityFromBatch.sendEmailToOwner(emailId,subject,plainTextBody); 
         }
         
     }
}