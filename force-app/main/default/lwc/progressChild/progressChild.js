import { LightningElement, api } from 'lwc';

export default class ProgressChild extends LightningElement {
    progress = 0;
    intervalId;

    @api
    handleStart() {
        this.intervalId = setInterval(() => {
            this.progress = this.progress + 10;
            if (this.progress >= 101) {
                clearInterval(this.intervalId);
                this.progress=0;
                const e = new CustomEvent('progressfinished');
                this.dispatchEvent(e);
            }
        }, 300);
    }
}
