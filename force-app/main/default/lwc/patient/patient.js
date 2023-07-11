import { LightningElement,wire } from 'lwc';
import GETCONTACTS from '@salesforce/apex/patient.getContacts';
import Id from '@salesforce/user/Id';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import USER_EMAIL from '@salesforce/schema/User.Email';

export default class Patient extends  NavigationMixin(LightningElement) {

    objectApiName = CONTACT_OBJECT;
    fields = [FIRSTNAME_FIELD,LASTNAME_FIELD, EMAIL_FIELD ];

    id;
    userId=Id;
    conid;

    @wire(getRecord,{recordId:'$userId',fields:USER_EMAIL})
    useremail;

    get mailId(){
        return getFieldValue(this.useremail.data,USER_EMAIL);
    }

    
   @wire(GETCONTACTS,{mail:'$mailId'})
   ContactId({data,error}){
    if(data){
        this.conid=data;
        console.log(data)
       

        }
        else if(error){
            console.log(error)
        }
   }
   createNew(){
   
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Account',
            actionName: 'new'
        }
    });        
}
}

