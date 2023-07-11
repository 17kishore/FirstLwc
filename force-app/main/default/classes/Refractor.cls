public class Refractor {
    
    public void refractionEmployee(){
        List<Employee__c> lstEmployee=new List<Employee__c>();
        for(Employee__c emp:[SELECT Id,Employee_Name__c FROM Employee__c ]){
            emp.Employee_Name__c=emp.Employee_Name__c+'refractor';
            lstEmployee.add(emp);
            
        }
        update lstEmployee;
    }
    
    public void refractionAccount(){
        list<Account> accountlist=new list<Account>();
       
        for(integer i=0;i<150;++i){
            Account accountObject=new  Account();
            accountObject.Name='Test'+i;
            accountlist.add(accountObject);
            }
        insert accountList;
    }
    
    public void refractionContact(){
        list<Contact> contactlist=new list<Contact>();
        Contact contactObject=new Contact();
        for(Account acc:[SELECT 
                         Id,Name 
                         FROM 
                         Account]){
         
         contactObject.AccountId=acc.Id;
         contactObject.LastName='surname'+acc.Name;
         contactlist.add(contactObject);
        }
        insert contactlist;
    }
    
}