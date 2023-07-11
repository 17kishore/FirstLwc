/********************************************************************
 * Class Name: AddEmployee
 * Created by: kishore v
 * Created on: 3/12/22
 * use of Class: To add Employee ,finding position and Calculating High paid and Low Paid Employees
 * ******************************************************************/
public class AddEmployee{
    
     public Map<integer,Employeess> mapEmployee= new Map<integer,Employeess>();
     public integer count=0;
     public map<string,decimal> highSalaryMap=new map<string,decimal>();
     public map<string,decimal> lowSalaryMap=new map<string,decimal>();
     public list<decimal> val=new list<decimal>();
     public decimal highSalary,lowSalary;
    
/*
 * Function: This function used to calculate Total Employees based On position
 *   params=>position  
                     */
    
    public void countEmployess(string position){
        if(string.isEmpty(position)){
            system.debug('The Position you entered is Empty');
        }  else {
        position=position.toLowerCase();
        for(integer i:mapEmployee.keySet()){  
            if(mapEmployee.get(i).position.equals(position)){
                count+=1;
               }
        }
 } 
        if(count>0){
        system.debug('Total no of Employess based on :'+position+'=' +count);
             } else if(string.isNotEmpty(position)) {
                  system.debug('No such position exists and Check the Position you entered');
        } 
    }
    
 /*
  * Function : This function used for Calculating High paid and Low Paid Employees
  * params=> No params used
   */
  
    public void salaryRange(){
    for(integer i:mapEmployee.keySet()){
            val.add(mapEmployee.get(i).salary);
               } 
        
       val.sort();
       highSalary=val.get(val.size()-1);
       lowSalary=val.get(0);
        
        for(integer i:mapEmployee.keySet()){
            if(mapEmployee.get(i).salary>=highSalary){
               highSalaryMap.put(mapEmployee.get(i).name,mapEmployee.get(i).salary);
            }
        }
        system.debug('Employees Getting High Salary:'+highSalaryMap);
       
        for(integer i:mapEmployee.keySet()){
            if(mapEmployee.get(i).salary<=lowSalary){
               lowSalaryMap.put(mapEmployee.get(i).name,mapEmployee.get(i).salary);
            }
        }
        system.debug('Employees Getting Low Salary:'+lowSalaryMap);
        }
}