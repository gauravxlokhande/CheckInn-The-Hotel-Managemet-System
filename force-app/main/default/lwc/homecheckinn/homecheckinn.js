import { LightningElement, track } from 'lwc';
import FetchAllHotels from '@salesforce/apex/CheckInn.FetchAllHotels';
import HotelImage from '@salesforce/resourceUrl/HotelImage';
import thirdpartycss from '@salesforce/resourceUrl/thirdpartycss';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class Homecheckinn extends LightningElement {


    @track FirstLoad = true;

    connectedCallback() {
       if (this.FirstLoad) {
           loadStyle(this, thirdpartycss)
               .then((result) => {
                   console.log('CSS loaded successfully');
                   this.FirstLoad = false;
               })
               .catch((error) => {
                   console.error('Error loading CSS: ', error);
               });
       }
    }







    @track Address;
    @track AvailableRooms;
    @track Description;
    @track Email;
    @track HotelImage = HotelImage;
    @track HotelName;
    @track OccupiedRooms;
    @track Phone;
    @track TotalRooms;

    connectedCallback() {
        this.FetchHotelDetails();
    }

    FetchHotelDetails() {
        FetchAllHotels()
            .then((result) => {
                result.forEach(hotel => {
                    this.Address = hotel.Address__c,
                        this.AvailableRooms = hotel.Available_Rooms__c,
                        this.Description = hotel.Description__c,
                        this.Email = hotel.Email__c,
                        this.HotelName = hotel.Name,
                        this.OccupiedRooms = hotel.Occupied_Rooms__c,
                        this.Phone = hotel.Phone__c,
                        this.TotalRooms = hotel.Total_Rooms__c;
                });

        }).catch((error) => {
            alert(error.body.message)
        });
    }

}