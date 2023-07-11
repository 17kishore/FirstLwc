import { LightningElement,wire } from 'lwc';

import {getRecord} from 'lightning/uiRecordApi'

export default class Wire extends LightningElement {
    accountData;

    @wire(getRecord,{recordId:'0015i00000Vh04EAAR',layoutTypes:'Full'})
    getAccountRecord({data,error}){
        if(data){
            this.accountData=data.fields;
        }
        if(error){
            console.log(error)
        }
    }
}
