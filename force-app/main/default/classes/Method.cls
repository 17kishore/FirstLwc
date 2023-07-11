public class Method {
    public static boolean flag=true;
    
    public static void firstTime(){
        if(flag){
        system.debug('one time exceuted');
            flag=false;
            system.debug(flag);
        }else{
            system.debug('Already Exceuted');
        }
        
    }

}