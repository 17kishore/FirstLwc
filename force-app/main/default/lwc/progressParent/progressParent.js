import { LightningElement } from 'lwc';

export default class ProgressParent extends LightningElement {

    handleClick(){
        this.template.querySelector("c-progress-child").handleStart();
        this.template.querySelector("lightning-button").disabled=true;
    }

    handleFinish(){
        this.template.querySelector("lightning-button").disabled=false;
    }
}