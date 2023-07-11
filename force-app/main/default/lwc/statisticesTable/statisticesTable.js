import { LightningElement, wire } from 'lwc';
import getStatistics from '@salesforce/apex/StatisticsController.getStatistics';

export default class StatisticesTable extends LightningElement {
    appointmentData = [];
    columns = [
        { label: 'Statistic', fieldName: 'statistic' },
        { label: 'Count', fieldName: 'count', type: 'number' }
    ];

    @wire(getStatistics)
    fetchAppointmentStatistics({ error, data }) {
        if (data) {
            // Transform the returned data into the required format
            this.appointmentData = Object.keys(data).map(key => ({
                statistic: key,
                count: data[key]
            }));
        } else if (error) {
            // Handle any errors
            console.error('Error retrieving appointment statistics:', error);
        }
    }
}