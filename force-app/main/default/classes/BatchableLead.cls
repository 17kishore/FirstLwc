public class BatchableLead implements Database.Batchable<sObject>,Database.Stateful{
    
    List<string> leadWithErrors=new List<string>();
    List<string> leadWithErrors=new List<string>();

 public Database.QueryLocator start(Database.BatchableContext bc){
     
     date threeMonthsAgo=date.today().addMonths(-3);
     string str1='Open - Not Contacted';
     string str2='Working - Contacted';
     string query='Select LastName,Status from Lead where IsConverted=false'
                    + ' AND CreatedDate<=:threeMonthsAgo'
                       + ' AND (Status=:str1 OR Status=:str2)';
     
    return Database.getQueryLocator(query);
 }
    
    public void execute(Database.BatchableContext bc,List<Lead> leadList){
        
        string orgUrl=URL.getSalesforceBaseUrl().toExternalForm();
        List<Lead> leadToUpdate=new  List<Lead>();
        
        for(Lead ld:leadList){
            ld.LastName=ld.LastName+ '1'; 
            leadToUpdate.add(ld);
        }
        
      List<Database.SaveResult> errorRecords=Database.update(leadToUpdate,false);
        
        for(Database.SaveResult sr:errorRecords){
            if(!sr.isSuccess()){
               leadWithErrors.add(orgUrl+'/'+sr.getId()); 
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
     }
}