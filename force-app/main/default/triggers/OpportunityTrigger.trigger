trigger OpportunityTrigger on Opportunity (after insert) {
    
    Set<Id> accIds=new Set<Id>();
    List<Account> accountsToUpdate = new List<Account>();
    
if(trigger.isAfter && trigger.isInsert){
    for(opportunity opp:trigger.new){
        if(opp.AccountId!=Null){
            accIds.add(opp.AccountId);
    }
}
    for(AggregateResult ar :[SELECT 
                             AccountId, MAX(Amount) maxAmount 
                             FROM 
                             Opportunity 
                             WHERE AccountId IN :accIds 
                             GROUP BY AccountId]){
    
    Account acc=new Account();
    acc.Id=(Id)ar.get('AccountId');
    acc.Highest_Opportunity_Amount__c=(Decimal)ar.get('maxAmount');
    accountsToUpdate.add(acc);
      }
  }
    update accountsToUpdate;
}