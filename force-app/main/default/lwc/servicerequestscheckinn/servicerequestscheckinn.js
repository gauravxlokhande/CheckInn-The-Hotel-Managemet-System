import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import InsertServiceRequest from '@salesforce/apex/CheckInn.InsertServiceRequest';
import fetchServiceRequest from '@salesforce/apex/CheckInn.fetchServiceRequest';

export default class Servicerequestscheckinn extends LightningElement {

    connectedCallback() {
        this.fetchservicerequests();
    }

    @track myVal='';

    handleChangeovvalue(event) {
        this.myVal = event.target.value;
    }



    handleClickOfSubmitRequest() {
        InsertServiceRequest({ ServiceText: this.myVal })
        .then((result) => {
       this.dispatchEvent(new ShowToastEvent({
           title: "Service Request Submit Successfully",
           variant: "success"
       }));
            this.myVal = '';
            this.fetchservicerequests();
        }).catch((error) => {
            this.dispatchEvent(new ShowToastEvent({
                title: "Error While Submitting Request",
                variant: "warning"
            }));
        });
    }

    @track StoreServiceReqData = [];


    fetchservicerequests() {
        fetchServiceRequest()
            .then((result) => {
                this.StoreServiceReqData = result;
    console.log(result);
        }).catch((error) => {
            
        });
        
    }


    
}