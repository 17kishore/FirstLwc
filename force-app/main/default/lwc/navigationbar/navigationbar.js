import { LightningElement,wire} from 'lwc';
import LogoImg from '@salesforce/resourceUrl/Hospital_Management_Logo';
import ProfilePic from '@salesforce/resourceUrl/profile_pic';
import Id from '@salesforce/user/Id';
import isguest from '@salesforce/user/isGuest';
import { getRecord} from 'lightning/uiRecordApi';
import ProfileName from '@salesforce/schema/User.Profile.Name';
import basePath from "@salesforce/community/basePath";
import { NavigationMixin } from 'lightning/navigation';


export default class NavBar extends LightningElement {
    LogoUrl=LogoImg;
    UserProfilePic = ProfilePic ;
    userId=Id;
    isGuestUser = isguest ;
    doctorProfile;
    patientProfile;

    @wire(getRecord,{recordId:'$userId',fields:ProfileName})
    userProfile({ error, data }) {
        if (error) {
            this.error = error;
        } else if(data) {
            if (data.fields.Profile.value.fields.Name.value ==='Doctor Portal Profile') {
               this.doctorProfile=true;
            } else if(data.fields.Profile.value.fields.Name.value ==='Patient Portal Profile'){
                this.patientProfile=true;
            }
        }
    }
    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";

    }

}