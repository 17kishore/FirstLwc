import { LightningElement,track } from 'lwc';
import registerUser from '@salesforce/apex/MoekaLoginRegistrationController.registerUser';


export default class Hmspatientregistration extends LightningElement {


    @track firstName= '';
    @track lastName='';
    @track gender='';
    @track dob='';
    @track phone='';
    @track bloodgroup='';
    @track email='';
    @track username='';
    @track address='';
    isLoading = false;
    checkEmail='';
    errorMessage;
    

   

    onEmailInvalid(event){

        if (!event.target.validity.valid) {
            event.target.setCustomValidity('Enter a valid email address')
        }
        
    }

    onEmailInput(event){

        event.target.setCustomValidity('')
    }

    onEmailClick(event){

        let parent = event.target.parentElement.parentElement.parentElement;
        console.log('parent-', parent);
        parent.classList.remove('tooltipEmail');
    }

    onEmailBlur(event){

        let parent = event.target.parentElement.parentElement.parentElement;
        console.log('parent-', parent);
        parent.classList.add('tooltipEmail');
    }

    handleEmailChange(event){
        if(event.target.value){
            const emailName=event.target.value.split('@')[0];
            this.email = emailName;
            this.username = emailName + '@gmail.com';
        
        } else {

            this.email = '';
            this.username ='';
        }
    }
    handleRegistration(){
        this.isLoading=true;
         registerUser({ firstName:this.firstName,lastName:this.lastName,email:this.email})
         .then((result) => {
            if(result==='hulu@gmail.com'){
               this.checkEmail='/CheckPasswordResetEmail';
               console.log(result);
               console.log(this.checkEmail);
               window.location.href = this.checkEmail;
            } else{
                console.log('No Email Deteced');
            }
         })
         .catch((error) => {
            this.error = error;      
            this.errorMessage = error.body.message;
            console.log(this.errorMessage);
            console.log('expection');
        })
        .finally(() => {
            this.isLoading = false;
        });
                    
    }

    handleFirstNameChange(event){
        this.firstName=event.target.value;    
    }
    handleLastNameChange(event){
        this.lastName=event.target.value;
    }
    handleGenderChange(event){
        this.gender=event.target.value;
    }
    handledobChange(event){
        this.dob=event.target.value;
    }
    handleNumberChange(event){
        this.phone=event.target.value;
    }
    handlebloodgroupChange(event){
        this.bloodgroup=event.target.value;
    }
    handleaddresschange(event){
        this.address=event.target.value;
    }
}