import { LightningElement, api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

export default class Annualrevenue extends LightningElement {
  @api recordId;
  annualRevenue;

  handleChange(event) {
    this.annualRevenue = event.target.value;
  }

  handleUpdate() {
    const fields = {};
    fields[ANNUAL_REVENUE_FIELD.fieldApiName] = this.annualRevenue;
    

    updateRecord({ fields, recordId: this.recordId })
      .then(() => {
        
        this.dispatchEvent(new CustomEvent('reload'));
        const toastEvent = new ShowToastEvent({
          title: "Account Updated",
          message: "Annual Revenue Updated: " + this.annualRevenue,
          variant: "success"
      });
      this.dispatchEvent(toastEvent);
      this.annualRevenue='';
        
        
        
      })
      .catch(error => {
        console.error('Error updating record: ', error.body.message);
      });
  }
}
