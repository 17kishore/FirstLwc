import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class MyComponent extends LightningElement {
    @wire(CurrentPageReference) currentPageReference;

    get communityUserId() {
        if (this.currentPageReference) {
            return this.currentPageReference.state.c__userId;
        }
        return null;
    }
}
