import { LightningElement } from 'lwc';

export default class Uppercase extends LightningElement {
    upperCaseWords = '';
    isShow=''
    errorMessage = '';

    handleChange(event) {
        const input = event.target.value;
        const regex = /^[a-zA-Z\s]+$/;
        ;

        if (regex.test(input.trim())) {
            this.upperCaseWords = input.trim().toUpperCase();
            this.isShow=true;
            
            this.errorMessage = '';
        } else {
            this.errorMessage = 'Input must contain only alphabetical characters.';
            this.isShow=false;
        }
    }
}
