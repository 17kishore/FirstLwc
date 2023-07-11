/********************************************************************
 * Class Name: AccountCreationandOpportunity
 * Created by: kishore v
 * Created on: 26/12/22
 * use of Class: To create Account and Opportunity
 * ******************************************************************/

public class AccountCreationandOpportunity {

/******************************************************************
 * Method Name :accountCreate  
 * Use of Method :It Recieves a List of Names Using That It Create opportunity
 * Params Used  : List<string> used to store Opportunity Names
 * ******************************************************************/   
    
   public static void accountCreate(List<string> opportunityName){
        
        List<Opportunity> lstOpportunity=new List<Opportunity>();
        
        Account acc=new Account();
        acc.name='Wilco Source Account';
        insert acc;

        for(integer i=0;i<opportunityName.size();i++){
            
            Opportunity opp=new Opportunity();
                opp.name=opportunityName[i];
                opp.StageName='Prospecting';
                opp.CloseDate=Date.Today();
                opp.AccountId=acc.id;
                lstOpportunity.add(opp);
            
        }
        insert lstOpportunity;
     }
}