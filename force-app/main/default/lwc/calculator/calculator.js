import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

    firstValue='';
    secondValue='';
    result;

    handleChange(event){
        if(event.target.name=="value1"){
            this.firstValue=event.target.value;
        }
        else{
            this.secondValue=event.target.value; 
        }
       
    }
    
    handleClick(event){

        if(event.target.name=="ADD"){
           this.result=parseFloat(this.firstValue) +
          parseFloat(this.secondValue);
        }
        else if(event.target.name=="SUB"){
            this.result=parseFloat(this.firstValue) -
            parseFloat(this.secondValue); 
        }
        else if(event.target.name=="MUL"){
            this.result=parseFloat(this.firstValue) *
            parseFloat(this.secondValue);
        }
        else if(event.target.name=='DIV'){

            if(this.secondValue==0){
               alert("you cannot divide by any number 0")
            } else {
                this.result=parseFloat(this.firstValue) /
                 parseFloat(this.secondValue);
            }
           
        }
        else{
            this.firstValue='';
            this.secondValue='';
            this.result='';
        }
    }
    
    
}