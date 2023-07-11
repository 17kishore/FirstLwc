import { LightningElement ,wire} from 'lwc';
//import sendEmail from '@salesforce/apex/sendEmailForProfileEditRequest.sendEmail';
import sendEmail from '@salesforce/apex/sendEmailToAdmin.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import USER_EMAIL from '@salesforce/schema/User.Email';
import GETDOCTOR from '@salesforce/apex/Doctor.getDoctorId';
import DOCTOR_OBJECT from '@salesforce/schema/Doctor__c';


const FIELDS = [NAME_FIELD];
  
export default class DoctorProfileModal extends LightningElement {


    objectApiName=DOCTOR_OBJECT;
    userId=Id;
    DoctorId;

    @wire(getRecord,{recordId:'$userId',fields:USER_EMAIL})
    useremail;

    get mailId(){
        return getFieldValue(this.useremail.data,USER_EMAIL);
    }

    @wire(GETDOCTOR,{email:'$mailId'})
    Doctor({data,error}){
    if(data){
        this.DoctorId=data;
        console.log('id');
        console.log(data)
     }
        else if(error){
            console.log(error)
        }
   }

    showModal = false ;
    fname ;
    lname ;
    phone ;
    email ;
    qualification ;
    experience ;
    fees ;
    specialization ;
    address ;


    storeUserName ;
    @wire(getRecord, { recordId: '$userId' , fields: FIELDS})
    getUserName({ error, data }){
        if(data){
            console.log('Inside GetRecord data ::');
            console.log(data.fields.Name.value);
            this.storeUserName = data.fields.Name.value ;
            //this.getDoctorRecordId();
        }
        if(error){
            console.log('Inside GetRecord Error');
            console.log(JSON.stringify(error))
        }
    }
/*


    getDoctorRecordId(){
        console.log('Inside getDoctorRecordId :; ')
        getCurrentDoctorId({userName : this.storeUserName})
        .then((result)=>{
            console.log('Result getDoctorRecordId result')
            console.log(JSON.stringify(result) );
        })
        .then((error)=>{
            console.log('error getDoctorRecordId ::')
            console.log(JSON.stringify(error));
        })
    } 

*/

    get options(){
        return [
            { label: 'Orthopedics', value: 'Orthopedics' },
            { label: 'Dermatology', value: 'Dermatology' },
            { label: 'Pediatrics', value: 'Pediatrics' },
            { label: 'Neurology', value: 'Neurology' },
            { label: 'Ophthalmology', value: 'Ophthalmology' },
            { label: 'Gynecologist', value: 'Gynecologist' },
            { label: 'Oncology', value: 'Oncology' }
          ];
    }

    handleChange(event){
        if(event.detail.value==""){
            this.specialization = 'No change';
        }else{
            this.specialization = event.detail.value;
        }
        
    }

    handleClick(){
        this.showModal = true ;
    }

    handleSave() {
        if(this.template.querySelector(".fname").value == ""){
            this.fname ='No Change';
        } else {
            this.fname = this.template.querySelector(".fname").value ;
        }

        if(this.template.querySelector(".lname").value == ""){
            this.lname ='No Change';
        } else {
            this.lname = this.template.querySelector(".lname").value ;
        }

        if(this.template.querySelector(".phone").value == ""){
            this.phone ='No Change';
        } else {
            this.phone = this.template.querySelector(".phone").value ;
        }
        if(this.template.querySelector(".email").value == ""){
            this.email ='No Change';
        } else {
            this.email = this.template.querySelector(".email").value ;
        }
        
        if(this.template.querySelector(".quali").value == ""){
            this.qualification ='No Change';
        } else {
            this.qualification = this.template.querySelector(".quali").value ;
        }
        if(this.template.querySelector(".exp").value == ""){
            this.experience = 0;
        } else {
            this.experience = this.template.querySelector(".exp").value ;
        }

        if(this.template.querySelector(".fees").value == ""){
            this.fees = 0;
        } else {
            this.fees = this.template.querySelector(".fees").value ;
        }

        if(this.template.querySelector(".add").value == ""){
            this.address ='No Change';
        } else {
            this.address = this.template.querySelector(".add").value ;
        }
        if(this.specialization == ""){
            this.specialization = 'No Change';
        }

        console.log('fname :'+this.fname+'lname : '+this.lname+'phone : '+this.phone+'email : '+this.email
                    +'qua : '+this.qualification+'exp : '+this.experience+'fees : '+this.fees+'spec : '+this.specialization +
                    'addresss : '+this.address+'specialization :: '+this.specialization);

        sendEmail({fname : this.fname ,lname:this.lname , phone:this.phone , email:this.email ,qualification :this.qualification ,
                    exp:this.experience , fees:this.fees ,specialization : this.specialization ,address:this.address })
                    .then((result)=>{
                        console.log('Inside result ')
                        console.log(result);
                        this.showModal = false ;
                    })
                    .catch((error)=>{
                        
                        console.log('Inside error ');
                        console.log('Error :: '+JSON.stringify(error) );
                    })
    }

    handleCancle(){
        this.showModal = false ;
        
    }
}