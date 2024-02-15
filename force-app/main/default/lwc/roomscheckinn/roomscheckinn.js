import { LightningElement, track } from 'lwc';
import HotelRoom1 from '@salesforce/resourceUrl/HotelRoom1';
import HotelRoom2 from '@salesforce/resourceUrl/HotelRoom2';
import fetchAvaliableRooms from '@salesforce/apex/CheckInn.fetchAvaliableRooms';

export default class Roomscheckinn extends LightningElement {
    @track HotelRoom1 = HotelRoom1;
    @track HotelRoom2 = HotelRoom2;

    connectedCallback() {
        this.fetchavailableroom();
    }


    @track AllRoomsTemplate = true;
    @track SingleRomsTemplate = false;
    @track ConnectingRoomsTemplate = false;
    @track DeluxeRoomsTemplate = false;
    @track DoubleRoomsTemplate = false;
    @track SuiteRoomsTemplate = false;


    @track AvailableRooms = [];
    @track SingleRooms = [];
    @track ConnectingRooms = [];
    @track DeluxeRooms = [];
    @track DoubleRooms = [];
    @track SuiteRooms = [];




    fetchavailableroom() {
        fetchAvaliableRooms()
            .then((result) => {
                this.AvailableRooms = result;
                this.SingleRooms = result.filter(item => item.Room_Type__c === 'Single room');
                this.ConnectingRooms = result.filter(item => item.Room_Type__c === 'Connecting rooms');
                this.DeluxeRooms = result.filter(item => item.Room_Type__c === 'Deluxe Room');
                this.DoubleRooms = result.filter(item => item.Room_Type__c === 'Double room');
                this.SuiteRooms = result.filter(item => item.Room_Type__c === 'Suite');

            
            }).catch((error) => {
                alert(error.body.message)
            });
    }



    OnClickRoomTypes(event) {
        const Roomtype = event.currentTarget.dataset.name;

        switch (Roomtype) {

            case 'All Rooms':
                this.AllRoomsTemplate = true;
                this.SingleRomsTemplate = false;
                this.ConnectingRoomsTemplate = false;
                this.DeluxeRoomsTemplate = false;
                this.DoubleRoomsTemplate = false;
                this.SuiteRoomsTemplate = false;
                break;
            case 'Double':
                this.AllRoomsTemplate = false;
                this.SingleRomsTemplate = false;
                this.ConnectingRoomsTemplate = false;
                this.DeluxeRoomsTemplate = false;
                this.DoubleRoomsTemplate = true;
                this.SuiteRoomsTemplate = false;

                break;
            case 'Single':
                this.AllRoomsTemplate = false;
                this.SingleRomsTemplate = true;
                this.ConnectingRoomsTemplate = false;
                this.DeluxeRoomsTemplate = false;
                this.DoubleRoomsTemplate = false;
                this.SuiteRoomsTemplate = false;

                break;
            case 'Deluxe Room':
                this.AllRoomsTemplate = false;
                this.SingleRomsTemplate = false;
                this.ConnectingRoomsTemplate = false;
                this.DeluxeRoomsTemplate = true;
                this.DoubleRoomsTemplate = false;
                this.SuiteRoomsTemplate = false;

                break;
            case 'Connecting rooms':
                this.AllRoomsTemplate = false;
                this.SingleRomsTemplate = false;
                this.ConnectingRoomsTemplate = true;
                this.DeluxeRoomsTemplate = false;
                this.DoubleRoomsTemplate = false;
                this.SuiteRoomsTemplate = false;

                break;
            case 'Suite':
                this.AllRoomsTemplate = false;
                this.SingleRomsTemplate = false;
                this.ConnectingRoomsTemplate = false;
                this.DeluxeRoomsTemplate = false;
                this.DoubleRoomsTemplate = false;
                this.SuiteRoomsTemplate = true;

                break;
            default:

                break;
        }
    }


}