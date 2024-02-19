import { LightningElement, track } from 'lwc';
import AllServiceRequests from '@salesforce/apex/CheckInnAdmin.AllServiceRequests';

export default class AdminServiceRequests extends LightningElement {


    connectedCallback() {
        this.fetchallservicereq();
}

    @track StoreServices = [];
    
    fetchallservicereq() {
        AllServiceRequests()
            .then((result) => {
                this.StoreServices = result;
            console.log(result);
        }).catch((err) => {
            
        });
    }
}