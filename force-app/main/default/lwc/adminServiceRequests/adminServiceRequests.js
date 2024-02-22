import { LightningElement, track } from 'lwc';
import AllServiceRequests from '@salesforce/apex/CheckInnAdmin.AllServiceRequests';
import ReplyServiceReq from '@salesforce/apex/CheckInnAdmin.ReplyServiceReq';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AdminServiceRequests extends LightningElement {


    connectedCallback() {
        this.fetchallservicereq();
}

    @track serviceRequests = [];
    
    fetchallservicereq() {
        AllServiceRequests()
            .then((result) => {
                console.log(result);
                this.serviceRequests = result;
            console.log(result);
        }).catch((error) => {
            
        });
    }

    @track ServiceReqNo = '';

    @track ShowReplyTemplate = false;

    handleClickOfReplyButton(event) {
        this.ServiceReqNo = event.currentTarget.dataset.name;
        console.log(this.ServiceReqNo);
        this.ShowReplyTemplate = true;
    }


    @track replyservicereq = '';


    HandleOnChangeServiceReqReply(event) {
        this.replyservicereq = event.target.value;
        console.log(this.replyservicereq);
      
    }




    HandleOnclickOfCancel() {
        this.ShowReplyTemplate = false;
    }

    HandleOnclickOfsend() {

        if (this.replyservicereq!=='') {
        ReplyServiceReq({ serviceRequestId:this.ServiceReqNo, replyText:this.replyservicereq})
        .then((result) => {
            this.fetchallservicereq();
            this.replyservicereq = '';
            this.ShowReplyTemplate = false;
        }).catch((error) => {
            alert(error.body.message)
        });
        } else {
            this.dispatchEvent(new ShowToastEvent({
                title: "Please Enter The Text.",
                variant: "warning"
            }));
    }
    }

}