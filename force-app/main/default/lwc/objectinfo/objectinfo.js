import { LightningElement,wire,api } from 'lwc';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class Objectinfo extends LightningElement {

    objectData;
    countFields;

    @api objectApiName;
    @wire (getObjectInfo,({objectApiName:'Account'}))
    objectInfoHandler({data,error}){
        
        if(data){
            console.log(data);
            console.log(data.fields);
            this.countFields=Object.keys(data.fields).length;
            console.log(this.countFields);
            this.objectData=data;
        }
    }
}