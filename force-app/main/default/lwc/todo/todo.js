import { LightningElement,track } from 'lwc';

export default class Todo extends LightningElement {

    @track todoArray=[];
    addToList;
    removeFromList;
    indexId;


    handleChange(event){
        this.addToList=event.target.value;
    }

    handleClick(event){
        this.todoArray.push({id:this.todoArray.length,task:this.addToList});
        this.addToList='';
    }

    handleIconClick(event) {
        this.indexId = event.target.dataset.i;
        this.todoArray = this.todoArray.filter(item => item.id !== Number(this.indexId) );
    }
    
}
