import { LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
export default class WireGetRelatedListRecords extends LightningElement {
    error;
    records;
    @wire(getRelatedListRecords, {
        parentRecordId: '0015i00000Vh04EAAR',
        relatedListId: 'Contacts',
        fields: ['Contact.Id','Contact.Name']
       
    })listInfo({ error, data }) {
        if (data) {
            this.records = data.records;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }
}