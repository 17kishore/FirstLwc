import { LightningElement,wire,track} from 'lwc';
import Id from '@salesforce/user/Id';
import USER_EMAIL from '@salesforce/schema/User.Email';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import GETPATIENT from '@salesforce/apex/Patient.getPatientId';
import GETCOMPLETEDAPPOINTMENT from '@salesforce/apex/BookAppointmentList.getCompletedAppointments';
import GETPRESCRIPTIONID from '@salesforce/apex/AddPrescription.getPrescriptionId';
import GETPRESCRIPTION from '@salesforce/apex/AddPrescription.getPrescription';
import jsPDF from '@salesforce/resourceUrl/jsPDF';
import { loadScript } from 'lightning/platformResourceLoader';
import LogoImg from '@salesforce/resourceUrl/Hospital_Management_Logo';

export default class Previousappointments extends LightningElement {

    userId=Id;
    patientId;
    listofCompletedAppointments;
    @track appointmentId;
    showModal=false;

    jsPdfInitialized=false;
    renderedCallback(){
        
        loadScript(this, jsPDF ).then(() => {});
        if (this.jsPdfInitialized) {
            return;
        }
        this.jsPdfInitialized = true;
    }

    pep;
    patientName;
    patientAge;
    doctorName;
    generateData(event){
        this.appointmentId='';
        this.patientName='';
        this.patientAge='';
        this.doctorName='';
        this.pep='';
        this.appointmentId=event.target.value;
        console.log(this.appointmentId);
        this.patientName = event.target.dataset.patientName;
        this.patientAge = event.target.dataset.patientAge;
        this.doctorName = event.target.dataset.doctorName;

       GETPRESCRIPTION({appointmentId:this.appointmentId})
        .then((result)=>{
            console.log(result);
            this.pep=result;
        })
         .catch((error)=>{
            console.log(error);
         })
        .finally(()=>{
         this.generatePdf(this.pep);
        })
    }

    generatePdf(pep){
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let startY = 80;
        let startX1 = 25;
        let startX2 = 100; 

        const imageWidth = 30; 
        const imageHeight = 30;
        const imageX = (doc.internal.pageSize.getWidth() - imageWidth) / 2; 
        const imageY = 5; 

        doc.addImage(LogoImg, 'PNG', imageX, imageY, imageWidth, imageHeight);

        const today = new Date();
        const day = ('0' + today.getDate()).slice(-2);
        const month = ('0' + (today.getMonth() + 1)).slice(-2); 
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        const dateX = imageX + imageWidth + 10; 
        const dateY = imageY + (imageHeight / 2); 
        doc.text('Date: ' + formattedDate , dateX, dateY);
        
        const locationX = imageX + imageWidth + 10; 
        const locationY = imageY + dateY + 2; 
        doc.text('Location: Moeka Hospital', locationX, locationY);

        const patientX = (imageX/2)-20; 
        const patientY = imageY + imageHeight + 10; 
        doc.setFontSize(16); // Set the default font size

        doc.text('Patient Name: ' + this.patientName, patientX, patientY);
        doc.text('Patient Age: ' + this.patientAge, patientX, patientY + 10);
        doc.text('Doctor Name: ' + this.doctorName, patientX, patientY + 20);
        doc.rect(startX1 - 5, startY - 10, startX2 + 60, 180);

        if(pep.Medication_1__c!==undefined){
        doc.setFontSize(16); 
        doc.text('1: ', startX1, startY);
        doc.setFontSize(13);
        doc.text(pep.Medication_1__c, startX1+8 , startY);
        }

        if(pep.Medication_2__c!==undefined){
            doc.setFontSize(16); 
            doc.text('2: ', startX2, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_2__c, startX2+8 , startY);
        }
        startY += 30;
        
        if(pep.Medication_3__c!==undefined){
            doc.setFontSize(16); 
            doc.text('3: ', startX1, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_3__c, startX1+8 , startY);
        }
        
        if(pep.Medication_4__c!==undefined){
            doc.setFontSize(16); 
            doc.text('4: ', startX2, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_4__c, startX2+8 , startY);
        }
        startY += 30;
        
        if(pep.Medication_5__c!==undefined){
            doc.setFontSize(16); 
            doc.text('5: ', startX1, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_5__c, startX1+8 , startY);
        }
        if(pep.Medication_6__c!==undefined){
            doc.setFontSize(16); 
            doc.text('6: ', startX2, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_6__c, startX2+8 , startY);
        }
        startY += 30;
        
        if(pep.Medication_7__c!==undefined){
            doc.setFontSize(16); 
            doc.text('7: ', startX1, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_7__c, startX1+8 , startY);
        }
        if(pep.Medication_8__c!==undefined){
            doc.setFontSize(16); 
            doc.text('8: ', startX2, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_8__c, startX2+8 , startY);
        }
        startY += 30;
        
        if(pep.Medication_9__c!==undefined){
            doc.setFontSize(16); 
            doc.text('9: ', startX1, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_9__c, startX1+8 , startY);
        }
        if(pep.Medication_10__c!==undefined){
            doc.setFontSize(16); 
            doc.text('10: ', startX2, startY);
            doc.setFontSize(13);
            doc.text(pep.Medication_10__c, startX2+8, startY);
        }
            doc.save('prescription.pdf');
        
  }

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

   @wire(GETCOMPLETEDAPPOINTMENT,{patientId:'$patientId'})
   bookedAppointments({data,error}){
    if(data){
        console.log('inside book appointment');
        console.log(data);
        this.listofCompletedAppointments=data;
        console.log(this.listofCompletedAppointments.length);
        if(this.listofCompletedAppointments.length===0){
            this.listofCompletedAppointments=false;
        }
    }
    else if(error){
        console.log(error);
    }
  }

  prescription;
  excep=false;

  handlePrescription(event){
    this.appointmentId=event.target.value;
    console.log(this.appointmentId);
    this.prescription='';

    GETPRESCRIPTIONID({appointmentId:this.appointmentId})
    .then((result)=>{
        console.log(result);
        this.prescription=result;
        this.showModal=true;
        
    })
     .catch((error)=>{
        console.log(error);
        this.excep=true;
     })
}

  handleCancel(){
    this.showModal=false
  }

  excepCancel(){
    this.excep=false;
}

}