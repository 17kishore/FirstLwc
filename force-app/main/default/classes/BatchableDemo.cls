public class BatchableDemo implements Database.Batchable<sObject>{
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        
        
         string accList='SELECT Name FROM Account';

        return Database.getQueryLocator([Select Name from Account]);
   }
    
    public void execute(Database.BatchableContext bc,List<Account> scope){
        
        system.debug('Execute called');
   }
    
    public void finish(Database.BatchableContext bc){
        
        AsyncApexjob userId=[SELECT CreatedById,Status,TotalJobitems,NumberofErrors 
                             FROM AsyncApexjob WHERE Id=:bc.getJobId()];
        
      List<string> emailId=new List<string>{system.Label.Batch_Email_Id};
        
      string subject='Account Batch Processed and Finished';
      string plaintextbody='The Batch for Account has Finished And Updated Status of Job:  '
                                +userId.Status+'  TotalJobItems: '
                                      +userId.TotalJobitems+' NumberofErrors: '+userId.NumberofErrors;
        
        EmailUtilityFromBatch.sendEmailToOwner(emailId,subject,plaintextbody);
        
    }

}