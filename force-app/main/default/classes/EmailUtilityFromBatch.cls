public class EmailUtilityFromBatch {
    
    public static void sendEmailToOwner(List<string> emailId,string subject,string plainTextBody){
        
        messaging.SingleEmailMessage message=new messaging.SingleEmailMessage();
        
        message.toaddresses=emailId;
        message.subject=subject;
        message.plaintextbody=plainTextBody;
        
        List<messaging.SingleEmailMessage> messages=new List<messaging.SingleEmailMessage>{message};
        messaging.sendEmail(messages);  
    }
}