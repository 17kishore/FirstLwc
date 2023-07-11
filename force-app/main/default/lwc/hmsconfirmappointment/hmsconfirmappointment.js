import { LightningElement,wire,track } from 'lwc';
import Id from '@salesforce/user/Id';
import USER_EMAIL from '@salesforce/schema/User.Email';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import GETPATIENT from '@salesforce/apex/Patient.getPatientId';
import GETWAITINGAPPOINTMENT from '@salesforce/apex/BookAppointment.getWaitingAppointments';
import GETCANCELAPPOINTMENT from '@salesforce/apex/BookAppointment.cancelAppointment';
import GETCONFIRMEDAPPOINTMENT from '@salesforce/apex/BookAppointment.confirmedAppointment';

export default class Hmsconfirmappointment extends LightningElement {


    userId=Id;
    patientId;
    listofBookedAppointments;
    showModal=false;
    @track appointmentId;
    appointmentConfirmedModal=false;

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

   @wire(GETWAITINGAPPOINTMENT,{patientId:'$patientId'})
   bookedAppointments({data,error}){
    if(data){
        console.log('inside book appointment');
        console.log(data);
        this.listofBookedAppointments=data;
    }
    else if(error){
        console.log(error);
    }
  }

  handleCancel(event){
    this.appointmentId=event.target.value;
    console.log(this.appointmentId);
    
    this.showModal=true;
   
    
   }

   handleNoCancel(){

    this.showModal=false;
}
   appointmentcancelled(){

    this.showModal=false;
   
    console.log('inside cancel yes button')
    console.log(this.appointmentId);
    GETCANCELAPPOINTMENT({appointmentId:this.appointmentId})
    .then((result)=>{
        console.log(result);
        const link = document.createElement('a');
        link.href ='/';
        link.target = '_self';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
   })
     .catch((error)=>{
        console.log(error);
   })
        
    
   }

   handleConfirm(event){
    
    this.appointmentConfirmedModal=true;
    this.appointmentId=event.target.value;
    const appointmentDate = event.target.dataset.appointmentDate; 
    const bookedSlot = event.target.dataset.bookedSlot;
    console.log(this.appointmentId);
    console.log(appointmentDate);
    console.log('Booked Slot:', bookedSlot);
    GETCONFIRMEDAPPOINTMENT({appointmentId:this.appointmentId})
    .then((result)=>{
        console.log(result);
   })
     .catch((error)=>{
        console.log(error);
   })
   }

   appointmentOkay(){
    const link = document.createElement('a');
    link.href ='/';
    link.target = '_self';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.appointmentConfirmedModal=false;
   }

}