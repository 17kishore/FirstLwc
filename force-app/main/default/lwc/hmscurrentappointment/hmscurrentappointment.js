import { LightningElement, wire,track } from 'lwc';
import GETCURRENTAPPOINTMENTS from '@salesforce/apex/BookAppointmentList.getCurrentAppointments';
import GETCOMPLETEAPPOINTMENTS from '@salesforce/apex/BookAppointmentList.completeAppointment';
import ADDPRESCRIPTION from '@salesforce/apex/AddPrescription.prescription';
import Id from '@salesforce/user/Id';
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
import USER_EMAIL from '@salesforce/schema/User.Email';
import GETDOCTOR from '@salesforce/apex/Doctor.getDoctorId';
import { NavigationMixin } from 'lightning/navigation';

export default class ListOfAppointments extends NavigationMixin(LightningElement) {

    userId=Id;
    DoctorId;

    Medication1;
    Medication2;
    Medication3;
    Medication4;
    Medication5;
    Medication6;
    Medication7;
    Medication8;
    Medication9;
    Medication10;
    Tests;
    PatientDiagnosis;
    BPtemp;
    commentVisible= false ;
    commentText ;

    
    handleMedication1Change(event){
        this.Medication1=event.target.value;
    }
    handleMedication2Change(event){
        this.Medication2=event.target.value;
    }
    handleMedication3Change(event){
        this.Medication3=event.target.value;
    }
    handleMedication4Change(event){
        this.Medication4=event.target.value;
    }
    handleMedication5Change(event){
        this.Medication5=event.target.value;
    }
    handleMedication6Change(event){
        this.Medication6=event.target.value;
    }
    handleMedication7Change(event){
        this.Medication7=event.target.value;
    }
    handleMedication8Change(event){
        this.Medication8=event.target.value;
    }
    handleMedication9Change(event){
        this.Medication9=event.target.value;
    }
    handleMedication10Change(event){
        this.Medication10=event.target.value;
    }
    handleTestChange(event){
        this.Tests=event.target.value;
    }
    handlePatientDiagnosisChange(event){
        this.PatientDiagnosis=event.target.value;
    }
    handleBPtempChange(event){
        this.BPtemp=event.target.value;
    }


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
            label:'Name Of The Patient', 
            fieldName:'patient_name__c'
        },
        {
            label:'Patient Age', 
            fieldName:'Patient_Age__c'
        },
        {
            label:'Mobile Number', 
            fieldName:'Patient_Number__c'
        },
        
        {
            label:'Time Slot',
            fieldName:'Booked_Slot__c'
        },
        {
            label:'Date', 
            fieldName:'Appointment_Date__c'
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
        },
        {
            label: 'Appointment Status',
            type: 'button',
            typeAttributes: {
                label: 'Complete',
                name: 'Complete',
                value: 'Complete',
                variant:'success'
            }
        }
    ]


    records;
   

    @wire( GETCURRENTAPPOINTMENTS,{doctorId:'$DoctorId'})
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

    action;
    row;
    idValue;
    showPrescriptionPopup= false;
    handleclick(event){

        console.log('inside handle');
        this.action = event.detail.action.value;
        this.row = event.detail.row;
        this.idValue = this.row.Id;
        console.log(this.idValue);
        console.log(this.action);
        if(this.action==='Complete'){
            console.log('Complete clicked');
            GETCOMPLETEAPPOINTMENTS({appointmentId:this.idValue})
            .then(() => {
                console.log('success');
                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url: 'completedappointments'
                    }
                },true);
                
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
                
            })


            
        }
        if (this.action === 'Prescription') {
            this.showPrescriptionPopup = true;
          } else if (this.action === 'Complete') {
            // Handle the Complete button action here
        }
       
    }

    handleSave() {
        this.showPrescriptionPopup = false;
        this.commentVisible = true;
        this.commentText = 'Prescription saved successfully!';
        
        ADDPRESCRIPTION({
            appointmentId:this.idValue, 
            Patient_Diagnosis:this.PatientDiagnosis,
            BP_temp:this.BPtemp,
            medication1:this.Medication1, 
            medication2:this.Medication2,
            medication3:this.Medication3,
            medication4:this.Medication4,
            medication5:this.Medication5,
            medication6:this.Medication6,
            medication7:this.Medication7,
            medication8:this.Medication8, 
            medication9:this.Medication9,
            medication10:this.Medication10, 
            tests:this.Tests
        })
        .then((result) => {
            if (result === this.idValue) {
                // Set the comment text and make it visible
                this.commentText = 'Prescription saved successfully!';
                this.commentVisible = true;

                // Reset the comment after 5 seconds
                setTimeout(() => {
                    this.commentVisible = false;
                }, 5000);

                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url: 'currentappointments'
                    }
                },true);

             } else {
                console.log('Prescription Not Added');
            }
        })

        .catch((error) => {
            console.log(error); // Log the complete error object for debugging
            this.error=error;
            this.errorMessage = error.body.message;
        });

    }
    handleCancel() {
        this.showPrescriptionPopup = false;
    }

   
}