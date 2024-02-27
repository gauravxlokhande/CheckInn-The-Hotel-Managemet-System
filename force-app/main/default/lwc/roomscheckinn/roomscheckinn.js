import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import HotelRoom1 from '@salesforce/resourceUrl/HotelRoom1';
import HotelRoom2 from '@salesforce/resourceUrl/HotelRoom2';
import fetchAvaliableRooms from '@salesforce/apex/CheckInn.fetchAvaliableRooms';
import gaveroomrent from '@salesforce/apex/CheckInn.gaveroomrent';
import CreateBooking from '@salesforce/apex/CheckInn.CreateBooking';
import bootstrap from '@salesforce/resourceUrl/bootstrap';
import bootstrapjs from '@salesforce/resourceUrl/bootstrapjs';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';


export default class Roomscheckinn extends LightningElement {

    renderedCallback() {
        Promise.all([
            loadStyle(this, bootstrap),
            loadScript(this, bootstrapjs)
        ]).then(() => {
            console.log('Files loaded.');
        }).catch(error => {
            console.error('Error:', error);
        });
    }



    

    @track HotelRoom1 = HotelRoom1;
    @track HotelRoom2 = HotelRoom2;

    connectedCallback() {
        this.fetchavailableroom();
    }


    @track BookRoomTemplate = false;
    @track AvailableRooms = [];
    @track StoreRoomType = '';
    @track Storeroomrent='';


    fetchavailableroom() {
        fetchAvaliableRooms()
            .then((result) => {
                this.AvailableRooms = result.filter(item => item.Room_Type__c === this.StoreRoomType);
                if (this.AvailableRooms.length<=0) {
                    this.AvailableRooms = result;
                }
            // console.log('length of available rooms', this.AvailableRooms.length);  
               
            }).catch((error) => {
                alert(error.body.message)
            });
    }


    @track StoreCurrentRoomId;

    async handleClickofBookRoom(event) {
       
        const roomid = event.currentTarget.dataset.id;
        this.StoreCurrentRoomId = roomid;
        // console.log('Fetch Room ID', roomid)

      await  gaveroomrent({ roomId: roomid })
          .then((result) => {
              this.Storeroomrent = result;
          //  console.log('total room rent',result);
            this.BookRoomTemplate = true;
        }).catch((error) => {
        console.log(error.body.message);
        });
    }






    OnClickRoomTypes(event) {
        const Roomtype = event.currentTarget.dataset.name;
        this.StoreRoomType = Roomtype;
        this.fetchavailableroom();
    }

    OnClickBookRoomModalFalse() {
        this.BookRoomTemplate = false;
    }



    @track FirstName;
    @track LastName;
    @track Totalmembers;
    @track Checkindatetime;
    @track Checkoutdatetime;
    @track totalAmount;


    OnChangeFirstName(event) {
        this.FirstName = event.target.value;
    }

    OnChangeLastName(event) {
        this.LastName = event.target.value;
    }


    OnChangeTotalMembers(event) {
        this.Totalmembers = event.target.value;
    }

    OnChangeCheckInDatetime(event) {
        this.Checkindatetime = event.target.value;
    }

    OnChangeCheckoutdatetime(event) {
        this.Checkoutdatetime = event.target.value;
    }

    EnterTotalPayableAmount(event) {
        this.totalAmount = event.target.value;
    }



    handleClickOfBookRoom() {
        console.log('room rent from org',this.Storeroomrent);
        console.log('room rent from user',this.totalAmount);
        if (this.Storeroomrent == this.totalAmount) {
        CreateBooking({ FirstName: this.FirstName, LastName: this.LastName, TotalMembers: this.Totalmembers, Checkindatetime: this.Checkindatetime, checkoutdatetime: this.Checkoutdatetime, totalpayableamount: this.totalAmount,RoomName:this.StoreCurrentRoomId })
        .then((result) => {
            this.dispatchEvent(new ShowToastEvent({
                message: result,
                variant: "success"
            }));
            this.makenullalldata();
            this.BookRoomTemplate = false;
            this.fetchavailableroom();
        }).catch((error) => {
            this.dispatchEvent(new ShowToastEvent({
                message: error.body.message,
                variant: "error"
            }));
        });
        } else {
            this.dispatchEvent(new ShowToastEvent({
                title: "Please pay total rent for room",
                variant: "warning"
            }));
    }
    }



    makenullalldata() {
        this.FirstName = null;
        this.LastName = null;
        this.Totalmembers = null;
        this.Checkindatetime = null;
        this.Checkoutdatetime = null;
        this.totalAmount = null;
  }

}