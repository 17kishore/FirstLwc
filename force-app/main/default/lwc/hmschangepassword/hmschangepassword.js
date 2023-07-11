import { LightningElement,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import USER_EMAIL from '@salesforce/schema/User.Email';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import GETCHANGEPASSWORD from '@salesforce/apex/Patient.changePassword';

export default class Hmschangepassword extends LightningElement {

    userId=Id;
    patientId;
    

    @wire(getRecord,{recordId:'$userId',fields:USER_EMAIL})
    useremail;

    get mailId(){
        return getFieldValue(this.useremail.data,USER_EMAIL);
    }
    handleChange(event){
        this.mailId=event.target.value;
        console.log(this.mailId);

    }

    handleClick(){
        console.log('inside');
        console.log(this.mailId);
        GETCHANGEPASSWORD({email:this.mailId})
        .then((result)=>{
            console.log(result);
        })
         .catch((error)=>{
            console.log(error);
         })
        .finally(()=>{
            const link = document.createElement('a');
            link.href = 'checkresetpasswordemail';
            link.target = '_self';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })


    }
}