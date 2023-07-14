import { LightningElement, wire,track } from 'lwc';
import GETCONTACTS from '@salesforce/apex/ContactController.getContacts';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
  { 
    label: 'Last Name', 
    fieldName: 'LastName', 
    type: 'text',
    editable: true 
  },
  { 
    label: 'Date of Birth', 
    fieldName: 'Date_of_Birth__c',
    type: 'date-local',
    editable: true,
    typeAttributes: {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    },
    cellAttributes: {
        class: {
            fieldName: 'format'
        }
    }
  }
];

export default class Contactlwc extends LightningElement {
  columns = COLUMNS;
  @track draftValues = [];

  @wire(GETCONTACTS)
  contacts;
  hasFutureDates=[];

  async handleSave(event) {
    this.hasFutureDates=[];
   
    const draftValues = event.detail.draftValues;
     this.hasFutureDates = draftValues.filter((draftValue) => {
        const selectedDate = new Date(draftValue.Date_of_Birth__c);
        const currentDate = new Date();
        return selectedDate > currentDate; 
      });
  
    if (this.hasFutureDates.length > 0) {
        console.log('inside future');
        const newData = event.detail.draftValues;
        
        this.contacts.data = this.contacts.data.map((contact) => {
          const newDataRecord = newData.find((record) => record.Id === contact.Id);
          
          if (newDataRecord) {
            const selectedDate = new Date(newDataRecord.Date_of_Birth__c);
            const currentDate = new Date();
            const format = selectedDate > currentDate ? 'slds-text-color_error' : 'slds-text-color_success';
            return { ...contact, Date_of_Birth__c: newDataRecord.Date_of_Birth__c, format };
            
          }
         return contact;
    });
        this.draftValues=this.contacts.data;
        console.log(this.draftValues);
        console.log(this.contacts.data);
        this.handleFutureDatesError();
        return;
    }
      else {
        console.log('inside no error');
        const records = draftValues.map((draftValue) => {
          const fields = Object.assign({}, draftValue);
          return { fields };
        });
      console.log(records);
      this.draftValues = [];
    
  
      try {
        await this.saveRecords(records);
        this.handleSuccess();
      } catch (error) {
        this.handleError(error);
      }
    }
  }
  
  handleFutureDatesError() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Error',
        message: 'Date of Birth should be in the present or past.',
        variant: 'error'
      })
    );
  }
  
  async saveRecords(records) {
    const recordUpdatePromises = records.map((record) => updateRecord(record));
    await Promise.all(recordUpdatePromises);
    await refreshApex(this.contacts);
   
}
  
  handleSuccess() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Success',
        message: 'Contacts updated',
        variant: 'success'
      })
    );
    this.draftValues = [];
  }
  
  handleError(error) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Error updating or reloading contacts',
        message: error.body.message,
        variant: 'error'
      })
    );
  }
  
}
