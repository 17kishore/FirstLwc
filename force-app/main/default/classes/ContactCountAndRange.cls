/********************************************************************
 * Class Name: ContactCountAndRange
 * Created by: kishore v
 * Created on: 26/12/22
 * use of Class: To Count the Contacts and the Creation of Contact Maximum And Minimum dates
 * ******************************************************************/

public class ContactCountAndRange{
    
/******************************************************************
 * Method Name :ContactCount
 * Use of Method :To Count the Contacts and the Creation of Contact Maximum And Minimum dates 
 * Params Used  : No params Used
 * ******************************************************************/ 
   
    public static void ContactCount() {
        
       List<AggregateResult> results = [SELECT COUNT(Id) numContacts, 
                                        MIN(CreatedDate) minCreatedDate, 
                                        MAX(CreatedDate) maxCreatedDate,
                                        Account.Name AccountName
                                        FROM Contact 
                                        Where AccountId!=NULL
                                        Group by Account.Name,AccountId];

            for (AggregateResult result : results) {
                
                string AccountName=(String) result.get('AccountName');
                Integer contactCount = (Integer) result.get('numContacts');
                Date minCreatedDate = Date.valueOf(result.get('minCreatedDate'));
                Date maxCreatedDate =Date.valueOf(result.get('maxCreatedDate'));
                
                System.debug('Account Name:  '+AccountName);
                System.debug('Contact count: ' + contactCount);
                System.debug('Minimum contact created date: ' + minCreatedDate);
                System.debug('Maximum contact created date: ' + maxCreatedDate);
                system.debug('---------------------------------------');
           }
      }
}