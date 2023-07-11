import { LightningElement, track } from 'lwc';

export default class MyComponent extends LightningElement {
    @track acc;
    @track con;
    @track opp;

    handleTabChange(event) {
        const tabname = event.target.name;

        // Reset all the boolean values to false
        this.acc = false;
        this.con = false;
        this.opp = false;

        // Set the selected tab's boolean value to true
        if (tabname === 'Account') {
            this.acc = true;
        } else if (tabname === 'Contact') {
            this.con = true;
        } else if (tabname === 'Opportunity') {
            this.opp = true;
        }
    }
}


