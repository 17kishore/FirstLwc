import { LightningElement } from 'lwc';

export default class Postsdata extends LightningElement {

    posts=[];

    async handleClick(event){

     
        let url='https://jsonplaceholder.typicode.com/posts';
        let response=await fetch(url,{method:"GET"});
        let data=await response.json();
        this.posts=data;
        console.log(data)
        

      
    }
}
