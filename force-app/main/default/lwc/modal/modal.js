import { LightningElement } from 'lwc';

export default class Modal extends LightningElement {

    isShow=false;

    handleClick(){
       this.isShow=!this.isShow;
    }
}