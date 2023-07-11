import { LightningElement ,wire ,api,track} from 'lwc';
import fetchRecords from '@salesforce/apex/SessionController.fetchRecords';
import fetchAttachments from '@salesforce/apex/SessionController.fetchAttachments';
import getDistinctSessionsTypes from '@salesforce/apex/SessionController.getDistinctSessionsTypes';
import getSessionTypeRecords from '@salesforce/apex/SessionController.getSessionTypeRecords';
import {NavigationMixin} from 'lightning/navigation';
const columns=[
        {
            label:'Session Title', 
            fieldName:'Session_Title__c',
            wrapText: true 
        },
        {
            label:'Date Time',
            fieldName:'Session_Date_Time__c',
            type: 'date',
            wrapText: true ,
                typeAttributes: {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }
        },
        {
            label:'Status',
            fieldName:'Status__c',
            wrapText: true 
        },
        {
            label: '',
            type: 'button',
            wrapText: true ,
            typeAttributes: {
              label: 'Link',
              variant: 'base',
              target: '_blank',
              title: 'Click to Open',
              name: 'open_link'
            },
            editable: false,
            cellAttributes: {
              class: 'slds-text-align_center slds-cell-edit',
              style: 'border: none; text-decoration: underline; cursor: pointer;'
            },
            initialWidth: 40,
        },
        
        {
            label:'',
            type:'button',
            wrapText: true ,
            typeAttributes:{
                                label:'Documents',
                                title:'Documents',
                                name:'Documents_Preview_Download',
                                variant:'base'
            },
            cellAttributes:{
                class: 'slds-content-align_center'
            },
            initialWidth: 105
        },
        {
            label: '',
            type: 'button',
            wrapText: true ,
            typeAttributes: {
                                label: 'View',
                                title: 'View Details',
                                name: 'view_details',
                                variant: 'brand'
                            },
            cellAttributes: {
                class: 'slds-text-align_center slds-align-item-center'
            },
            initialWidth: 85,
        },
        
    ];

export default class Sessions  extends NavigationMixin(LightningElement) {

    @track startingRecord = 1;
    @track page = 1;
    @track endingRecord = 0;
    @track totalRecordCount;
    @track totalPage;
    @track pageSize = 10;

    @track columns=columns
    records;
    sessionDetails=false;
    downloadFiles=false;
    @api recordId;
    recordOptions = [];
    sessionData=[];
    selectedSessionsType;



    @wire(getDistinctSessionsTypes)
    wiredCourseTypes({ error, data }) {
        if (data) {
            this.recordOptions = data.map(option => ({ label: option, value: option }));
            this.recordOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.selectedSessionsType = this.recordOptions.length > 0 ? this.recordOptions[0].value : null;

            // Retrieve training records for the default course type
            this.retrievSessionRecords(this.selectedSessionsType);
        } else if (error) {
            console.error('Error retrieving course types:', error);
        }
    }
    retrievSessionRecords(sessionType) {
      getSessionTypeRecords({ sessionType: sessionType })
        .then(result => {
          this.sessionData = result;
          this.totalRecordCount = this.sessionData.length;
          this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
          this.displayRecods = this.sessionData.slice(0, this.pageSize);
          this.endingRecord = this.pageSize;
          
        })
      .catch(error => {
        console.error('Error retrieving course records:', error);
      });
      
  }

    handleSessionTypeChange(event) {
        this.selectedSessionsType = event.detail.value;
        this.retrievSessionRecords(this.selectedSessionsType);
    }
    
    

    @wire (fetchRecords)
    WiredRecord({error,data}){
        if ( data ) {

            let tempRecs = [];
            data.forEach( ( record ) => {
                let tempRec = Object.assign( {}, record );  
                tempRec.Recorded_Session_Link__c =  tempRec.Recorded_Session_Link__c;
                console.log(tempRec.Recorded_Session_Link__c );
                tempRecs.push( tempRec );
                
            });
            this.records = tempRecs;
            this.error = undefined;

        } else if ( error ) {
            this.error = error;
            this.records = undefined;

        }
    }
    
    filesList = [];

    @wire(fetchAttachments, { recordId: '$recordId' })
    wiredResult({ data, error }) {
        if (data) {
            this.filesList = Object.keys(data).map((item) => ({
                label: data[item].Title,
                value: item,
                url: data[item].URL
            }));
            console.log(this.filesList);
        }
        if (error) {
            console.log(error);
        }
    }
    handleCellAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
      
        if (action.name === 'open_link') {
          const link = row.Recorded_Session_Link__c;
          window.open(link, '_blank');
        }
        else if (action.name === 'view_details') {
            console.log(row.Id);
            this.recordId=row.Id;
            this.sessionDetails = true;
        }
        else if(action.name==='Documents_Preview_Download'){
            this.recordId=row.Id;
            this.downloadFiles=true;
            
        }
      
    }
    previewHandler(event) {
        const fileId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                recordIds: fileId,
                actionName: 'view'
            }
        });
    }

    handleCancel() {
        this.sessionDetails = false;
        this.downloadFiles = false;
    }
      
}