public class GradeCalculation {
    
    public integer mark1=60,mark2=60,mark3=60;
    public integer average;
    public string result;
    
    public void results(){
    
    if (mark1>=40 && mark2>=40 && mark3>=40) 
        {
            result='PASS';
            system.debug('RESULT='+result);
        }
        else{
            result='FAIL';
            system.debug('RESULT='+result);
        }
    }
    
    
    public void grade(){
        
        average=(mark1+mark2+mark3)/3;
        
        if(average>90 && result=='PASS'){
            system.debug('Grade S');
            
        } else if(average>80 && result=='PASS'){
            system.debug('Grade A');
            
        } else if(average>70 && result=='PASS'){
            system.debug('Grade B');
            
        } else if(average>50 && result=='PASS'){
            system.debug('Grade C');
            
        }else{
            system.debug(' GRADE FAIL');
        }
        
    }
    
    

}