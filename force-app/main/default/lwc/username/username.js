import { LightningElement,wire } from 'lwc';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
import NAME from '@salesforce/schema/user.name';
import Id from '@salesforce/user/Id';

export default class Username extends LightningElement {

    userId=Id;
   

    @wire(getRecord,{recordId:'$userId',fields:[NAME]})
    user;
     

    get name(){
        return getFieldValue(this.user.data,NAME);
    }
   

}