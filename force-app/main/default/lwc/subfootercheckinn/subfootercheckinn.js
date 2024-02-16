import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import InstaLogoPng from '@salesforce/resourceUrl/InstaLogoPng';
import linkedinLogoPng from '@salesforce/resourceUrl/linkedinLogoPng';

export default class Subfootercheckinn extends NavigationMixin(LightningElement) {


    @track InstaLogoPng = InstaLogoPng;
    @track linkedinLogoPng = linkedinLogoPng;


    onclickofinsta() {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "https://in.linkedin.com/in/gauravlokhande"
            }
        });
    }

    onclickoflinkedin() {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "https://www.salesforce.com/trailblazer/gauravlokhande"
            }
        });
    }
}
