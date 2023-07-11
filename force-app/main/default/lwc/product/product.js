import { LightningElement,track} from 'lwc';

export default class Product extends LightningElement {
    currentStock;
    lessStock;
    isShow;

    @track product = {
        name: "TV",
        price: 10000,
        stock:100
    }

    handleChange(event) {

        this.currentStock = event.target.value;

        if(this.currentStock==0){
            this.lessStock='No Stock Available';
            this.isShow=false;

        } else{
            this.product.stock = this.currentStock;
            this.isShow=true;
            
        }
        
    }
}
