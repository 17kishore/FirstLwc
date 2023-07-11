public class FutureDemo {
    
    @invocableMethod
    public static void sendEmailToOwner(List<string> emailId){
        FutureDemo.futureMethod(emailId);
   }
    
    public static void futureMethod(List<String> lstEmail){
        
        messaging.SingleEmailMessage message=new messaging.SingleEmailMessage();
        message.toaddresses=lstEmail;
        message.subject='Account with Hot Rating created';
        message.plaintextbody='Account with Hot Rating Created And you are the Owner';
        
        List<messaging.SingleEmailMessage> messages=new List<messaging.SingleEmailMessage>{message};
        messaging.sendEmail(messages);  

}
}