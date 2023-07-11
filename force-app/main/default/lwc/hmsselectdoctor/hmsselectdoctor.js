import { LightningElement,wire,track} from 'lwc';
import MOEKAMC from '@salesforce/messageChannel/MoekaMessageChannel__c';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import GETDOCTORS from '@salesforce/apex/SelectDoctor.getDoctors';
import TODAYSCHEDULE from '@salesforce/apex/TodaySchedule.getTodaySchedule';
import TOMORROWSCHEDULE from '@salesforce/apex/TomorrowSchedule.getTomorrowSchedule';
import TODAYAVAILABLESCHEDULE from '@salesforce/apex/TodaySchedule.getAvailableSchedule';
import TOMORROWAVAILABLESCHEDULE from '@salesforce/apex/TomorrowSchedule.getTomorrowAvailableSchedule';
import Id from '@salesforce/user/Id';
import USER_EMAIL from '@salesforce/schema/User.Email';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import GETPATIENT from '@salesforce/apex/patient.getPatientId';
import BOOKAPPOINTMENT from '@salesforce/apex/BookAppointment.bookAppoint';


export default class Hmsselectdoctor extends LightningElement {

    @wire(MessageContext)
    messageContext;
    selectedDoctor;

    listOfDoctors;
    showTodayModal=false;
    showTomorrowModal=false;

    @track docId;

    tabOneBookedSlot;
    tabOneAvailableSlot;
    @track tabOneRemaingSlot;

    tabTwoBookedSlot;
    tabTwoAvailableSlot;
    @track tabTwoRemaingSlot;

    tabOneSelectedTime;
    tabTwoSelectedTime;
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
        console.log(this.patientId);
     }
        else if(error){
            console.log(error)
        }
   }

    get getTodaysDate() {
        const today = new Date();
        const day = ('0' + today.getDate()).slice(-2);
        const month = ('0' + (today.getMonth() + 1)).slice(-2); // Month is zero-based
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    
    get buttonLabel1() {
        return `Book on ${this.getTodaysDate}`;
      }
      
    get getTomorrowsDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = ('0' + tomorrow.getDate()).slice(-2);
        const month = ('0' + (tomorrow.getMonth() + 1)).slice(-2); // Month is zero-based
        const year = tomorrow.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
     
    get buttonLabel2() {
        return `Book on ${this.getTomorrowsDate}`;
      }

    subscribeMC() {
        if (this.subscription) {
            return;
        }
        
        this.subscription = subscribe(
            this.messageContext,
            MOEKAMC,
            (message) => { this.selectedDoctor = message.specialization },
            { scope: APPLICATION_SCOPE }
        );
    }

    nodoctor;
    @wire(GETDOCTORS,{specialization:'$selectedDoctor'})
    Doctors({data,error}){
        this.nodoctor='';
     if(data){
         this.listOfDoctors=data;
         if(this.listOfDoctors.length===0){
              this.nodoctor=`No Doctor Available in the ${this.selectedDoctor} Specialization`;
        }
 }
         else if(error){
             console.log(error)
         }
    }

    handleCancel(){

        this.showTodayModal=false;
        this.showTomorrowModal=false;
        this.tabOneSelectedTime=null;
        this.tabTwoSelectedTime=null;
        this.taboneError='';
        this.tabtwoError='';
        this.noTodaySlot='';
        this.noTomorrowSlot='';

}
    taboneError;
    noTodaySlot;
    handleTodayConfirm(){

        if(this.noTodaySchedule){
            this.noTodaySlot='Please Click Cancel';
            return;
        }

        if(this.tabOneSelectedTime==null){
            this.taboneError='Please Choose Time Slot Before Booking...';
            return;
         }
 
        BOOKAPPOINTMENT({doctorId:this.docId,patientId:this.patientId,appointmentDate:this.getTodaysDate,appointmentTime:this.tabOneSelectedTime})
        .then((result)=>{
            console.log(result);
                            const link = document.createElement('a');
                            link.href ='confirmappointment';
                            link.target = '_self';
                            link.style.display = 'none';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
        })
         .catch((error)=>{
            console.log(error);
         })
         .finally(()=>{
            this.showTodayModal=false;
        })
         
     } 

     tabtwoError;
     noTomorrowSlot;
     handleTomorrowConfirm(){
            if(this.noTomorrowSchedule){
            this.noTomorrowSlot='Please Click Cancel';
            return;
        }

        if(this.tabTwoSelectedTime==null){
            this.tabtwoError='Please Choose Time Slot Before Booking...';
            return;
         }
         
         BOOKAPPOINTMENT({doctorId:this.docId,patientId:this.patientId,appointmentDate:this.getTomorrowsDate,appointmentTime:this.tabTwoSelectedTime})
         .then((result)=>{
             console.log(result);
             const link = document.createElement('a');
             link.href ='confirmappointment';
             link.target = '_self';
             link.style.display = 'none';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);

        })
        
          .catch((error)=>{
             console.log(error);
        })

          .finally(()=>{
             this.showTodayModal=false;
        })

     }
    noTodaySchedule;
     handleTodayClick(event){

        this.showTodayModal=true;
        this.docId=event.target.value;
        this.tabOneBookedSlot = [];
        this.tabOneAvailableSlot = [];
        this.tabOneRemaingSlot = [];
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date();
        const todayWeekday = weekday[d.getDay()];
        
        TODAYSCHEDULE({AppointmentDate:this.getTodaysDate,doctorId:this.docId})
         .then((result)=>{
            console.log(result);
            this.tabOneBookedSlot=result;
         })

         .catch((error)=>{
            console.log(error);
         })
        
        TODAYAVAILABLESCHEDULE({AppointmentDate:this.getTodaysDate,weekDay:todayWeekday,doctorId:this.docId})
         .then((result)=>{
            this.noTodaySchedule='';
            console.log(result);
           this.tabOneAvailableSlot=result;

           if(this.tabOneAvailableSlot.length===0){
            this.tabOneRemaingSlot='';
            this.noTodaySchedule='No Slots Available';
            return;
           }

            this.tabOneRemaingSlot=this.tabOneAvailableSlot.map((value) => {
            return { label: value, value: value };
          });
            
         })
         .catch((error)=>{
            console.log(error);
            this.tabOneRemaingSlot='';
            this.noTodaySchedule='No Slots Available';
         })
     }

        noTomorrowSchedule;
        handleTomorrowClick(event){

            this.showTomorrowModal=true;
            this.docId=event.target.value;
            this.tabTwoBookedSlot = [];
            this.tabTwoAvailableSlot = [];
            this.tabTwoRemaingSlot = [];
            const d = new Date();
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let tomorrowIndex = d.getDay() + 1;
            
            if (tomorrowIndex === 7) {
              tomorrowIndex = 0; 
            }
            
            const tomorrowWeekday = weekday[tomorrowIndex];
            console.log(tomorrowWeekday);

        TOMORROWSCHEDULE({AppointmentDate:this.getTomorrowsDate,doctorId:this.docId})
        .then((result)=>{
           console.log(result);
           this.tabTwoBookedSlot=result;
        })

        .catch((error)=>{
           console.log(error);
        })

        TOMORROWAVAILABLESCHEDULE({AppointmentDate:this.getTomorrowsDate,weekDay:tomorrowWeekday,doctorId:this.docId})
        .then((result)=>{
          this.noTomorrowSchedule='';
          this.tabTwoAvailableSlot=result;
          if(this.tabTwoAvailableSlot.length===0){
            this.tabTwoRemaingSlot='';
            this.noTomorrowSchedule='No Slots Available';
            return;
           }

          this.tabTwoRemaingSlot=this.tabTwoAvailableSlot.map((value) => {
           return { label: value, value: value };
         });
    })
        .catch((error)=>{
           console.log(error);
           this.tabTwoRemaingSlot='';
           this.noTomorrowSchedule='No Slots Available';
    })
}

     tabOneBookSlot(event){
       this.tabOneSelectedTime=event.target.value;
    }

    tabTwoBookSlot(event){
        this.tabTwoSelectedTime=event.target.value;
    }
    
     connectedCallback() {
        this.subscribeMC();
    }
}