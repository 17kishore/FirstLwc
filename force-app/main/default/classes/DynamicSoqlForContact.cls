/********************************************************************
 * Class Name:  DynamicSoqlForContact 
 * Created by: kishore v
 * Created on: 26/12/22
 * use of Class: Dynamicly query the contact fields from Contact And Associated Account with Filter
 * ******************************************************************/
public class DynamicSoqlForContact {
    
/******************************************************************
 * Method Name :returnContact
 * Use of Method :Dynamicly query the contact fields from Contact And Associated Account with Filter(Rating field)
 * Params Used  : Two Parameter 1.contactFields=Holds the list of Contact Fields
 *                2.rating=Account field rating (Acts as Filter)
 * ******************************************************************/ 
    
    public static void returnContact(List<string> contactFields ,string rating){
        
           set<string> ratings=new set<string>();
            
           List<Schema.PicklistEntry> picklistValues = Account.Rating.getDescribe().getPicklistValues();
           for (Schema.PicklistEntry picklistValue : picklistValues) {
           ratings.add(picklistValue.getLabel());
           } 
 
        if(!ratings.contains(rating)){
            system.debug('Invalid Value');
        }
        string str1='SELECT Name,Rating, (SELECT '+string.join(contactFields,',')
                                                + ' FROM Contacts) FROM Account WHERE Rating =:rating';
        
        List<Account> lstAccount=database.query(str1);
            
            
        
        for(Account acc:lstAccount){
            system.debug('Account Name :'+acc.Name+', Rating='+acc.Rating);
            for(Contact con:acc.Contacts){
                system.debug('Contact Name :'+con.LastName);
            
            }
        }
    }
 }