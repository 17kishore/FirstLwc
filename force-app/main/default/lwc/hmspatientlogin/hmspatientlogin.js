import { LightningElement } from 'lwc';
import patientLogin from '@salesforce/apex/PatientLoginController.doPatientLogin';
import icon from '@salesforce/resourceUrl/patientLogin';

export default class LoginComponent extends LightningElement{
    patientLoginimg=icon;
    username;
    password;
    errorMessage;
    doctorError;
    isLoading = false;

    handleUserNameChange(event){
        this.username = event.target.value;
    }

    handlePasswordChange(event){
        this.password = event.target.value;
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
          this.handleLogin();
        }
    }

    handleLogin(event){
        
        this.isLoading = true; // set isLoading to true when the login button is clicked
        this.errorMessage = '';
        this.doctorError = '';
       if (!this.username || !this.password) { // Check if either field is empty
          setTimeout(() => {
            this.errorMessage = 'Please enter both username and password';
            this.isLoading = false;
          },250);
            return;
        }
        
        patientLogin({ username: this.username, password: this.password })
                    .then((result) => {
                        if(result==="Doctor"){
                            this.doctorError="Use Doctor Login"
                        } else {
                            const link = document.createElement('a');
                            link.href = result;
                            link.target = '_self';
                            link.style.display = 'none';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    })
                    .catch((error) => {
                        this.error = error;      
                        this.errorMessage = error.body.message;
                        console.log(this.errorMessage);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
    }
    
}