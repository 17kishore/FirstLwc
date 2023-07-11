import { LightningElement,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import USER_EMAIL from '@salesforce/schema/User.Email';
import GETCONTACTS from '@salesforce/apex/patient.getContacts';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { NavigationMixin } from 'lightning/navigation';

export default class Hmsrecorddetail extends  NavigationMixin(LightningElement) {
    objectApiName = CONTACT_OBJECT;
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
   handleEdit(){

    this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url:"	https://citiustech-6e-dev-ed.develop.my.site.com/locations"
        }
    });        

   }
}