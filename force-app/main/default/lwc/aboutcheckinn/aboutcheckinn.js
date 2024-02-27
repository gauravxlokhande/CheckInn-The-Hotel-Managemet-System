// aboutcheckinn.js
import { LightningElement, track } from 'lwc';
import profilepic from '@salesforce/resourceUrl/profilepic';
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';
import thirdpartycss from '@salesforce/resourceUrl/bootstrap';
import bootstrapjs from '@salesforce/resourceUrl/bootstrapjs';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Aboutcheckinn extends LightningElement {


    @track profilepic = profilepic;
    @track FirstLoad = true;

    renderedCallback() {
        if (this.FirstLoad) {
            Promise.all([
                loadStyle(this, thirdpartycss),
                loadScript(this, bootstrapjs)
            ]).then(() => {
                console.log('CSS and JS loaded successfully');
                this.FirstLoad = false;
            }).catch(error => {
                console.error('Error loading resources: ', error);
            });
        }
    }

     connectedCallback() {
       this.handleFetch();
    }



    @track newdata;

   async handleFetch() {
        let endPoint = await "https://randomuser.me/api/";
        fetch(endPoint, {
            method: "GET"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
        const userData = data.results[0];
            this.newdata = userData;
            console.log(userData.gender);
            // console.log(this.newdata.gender);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
}