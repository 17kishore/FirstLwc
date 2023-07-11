public class QueueableDemo implements Queueable{
    
    /*public string str1;
    public QueueableDemo(string str1){
        this.str1=str1;
    }*/
    
    public  void execute(QueueableContext ctx){
        
        List<Contact> conList=[SELECT Name FROM Contact WHERE createdDate=Today];
        delete conList;
   /* dateTime start=system.now();
        while(system.now()<start.addSeconds(30)){
            
        }*/
      system.enqueueJob(new QueueableDemo1());
    }

}