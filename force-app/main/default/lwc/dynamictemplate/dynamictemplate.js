import { LightningElement } from 'lwc';
import AccountTemplate from './templateaccount.html';
import ContactTemplate from './templatecontact.html';
import DynamicTemplate from './dynamictemplate.html';

export default class Dynamictemplate extends LightningElement {
    val;
    get options() {
        return [
            { label: 'Texas', value: 'Texas' },
            { label: 'Florida', value: 'Florida' },
            { label: 'New Jersey', value: 'New Jersey' },
        ];
    }


    handleClick(event) {
        this.val = event.target.name === 'Account';
    }
    handleBack(){
        this.val=undefined;
    }

    render() {
        if (this.val === undefined) {
            return DynamicTemplate;
        }
        return this.val ? AccountTemplate : ContactTemplate;
    }
}

