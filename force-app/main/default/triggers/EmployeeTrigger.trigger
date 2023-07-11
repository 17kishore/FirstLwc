trigger EmployeeTrigger on Employee__c (after delete) {
    
    set<Id> accIds=new set<Id>();
    list<Account> accUpdateList = new list<Account>();
    
    for(Employee__c emp:Trigger.old){
        if(emp.AccountId__c!=null){
        accIds.add(emp.AccountId__c);
    }
 }
    Map<id,Account> accList=new Map<id,Account>([select id,
                                                (Select Employee_Name__c from Employees__r)
                                                 from Account 
                                                 where Id In:accIds]);
    system.debug(accList);
    for(Account acc:accList.values())
    {
        system.debug(acc.Employees__r);
        if(acc.Employees__r.isEmpty()){
            acc.Active__c='No';
            accUpdateList.add(acc);
        }
    }
    update accUpdateList;
}