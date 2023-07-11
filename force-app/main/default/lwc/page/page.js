import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class MyComponent extends NavigationMixin(LightningElement) {
    handleLoginClick() {
        // replace with the callback URL for your Experience Builder login page
        const callbackUrl = 'https://casestudy-dev-ed.my.site.com/lwc';

        this[NavigationMixin.Navigate]({
            type: 'comm__loginPage',
            attributes: {
                actionName: 'login',
                callbackUrl: callbackUrl
            }
        });
    }
}
