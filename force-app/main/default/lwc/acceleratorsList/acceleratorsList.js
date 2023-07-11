import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAcceleratorRecords from '@salesforce/apex/AcceleratorController.getAcceleratorRecords';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_PICKLIST_FIELD from '@salesforce/schema/Accelerator__c.Type__c';
import CLOUD_TYPE_PICKLIST_FIELD from '@salesforce/schema/Accelerator__c.Cloud_Type__c';
import INDUSTRY_PICKLIST_FIELD from '@salesforce/schema/Accelerator__c.Industry__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const columns = [
  {
    label: 'Accelerator Name',
    fieldName: 'Name__c',
  },
  {
    label: 'Type',
    fieldName: 'Type__c',
  },
  {
    label: 'Cloud Type',
    fieldName: 'Cloud_Type__c',
  },
  {
    label: 'Industry',
    fieldName: 'Industry__c',
  },
  {
    label: 'Description',
    fieldName: 'Accelerator_Details__c',
  },
  {
    label: '',
    type: 'button',
    wrapText: true,
    typeAttributes: {
      label: 'View',
      title: 'View Details',
      name: 'view_details',
      variant: 'brand',
    },
    cellAttributes: {
      class: 'slds-text-align_center slds-align-item-center',
    },
    initialWidth: 85,
  },
];

export default class AcceleratorsList extends NavigationMixin(LightningElement) {
  @track columns = columns;
  @track filteredData = [];
  //Module Pagination controls
  @track startingRecord = 1;
  @track page = 1;
  @track endingRecord = 0;
  @track totalRecordCount;
  @track totalPage;
  pageSize = '10';
  typeValue;
  cloudTypeValue;
  industryValue;
  data;

  @wire(getAcceleratorRecords)
  wiredCourseTypes({ error, data }) {
    if (data) {
      this.data = data;
      this.filteredData = data;
      this.totalRecordCount = this.filteredData.length;
      this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
      this.displayRecods = this.filteredData.slice(0, this.pageSize);
      this.endingRecord = this.displayRecods.length;
    } else if (error) {
      console.error('Error retrieving course types:', error);
    }
  }

  @wire(getObjectInfo, { objectApiName: 'Accelerator__c' })
  objectInfo;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_PICKLIST_FIELD })
  variabletostorepicklistvalues;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CLOUD_TYPE_PICKLIST_FIELD })
  cloudtypevariabletostorepicklistvalues;

  @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_PICKLIST_FIELD })
  industryvariabletostorepicklistvalues;

  get TypecomboboxOptions() {
    if (this.variabletostorepicklistvalues.data) {
      return this.variabletostorepicklistvalues.data.values.map((picklistValue) => {
        return { label: picklistValue.label, value: picklistValue.value };
      });
    }
    return [];
  }

  get cloudTypeOptions() {
    if (this.cloudtypevariabletostorepicklistvalues.data) {
      return this.cloudtypevariabletostorepicklistvalues.data.values.map((picklistValue) => {
        return { label: picklistValue.label, value: picklistValue.value };
      });
    }
    return [];
  }

  get industryOptions() {
    if (this.industryvariabletostorepicklistvalues.data) {
      return this.industryvariabletostorepicklistvalues.data.values.map((picklistValue) => {
        return { label: picklistValue.label, value: picklistValue.value };
      });
    }
    return [];
  }

  handleChange(event) {
    this.typeValue = event.detail.value;
    this.filterData();
  }

  handleCloudTypeChange(event) {
    this.cloudTypeValue = event.detail.value;
    this.filterData();
  }

  handleIndustryChange(event) {
    this.industryValue = event.detail.value;
    this.filterData();
  }

  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;

    if (action.name === 'view_details') {
      this.navigateToRecordDetails(row.Id);
    }
  }
  
  navigateToRecordDetails(recordId) {
    const url = `/acceleratordetails?recordId=${recordId}`;
    this[NavigationMixin.Navigate]({
      type: 'standard__webPage',
      attributes: {
        url: url,
      },
    });
  }
  

  filterData() {
    let filteredData = this.data;

    if (this.typeValue) {
      filteredData = filteredData.filter((record) => record.Type__c === this.typeValue);
    }

    if (this.cloudTypeValue) {
      filteredData = filteredData.filter((record) => record.Cloud_Type__c === this.cloudTypeValue);
    }

    if (this.industryValue) {
      filteredData = filteredData.filter((record) => record.Industry__c === this.industryValue);
    }

    this.filteredData = filteredData;
    this.totalRecordCount = this.filteredData.length;
    this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
    this.displayRecods = this.filteredData.slice(0, this.pageSize);
    this.endingRecord = this.displayRecods.length;
  }
}