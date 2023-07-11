import { LightningElement } from 'lwc';

export default class Employee extends LightningElement {

    salaryRange;
    currentSalary;

 employees=[{
        name:"employee 1",
        salary:30000,
        position:"tester"
    },
    {
        name:"employee 2",
        salary:50000,
        position:"lead"
    },
    {
        name:"employee 3",
        salary:0,
        position:"developer"
    }]

    handleChange(event){

        this.salaryRange=event.target.value;
        this.currentSalary=this.employees.filter(emp=>emp.salary>=this.salaryRange);
        

        
    }
}