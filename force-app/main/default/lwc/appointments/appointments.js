import { LightningElement, wire } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import getAppointmentsInfo from '@salesforce/apex/BookAppointmentList.getAppointmentsInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const BOOK_APPOINTMENT_OBJECT_API_NAME = 'Book_Appointment__c';

export default class ListOfAppointments extends LightningElement {
    records;

    @wire(getAppointmentsInfo)
    handleAppointments({ error, data }) {
        if (data) {
            this.records = data.map((record) => ({
                ...record,
                isEditing: false
            }));
        } else if (error) {
            console.error('Error retrieving appointments:', error);
        }
    }

    handleEditClick(event) {
        const recordId = event.target.dataset.recordId;
        const updatedRecords = this.records.map((record) => {
            if (record.Id === recordId) {
                return { ...record, isEditing: true };
            }
            return record;
        });
        this.records = updatedRecords;
    }

    handleInputChange(event) {
        const recordId = event.target.dataset.recordId;
        const fieldName = event.target.dataset.fieldName;
        const updatedValue = event.target.value;

        const updatedRecords = this.records.map((record) => {
            if (record.Id === recordId) {
                return { ...record, [fieldName]: updatedValue };
            }
            return record;
        });
        this.records = updatedRecords;
    }

    handleSaveClick(event) {
        const recordId = event.target.dataset.recordId;
        const recordToUpdate = this.records.find((record) => record.Id === recordId);
    
        if (!recordToUpdate) {
            console.error('Record not found.');
            return;
        }
    
        const updatedFields = {
            recordId: recordId,
            patientName: recordToUpdate.patient_name__c,
            bookedSlot: recordToUpdate.Booked_Slot__c,
            appointmentDate: recordToUpdate.Appointment_Date__c
        };
    
        updateAppointments(updatedFields)
            .then(() => {
                console.log('Record updated successfully.');
                const updatedRecords = this.records.map((record) => {
                    if (record.Id === recordId) {
                        return { ...record, isEditing: false };
                    }
                    return record;
                });
                this.records = updatedRecords;
            })
            .catch((error) => {
                console.error('Error updating record:', error);
            });
    }
    
    
    

    handleCancelClick(event) {
        const recordId = event.target.dataset.recordId;
        const updatedRecords = this.records.map((record) => {
            if (record.Id === recordId) {
                return { ...record, isEditing: false };
            }
            return record;
        });
        this.records = updatedRecords;
    }
}