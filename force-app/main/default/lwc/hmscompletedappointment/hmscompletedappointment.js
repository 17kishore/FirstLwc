import { LightningElement,wire } from 'lwc';
import GETCOMPLETEDAPPOINTMENTS from '@salesforce/apex/BookAppointmentList.getcompletedAppointment';
import GETPRESCRIPTIONID from '@salesforce/apex/AddPrescription.getPrescriptionId';
import Id from '@salesforce/user/Id';
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
import USER_EMAIL from '@salesforce/schema/User.Email';
import GETDOCTOR from '@salesforce/apex/Doctor.getDoctorId';

export default class Hmscompletedappointment extends LightningElement {

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
     }
        else if(error){
            console.log(error)
        }
   }

   columns=[
    {
        label:'Patient Name', 
        fieldName:'patient_name__c'
    },
    {
        label:'Age', 
        fieldName:'Patient_Age__c'
    },
    {
        label:'Number', 
        fieldName:'Patient_Number__c'
    },
    
    {
        label:'TimeSlot',
        fieldName:'Booked_Slot__c'
    },
    {
        label:'Date', 
        fieldName:'Appointment_Date__c'
    },
    {
        label:'Status', 
        fieldName:'Appointment_Status__c'
    },
    {
        label: 'Prescription',
        type: 'button',
        typeAttributes: {
            label: 'Prescription',
            name: 'Prescription',
            value: 'Prescription',
            variant:'brand'
        }
    }
]

records;
            @wire( GETCOMPLETEDAPPOINTMENTS,{doctorId:'$DoctorId'})
            reatedData({error,data}){
                if(data){
                    this.records=data;
                    console.log(this.records.length);
                    if(this.records.length===0){
                        this.records=false;
                    }
                        
                
            } else if(error){
                    console.log(error);
            }
            }
recId;
excep=false;
showModal=false;

handleclick(event){
    const action = event.detail.action;
    const row = event.detail.row;

    if(action.name==='Prescription'){
    GETPRESCRIPTIONID({appointmentId:row.Id})
    .then((result)=>{
        console.log(result);
        this.recId=result;
        this.showModal=true;
        
    })
     .catch((error)=>{
        console.log(error);
        this.excep=true;
     })

    }
}  
handleCancel(){
    this.showModal=false
  }

  excepCancel(){
    this.excep=false;
}         
            


}