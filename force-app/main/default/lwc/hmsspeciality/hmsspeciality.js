import { LightningElement, wire , api} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import SPECIALIZATION_FIELD from '@salesforce/schema/Doctor__c.Specialization__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import MOEKAMC from '@salesforce/messageChannel/MoekaMessageChannel__c';
import { NavigationMixin } from 'lightning/navigation';


export default class Hmsspeciality extends NavigationMixin(LightningElement) {
    
    @api 
    selectedSpecialization;

    lstSpecialization;

    @wire(MessageContext)
    messageContext;

    @wire(getObjectInfo, { objectApiName: 'Doctor__c' })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SPECIALIZATION_FIELD })
    specialization({ data, error }) {
        if (data) {
            this.lstSpecialization = data.values.map(item => item.value);
        } else if (error) {
           
            console.log(error);
        }
    }

    get specializationRows() {
        const rows = [];
        let row = [];
        for (let i = 0; i < this.lstSpecialization.length; i++) {
            row.push(this.lstSpecialization[i]);
            if ((i + 1) % 3 === 0) {
                rows.push(row);
                row = [];
            }
        }
        if (row.length > 0) {
            rows.push(row);
        }
        return rows;
    }

    handleButtonClick(event) {

        this.selectedSpecialization = event.target.dataset.spec;
        // Handle the button click event and the spec value
        console.log( this.selectedSpecialization);
        this.sendMessageService(this.selectedSpecialization);
    }

    sendMessageService(title) { 
       
        publish(this.messageContext, MOEKAMC, { specialization : title });
        
       // this.navitoDoctor();
    }

    navitoDoctor(){
       
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'selectdoctor'
            }
        },true);
    }
}
