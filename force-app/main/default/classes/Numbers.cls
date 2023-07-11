public class Numbers {
    
    List<integer> largeNum =new  List<integer>{};
    List<integer> negativeNumber = new List<integer>();
    List<integer> newList =new List<integer>();
        integer odd=0,even=0;
        
       public void findLargeNum(){
           if(largeNum.size()==0){
               system.debug('No elements in the list');
           } else{
           largeNum.sort();
           system.debug('The largest Number in List:'+largeNum.get(largeNum.size()-1));
          }
       }
       public void sumOddEven(){
           for(integer i:largeNum)
           {
               if(math.mod(i,2)==0){
                   even+=i;
               } else{
                   odd+=i;
               }
           }
               system.debug('sum of even numbers:'+even);
               system.debug('sum of odd numbers:'+odd);
       }
    public void negative(){
        for(integer i:largeNum)
            if(i<0){
               negativeNumber.add(i);                
            } 
        if(negativeNumber.size()==0){
            system.debug(' No -ve numbers in list');
        }
    for(integer j:negativeNumber){
        system.debug(' Negative numbers in list:'+j);     
         }
    }
 
    public Void countNegative(){
        System.debug('Total Numbers of Negative Numbers in List:'+ negativeNumber.size());
    }
      
    public void reverseList(){
        for(integer i=largeNum.size()-1;i>=0;--i){
            system.debug(largeNum[i]);
            newList.add(largeNum[i]);
           }
     for(integer j:newList){
     system.debug('The new list values:'+j);
     }
}
}