trigger CustomerTrigger on Customer__c (after insert) {
    
    if(trigger.isAfter && trigger.isInsert){
        
        List<AccountTeamMember> atmToAdd=new List<AccountTeamMember>();
        
        for(Customer__c c:trigger.new){
            if(c.Account_Manager__c!=null){
                AccountTeamMember atm =new AccountTeamMember();
                atm.AccountId=c.Customer_Account__c;
                atm.UserId=c.Account_Manager__c;
                atm.TeamMemberRole='Account Manager';
                //atm.AccountAccessLevel='Read';
                //atm.CaseAccessLevel='Read';
                //atm.OpportunityAccessLevel='Read';
                atmToAdd.add(atm);
            }
        }
        insert atmToAdd;
    }

}