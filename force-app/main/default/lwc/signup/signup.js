import { LightningElement, track } from 'lwc';
import createAccountAndContact from '@salesforce/apex/CheckInn.createAccountAndContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class Signup extends NavigationMixin (LightningElement) {


    @track FirstName = '';
    @track LastName = '';
    @track Email = '';
    @track Password = '';
    @track ConfirmPassword = '';

    handleFirstNameChange(event) {
        this.FirstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.LastName = event.target.value;
    }

    handleEmailChange(event) {
        this.Email = event.target.value;
    }

    handlePasswordChange(event) {
        this.Password = event.target.value;
    }

    handleConfirmPasswordChange(event) {
        this.ConfirmPassword = event.target.value;
    }

    handleClickSignUp() {

        if (this.Password ===this.ConfirmPassword) {
        createAccountAndContact({ firstName: this.firstName, lastName: this.LastName, email: this.Email, Password: this.Password })
            .then((result) => {

                this.dispatchEvent(new ShowToastEvent({
                    title: "Registered Successfull.",
                    variant: "success"
                }));

                this[NavigationMixin.Navigate]({
                    type: "standard__webPage",
                    attributes: {
                       url: "https://gauravlokhande-dev-ed.develop.my.site.com/CheckInn/login"
                    }
                });
            }).catch((error) => {
               this.dispatchEvent(new ShowToastEvent({
                title: "Error While Registering Yourself",
                   message: error.body.message,
                   variant: "error"
               }));
            });
        } else {
          this.dispatchEvent(new ShowToastEvent({
              title: "Password not matched.",
              variant: "warning"
          }));
        }
    }




}