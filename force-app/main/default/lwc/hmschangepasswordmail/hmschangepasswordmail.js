import { LightningElement } from 'lwc';
import basePath from "@salesforce/community/basePath";

export default class Hmschangepasswordmail extends LightningElement {

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";
    }
}