import { LightningElement } from 'lwc';
import LOGO from '@salesforce/resourceUrl/Hospital_Management_Logo';
import Id from '@salesforce/user/Id';
import isGuest from "@salesforce/user/isGuest";
import basePath from "@salesforce/community/basePath";


export default class Navi extends LightningElement {

    LogoUrl=LOGO;
    userId=Id;

    get isGuest() {
        return isGuest;
    }

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";
    }
}