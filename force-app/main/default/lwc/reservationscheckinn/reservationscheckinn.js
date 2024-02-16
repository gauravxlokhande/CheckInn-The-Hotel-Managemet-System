import { LightningElement, track } from 'lwc';
import allReservations from '@salesforce/apex/CheckInn.allReservations';

export default class Reservationscheckinn extends LightningElement {
    @track reservationsdata = [];

    connectedCallback() {
        this.fetchallreservations();
    }

    fetchallreservations() {
        allReservations()
            .then((result) => {
                console.log(result); // Check the structure of the result
                this.reservationsdata = result; // Set component property
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
    }
}
