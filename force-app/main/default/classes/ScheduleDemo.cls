public class ScheduleDemo implements Schedulable{
    
    public static void execute(SchedulableContext ctx){
        
         string orgUrl=URL.getSalesforceBaseUrl().toExternalForm();
        
        List<Lead> lstLead=[select Id,Name from Lead 
                            where CreatedDate=Today 
                            And Status='Open - Not Contacted'];
        
        if(lstLead.size()>0){
            
        List<string> emailId=new List<string>{system.Label.Batch_Email_Id};
        string subject='Open Not Contacted Leads created Today';
        String plainTextBody='These are the Leads Who you have to contact: \n';
        for(Lead lcc:lstLead){
            plainTextBody+=orgUrl+'/'+lcc.Id+'\n';
        }
         
         EmailUtilityFromBatch.sendEmailToOwner(emailId,subject,plainTextBody); 
       }
    }
}