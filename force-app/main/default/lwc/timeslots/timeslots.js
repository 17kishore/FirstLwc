import { LightningElement,wire,track } from 'lwc';
import GETBOOKEDSLOTS from '@salesforce/apex/timeslots.getTimeSlots';
import { refreshApex } from '@salesforce/apex';

export default class Timeslots extends LightningElement {

   @track  lstBookedSlots;

    @wire(GETBOOKEDSLOTS)
    bookedslots({data,error}){
        if(data){
            this.lstBookedSlots=data;
            refreshApex(this.lstBookedSlots);
            console.log(data);
        } else if(error){
            console.log(error);

        }
    }
    
}