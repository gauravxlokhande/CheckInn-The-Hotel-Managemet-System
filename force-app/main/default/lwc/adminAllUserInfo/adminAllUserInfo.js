import { LightningElement, track } from 'lwc';
import fetchAllCheckInnAcc from '@salesforce/apex/CheckInnAdmin.fetchAllCheckInnAcc';

export default class AdminAllUserInfo extends LightningElement {

    connectedCallback() {
        this.fetckallusers();
    }

    @track AllUsers = [];


    fetckallusers() {
        fetchAllCheckInnAcc()
            .then((result) => {
                console.log(result);
                this.AllUsers = result;

            }).catch((error) => {

            });
    }


}