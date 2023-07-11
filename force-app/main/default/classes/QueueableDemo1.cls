public class QueueableDemo1 implements Queueable{
    
   /* public string str1;
    public QueueableDemo1(string str1){
        this.str1=str1;
    }*/
    
    public void execute(QueueableContext ctx){
        
        List<Account> accList=[SELECT Name FROM Account WHERE createdDate=Today];
        delete accList;
        
    }

}