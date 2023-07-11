import { LightningElement } from 'lwc';
import jsPDF from '@salesforce/resourceUrl/jsPDF';
import { loadScript } from 'lightning/platformResourceLoader';


export default class JsPDFTest extends LightningElement {
 
    jsPdfInitialized=false;
    renderedCallback(){
        
        loadScript(this, jsPDF ).then(() => {});
        if (this.jsPdfInitialized) {
            return;
        }
        this.jsPdfInitialized = true;
    }

    generatePdf(){
      const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text('Hi Kishore we are done', 45, 70)
        doc.save('CustomerInvoice.pdf')

}
 generateData(){
        this.generatePdf();
}
}
