public class AccountTriggerHandler {
 
public static void beforeAccountInsert(){
        for(Account acc:(List<Account>) trigger.new){
                  if(acc.Rating!=null && acc.Rating.equals('Hot') && acc.AnnualRevenue==null){ 
                      acc.AnnualRevenue=200000;
                  } 
      } 
    }
    
    public static void beforeAccountDelete(){
        
        Map<Id,Account> accWithErrors=new Map<Id,Account>();
        Profile p=[select id,Name from profile where Id=:UserInfo.getProfileId()];
        
         for(Account acc:(List<Account>)trigger.old){
             
               if(acc.ParentId!=null){ 
                    accWithErrors.put(acc.Id,acc);
                       for(Id accId:accWithErrors.keyset()){
                           accWithErrors.get(accId).ParentId.addError('Account unable to delete due to parent record');
                   }
           }       
             else{
                          if(p.Name!='System Administrator'){
                              accWithErrors.put(acc.Id,acc);
                                  for(Id accId:accWithErrors.keyset()){
                                      accWithErrors.get(accId).addError('Only system Admin able to delete Account Records');
                                    }
                               }
                        }
                }  
       }
    
     
    public static void afterAccountUndelete(){
        List<Account> accountList = new List<Account>();
        List<Account> acc=[select id,name from Account Limit 1];
                  for(Account acc1:[SELECT ID, Name from Account where Id IN :(List<Account>)trigger.new]){
                     for(Account a:acc){
                     acc1.ParentId=a.id;
                     acc1.Active__c='Yes';
                     accountList.add(acc1);
           }  
      }
         update accountList;
    }
    
    public static void afterAccountInsert(){
        Set<Id> accids=new set<id>();
        List<Contact> conList = new List<Contact>();
        for(Account acc:(List<Account>)trigger.new){
                    if(acc.NumberofLocations__c!=null){
                        for(integer i=0;i<acc.NumberofLocations__c;++i){
                            Contact con=new contact();
                            con.LastName='Contact'+' '+i;
                            con.AccountId=acc.id;
                            conList.add(con);
                        }
                    }
                }
               
    insert conList;
    }
}