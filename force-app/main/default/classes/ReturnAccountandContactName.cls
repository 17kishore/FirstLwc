/********************************************************************
 * Class Name: Return Account and Contact Name
 * Created by: kishore v
 * Created on: 26/12/22
 * use of Class: Used parent to Child Query to return Account And Contact Records
 * ******************************************************************/

public class ReturnAccountandContactName{
    
/******************************************************************
 * Method Name :AccountContactName  
 * Use of Method : Used parent to Child Query to return Account And Contact Records
 * Params Used  : No Paremeters Used
 * ******************************************************************/   
    public static List<Account> accountContactName(){
        
        List<Account> accounts= [SELECT Name,
                                (SELECT LastName from Contacts ) 
                                FROM Account];
        
         for(Account acc:accounts){
            system.debug('Account Name :'+acc.Name);
            for(contact con:acc.Contacts){
                system.debug('Contact Name :'+con.LastName);
            }
         }
          return accounts;
    }
}