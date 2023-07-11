import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class ExampleComponent extends LightningElement {
    recordTypeInfos;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    handleResult({ data, error }) {
        if (data) {
            this.recordTypeInfos = data.recordTypeInfos;
            console.log(this.recordTypeInfos);
            
        } else if (error) {
            console.error(error);
        }
    }


    

    
}
