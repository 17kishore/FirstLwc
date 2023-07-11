import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {
    colorCss = ''; // default color

    handleClick(event) {

        if(event.target.name=="RED"){
        this.colorCss = 'red';
    } else {
        this.colorCss = 'blue';
    }

    }
}
