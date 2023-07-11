import { LightningElement } from 'lwc';
import doLogin from '@salesforce/apex/CommunityAuthController.doLogin';

export default class LoginComponent extends LightningElement {

    username;
    password;
    errorMessage;
    patientError;
    isLoading = false;

    handleUserNameChange(event){
        this.username = event.target.value;
    }

    handlePasswordChange(event){
        this.password = event.target.value;
    }

    handleLogin(){
        this.isLoading = true; // set isLoading to true when the login button is clicked
        this.errorMessage = '';
        this.patientError = '';
       if (!this.username || !this.password) { // Check if either field is empty
          setTimeout(() => {
            this.errorMessage = 'Please enter both username and password';
            this.isLoading = false;
          },250);
            return;
        }
                doLogin({ username: this.username, password: this.password })
                    .then((result) => {
                        if(result==="Patient"){
                            this.patientError="Use Patient Login"
                            console.log(result);
                        } else {
                            window.location.href = result;
                            console.log(result);
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
