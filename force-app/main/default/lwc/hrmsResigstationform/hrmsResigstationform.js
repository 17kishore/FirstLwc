import { LightningElement,track } from 'lwc';
import registerUser from '@salesforce/apex/MoekaLoginRegistrationController.registerUser';
import { NavigationMixin } from 'lightning/navigation';
import icon from '@salesforce/resourceUrl/addPatient';



export default class HrmsResigstationform extends NavigationMixin(LightningElement) {
    addPatientimg=icon;
    selectedBloodgroupValue ;
    selectedGenderValue;
    firstNameValue;
    lastNameValue;
    emailValue;
    dateValue;
    phoneValue;
    addressValue ;
    errorMessage='';
    

   

    @track genderOptions = [
        { label: '', value: '--None--' },
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
    ];
    @track bloodgroupOptions=[
        { label:'', value:'--None--'},
        { label:'A+',value:'A+'},
        { label:'A-',value:'A-'},
        { label:'B+',value:'B+'},
        { label:'B-',value:'B-'},
        { label:'AB+',value:'AB+'},
        { label:'AB-',value:'AB-'},
        { label:'O+',value:'O+'},
        { label:'O-+',value:'O-'},
    ]
    
    handleFirstNameChange(event) {
        this.firstNameValue = event.target.value;
    }
    handleLastNameChange(event) {
        this.lastNameValue = event.target.value;
    }
    handleGenderChange(event) {
        this.selectedGenderValue = event.target.value;
    }
    handleEmailChange(event) {
        this.emailValue = event.target.value;
    }
    handleDateChange(event) {
        this.dateValue = event.target.value;
    }
    handlePhoneChange(event) {
        this.phoneValue = event.target.value;
    }
    handleBloodgroupChange(event) {
        this.selectedBloodgroupValue = event.target.value;
    }
    handleAddressChange(event) {
        this.addressValue = event.target.value;
    }
    handleRegistration(){
        this.errorMessage = '';
       // const regex = /^[a-zA-Z]+$/;
        //const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        

        // Validate first name
        if (!this.firstNameValue){
            this.errorMessage = 'Please enter a valid first name.';
           
            return;
        }

        // Validate last name
        if (!this.lastNameValue) {
            this.errorMessage = 'Please enter a valid last name.';
            
            return;
        }

        // Validate gender
        if (!this.selectedGenderValue) {
            this.errorMessage = 'Please select a gender.';
            return;
        }

        // Validate email
        if (!this.emailValue) {
            this.errorMessage = 'Please enter your email address.';
            return;
        } /*else if (!emailRegex.test(this.emailValue)) {
            this.errorMessage = 'Please enter a valid email address.';
            return;
        }*/

        // Validate date
        if (!this.dateValue) {
            this.errorMessage = 'Please enter a valid date.';
            return;
        }

        // Validate phone number
        //const phoneRegex = /^\d{10}$/;
        if (!this.phoneValue){
            this.errorMessage = 'Please enter a valid 10-digit phone number.';
            return;
        }

        // Validate blood group
        if (!this.selectedBloodgroupValue) {
            this.errorMessage = 'Please select a blood group.';
            return;
        }
        
        // Validate address
        if (!this.addressValue) {
            this.errorMessage = 'Please enter your address.';
            return;
        }

        // Call Apex method to register user
        registerUser({ 
            firstName: this.firstNameValue, 
            lastName: this.lastNameValue, 
            email: this.emailValue,
            gender: this.selectedGenderValue,
            dateofBirth: this.dateValue,
            phone: this.phoneValue,
            bloodGroup: this.selectedBloodgroupValue,
            address: this.addressValue
        })
        .then((result) => {
            if (result === this.emailValue) {
                
               
                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url: 'CheckPasswordResetEmail'
                    }
                },true);

             } else {
                console.log('No Email Detected');
            }
        })
        .catch((error) => {
            this.error = error;      
            this.errorMessage = error.body.message;
            console.log(this.errorMessage);
        });
    }

}