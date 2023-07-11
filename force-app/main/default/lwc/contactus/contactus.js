import { LightningElement } from 'lwc';
import gmailIcon from '@salesforce/resourceUrl/Gmailicon';
import phoneIcon from '@salesforce/resourceUrl/phoneicon';
import facebookIcon from '@salesforce/resourceUrl/facebookicon';
import linkedinIcon from '@salesforce/resourceUrl/linkedinicon';
import twitterIcon from '@salesforce/resourceUrl/twittericon';
import instgramIcon from '@salesforce/resourceUrl/instagramicon';
import youtudeIcon from '@salesforce/resourceUrl/youtudeicon';
import locationIcon from '@salesforce/resourceUrl/locationIcon'

export default class Contactus extends LightningElement {
    gmailImg=gmailIcon;
    phoneImg=phoneIcon;
    facebookImg=facebookIcon;
    twitterImg=twitterIcon;
    linkedinImg=linkedinIcon;
    instagramImg=instgramIcon;
    youtudeImg=youtudeIcon;
    LocationImg=locationIcon;
}