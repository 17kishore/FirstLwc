import { LightningElement,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
import USER_EMAIL from '@salesforce/schema/User.Email';
import GETDOCTOR from '@salesforce/apex/Doctor.getDoctorId';
import GETTIMESLOT from '@salesforce/apex/TimeSlot.getTimeSlotId';

export default class Hmstimesheet extends LightningElement {

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

   get getDate1() {
        const date1 = new Date();
        const day = ('0' + date1.getDate()).slice(-2);
        const month = ('0' + (date1.getMonth() + 1)).slice(-2); // Month is zero-based
        const year = date1.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    get getDate2() {
        const date2 = new Date();
        date2.setDate(date2.getDate()+1);
        const day = ('0' + date2.getDate()).slice(-2);
        const month = ('0' + (date2.getMonth() + 1)).slice(-2); // Month is zero-based
        const year = date2.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    get getDate3() {
        const date3 = new Date();
        date3.setDate(date3.getDate()+2);
        const day = ('0' + date3.getDate()).slice(-2);
        const month = ('0' + (date3.getMonth() + 1)).slice(-2); // Month is zero-based
        const year = date3.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    get getDate4() {
        const date4 = new Date();
        date4.setDate(date4.getDate()+3);
        const day = ('0' + date4.getDate()).slice(-2);
        const month = ('0' + (date4.getMonth() + 1)).slice(-2); // Month is zero-based
        const year = date4.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

        get date1week(){
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const d = new Date();
            const Weekday1 = weekday[d.getDay()];
            return Weekday1;
        }

        get date2week(){
            const d = new Date();
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let Index = (d.getDay() + 1) % 7;
            
            const Weekday2 = weekday[Index];
            return Weekday2;
       }

       get date3week(){
        const d = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let Index = (d.getDay() + 2) % 7;
        
        const Weekday3 = weekday[Index];
        return Weekday3;
       }

       get date4week(){
        const d = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let Index = (d.getDay() + 3) % 7;
        
        const Weekday4 = weekday[Index];
        return Weekday4;
   }
  

date1id;
date2id;
date3id;
date4id;

@wire(GETTIMESLOT,{doctorId:'$DoctorId',weekDays:'$date1week'})
 Data1({error,data}){
    if(data){
        this.date1id=data;

        console.log(this.date1id);
            
       
   } else if(error){
        console.log(error);
   }
}

@wire(GETTIMESLOT,{doctorId:'$DoctorId',weekDays:'$date2week'})
 Data2({error,data}){
    if(data){
        this.date2id=data;
        console.log(this.date2id);
            
       
   } else if(error){
        console.log(error);
   }
}

@wire(GETTIMESLOT,{doctorId:'$DoctorId',weekDays:'$date3week'})
 Data3({error,data}){
    if(data){
        this.date3id=data;
        console.log(this.date3id);
            
       
   } else if(error){
        console.log(error);
   }
}
  


@wire(GETTIMESLOT,{doctorId:'$DoctorId',weekDays:'$date4week'})
 Data4({error,data}){
     
    if(data){
        this.date4id=data;
        console.log(this.date4id);
            
       
   } else if(error){
        console.log(error);
   }
}


}