import { LightningElement ,wire } from 'lwc';
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
import GETPATIENTAPPOINTMENTS from '@salesforce/apex/BookAppointmentList.getPatientAppointment';
import GETCANCELAPPOINTMENTS from '@salesforce/apex/BookAppointmentList.cancelAppointment';
import Id from '@salesforce/user/Id';
import USER_EMAIL from '@salesforce/schema/User.Email';
import GETPATIENT from '@salesforce/apex/Patient.getPatientId';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';


export default class CancelPatientAppointment extends LightningElement {

    userId=Id;
    PatientId;
    patientEmail ;
    patientName ;
    appDate ;
    appTime ;

    @wire(getRecord,{recordId:'$userId',fields:USER_EMAIL})
    useremail;

    @wire(getRecord,{recordId:'$userId',fields:USER_EMAIL})
    getUseremail({ error, data }){
        if(data){
            console.log('Inside getRecord Data')
            this.patientEmail = data.fields.Email.value ;
            console.log(this.patientEmail);
        }
        if(error){
            console.log('Inside getRecord Error')
            console.log(error);
        }
    }

    get mailId(){
        console.log('Inside mailId')
        
        return getFieldValue(this.useremail.data,USER_EMAIL);
    }

    @wire(GETPATIENT,{email:'$mailId'})
    Patient({data,error}){
    if(data){
        console.log('Inside Patient')
        console.log(data)
        this.PatientId=data;
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
        label:'Doctor Name', 
        fieldName:'Doctor_Name__c'
    },
    {
        label:'TimeSlot',
        fieldName:'Booked_Slot__c'
    },
    {
        label:'Status',
        fieldName:'Appointment_Status__c'
    },
    {
        label:'Date', 
        fieldName:'Appointment_Date__c'
    },
    {
        label: 'Cancel',
        type: 'button',
        typeAttributes: {
            label: 'Cancel',
            name: 'CancelAppointment',
            value: 'Cancel',
            variant:'destructive'
        }
    }
]

    records;
    noAppointment = false ;
    @wire( GETPATIENTAPPOINTMENTS,{PatientId:'$PatientId'})
    reatedData({error,data}){
        if(data){
            console.log(data.patient_name__c)
            console.log('Inside patient appointment data')
            console.log(data);

            this.records=data; 
            
       } else if(error){
            console.log(error);
       }
    }

    showCancelModel=false;
    action;
    row;
    idValue;

    handleclick(event){

        console.log('inside handle');
        this.action = event.detail.action.value;
        this.row = event.detail.row;
        this.idValue = this.row.Id;
        console.log(this.idValue);
        console.log(this.action);
        if(this.action==='Cancel'){
            console.log('cancelled clicked');
            this.showCancelModel=true;
        }
       
    }

    handleCancelled(){

        GETCANCELAPPOINTMENTS({appointmentId:this.idValue})
        .then(() => {
            console.log('success');
            
                refreshApex(this.records);
                window.location.reload();
                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url: 'cancel-appointment'
                    }
                },true); 
            
        })
        .catch((error) => {
            console.log('error handleCancelled');
            console.log(error);
            
        })
        .finally(()=>{
            this.showCancelModel=false;
        })
        
    }

    handleCancel(){
        this.showCancelModel=false;

    }
}