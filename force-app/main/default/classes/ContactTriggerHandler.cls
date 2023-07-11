public class ContactTriggerHandler {
    
    public static void afterContactInsert_Delete_Undelete(List<contact> lstCon){
        Set<Id> accids=new set<id>();
        List<Account> accountsToUpdate= new List<Account>();
        for(contact con:lstCon){
        if(con.AccountId!=Null){
            accids.add(con.AccountId);
        } 
            
    }
    For(AggregateResult ar:[select 
                            AccountId,count(id) total 
                            from contact 
                            where AccountId IN:accids group by AccountId]){
         Account acc=new Account();
         acc.Id=(Id)ar.get('AccountId');
         acc.Count_of_Contacts__c=(decimal)ar.get('total'); 
         accountsToUpdate.add(acc);
    }
    update accountsToUpdate;

    }
    
    public static void afterContactInsertCR(){
         List<Contact_Relationship__c> crToAdd=new List<Contact_Relationship__c>();
        for(Contact con:(List<Contact>)trigger.new){
            if(con.Contact_Relationship__c==true){
                Contact_Relationship__c cr=new Contact_Relationship__c();
                cr.ContactId__c=con.Id;
                cr.Name=con.LastName;
                crToAdd.add(cr);
        }
            
        } 
        insert crToAdd;
    }
    
    public static void BeforeContactDeleteCR(){
     List<Contact_Relationship__c> lstToDel=[select 
                                             id from Contact_Relationship__c 
                                             where ContactId__c in:trigger.old];
     delete lstToDel;
        
    }
    
    public static void afterContactUnDeleteCR(){
        
     List<Contact_Relationship__c> con=[select 
                                        id from Contact_Relationship__c 
                                        where IsDeleted=true and ContactId__c IN:trigger.new ALL ROWS];
     undelete con;
    }
    
}