import { LightningElement, track } from 'lwc';
import ShowAllRooms from '@salesforce/apex/CheckInnAdmin.ShowAllRooms';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AdminAllRoomsInfo extends LightningElement {

    @track isShowModal = false;

    @track AddNewRoomTemplate = false;
        
    @track StoreAllRooms;

    connectedCallback() {
        this.showallroomsAdmin();
    }

    showallroomsAdmin() {
        ShowAllRooms()
            .then((result) => {
                this.StoreAllRooms = result;
            console.log(typeof(result));
        }).catch((error) => {
            alert(error.body.message)
        });
    }
   

    handleClickOfAddRoom() {
        this.AddNewRoomTemplate = true;
        this.isShowModal = true;
    }

    hideModalBox() {
        this.isShowModal = false;
    }


    handleSuccess(event) {
        // Show toast message or any other action upon successful record creation
        this.isShowModal = false;
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Room Added successfully',
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
        
        // Close the modal or navigate to another page if needed
    }
}