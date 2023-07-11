import { LightningElement, wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import FIRST_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
const COLUMNS = [
    { label: 'Account Name', fieldName: FIRST_FIELD.fieldApiName, type: 'text' },
    { label: 'Annual Revenue', fieldName: LAST_FIELD.fieldApiName, type: 'text' },
    { label: 'Industry', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }
];
export default class AccountList extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts)
    contacts;

    get errors() {
        return (this.accounts.error) ?
            reduceErrors(this.accounts.error) : [];
    }
}