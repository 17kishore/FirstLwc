public class FutureContact{
    
    @future
    public static Void countContacts(string jsonString){
        
        List<Contact> conList=(List<Contact>)json.deserialize(jsonString, List<Contact>.class);
       
        Set<Id> accids=new set<id>();
        List<Account> accountsToUpdate= new List<Account>();
        
        for(contact con:ConList){
        if(con.AccountId!=Null){
            accids.add(con.AccountId);
        } 
     }
        For(AggregateResult ar: [SELECT 
                                AccountId,count(id) Total 
                                FROM contact 
                                WHERE AccountId IN:accids 
                                GROUP BY AccountId]){
                                    
         Account acc=new Account();
         acc.Id=(Id)ar.get('AccountId');
         acc.Count_of_Contacts__c=(decimal)ar.get('Total'); 
         accountsToUpdate.add(acc);
    }
    update accountsToUpdate;
   }
}