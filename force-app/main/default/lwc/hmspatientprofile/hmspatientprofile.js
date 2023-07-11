import { LightningElement,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import USER_EMAIL from '@salesforce/schema/User.Email';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import GETPATIENT from '@salesforce/apex/Patient.getPatientId';
import PATIENT_OBJECT from '@salesforce/schema/Patient__c';

export default class Hmspatientprofile extends LightningElement {

    objectApiName=PATIENT_OBJECT;
    userId=Id;
    patientId;

    @wire(getRecord,{recordId:'$userId',fields:USER_EMAIL})
    useremail;

    get mailId(){
        return getFieldValue(this.useremail.data,USER_EMAIL);
    }

    @wire(GETPATIENT,{email:'$mailId'})
    Patient({data,error}){
    if(data){
        this.patientId=data;
        console.log('id');
        console.log(data)
     }
        else if(error){
            console.log(error)
        }
   }
}