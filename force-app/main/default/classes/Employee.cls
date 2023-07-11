public class Employee {
    public string employeeName;
    public string email;
    public string position;
    public string gender;
    public string department;
    public decimal salary;
    
    public void addEmployees(string employeeName,string email,string position,string gender,decimal salary){
        this.employeeName=employeeName;
        this.email=email;
        this.position=position;
        this.gender=gender;
        this.salary=salary;
      //  this.department=department;
        
        List<Employee__c> empToAdd=new  List<Employee__c>();
        
        List<Employee__c> lstToAdd=queryEmployees(employeeName,email);
        
        if(lstToAdd.size()>0){
            system.debug('Duplicated employee record detected');
        } else{
            Employee__c emp=new Employee__c();
            emp.Employee_Name__c=employeeName;
            emp.Email__c=email;
            emp.Gender__c=gender;
            emp.Salary__c=salary;
            if(position==''){
                emp.Position__c='Others';
                 }else{
                    emp.Position__c=position; 
                       }
                 if(position!='Head Department' && salary>80000 ){
                    system.debug('Salary should be less than 80000 for the position');
                      } else {
            empToAdd.add(emp);
            system.debug('Employee record successfully inserted'+empToAdd.size());
            }
        }
        insert empToAdd;
        
    }
   
    
    public List<Employee__c> queryEmployees(string employeeName,string email){
        List<Employee__c> empList=[SELECT 
                                   Id,Employee_Name__c,Email__c 
                                   FROM 
                                   Employee__c 
                                   WHERE Email__c=:email];
     return empList;
    
    }
    public void updateEmployee(string employeeName,string email,string position,string gender,decimal salary){
        this.employeeName=employeeName;
        this.email=email;
        this.position=position;
        this.gender=gender;
        this.salary=salary;
        List<Employee__c> empToUpdate=new  List<Employee__c>();
        
        List<Employee__c> lstToUpdate=queryEmployees(employeeName,email);
         if(lstToUpdate.size()==0){
            system.debug('No employee record detected to Update');
        } 
        for(Employee__c d:lstToUpdate){
            if(d.Email__c==email){
            d.Employee_Name__c=employeeName;
            d.Email__c=email;
            d.Gender__c=gender;
            d.Position__c=position;
            d.Salary__c=salary;
            empToUpdate.add(d);
            system.debug('The Records are Updated');    
                
            }
            update empToUpdate;
        }
    }
    public void deleteEmployee(string email){
        this.email=email;
        list<Employee__c> depToDelete=new list<Employee__c>();
        
         List<Employee__c> lstToDelete=queryEmployees(employeeName,email);
        
        if(lstToDelete.size()==0){
            system.debug('No Records Available to Delete');
        } else {
        for(Employee__c d:lstToDelete){
            depToDelete.add(d);
        }
            
        }
        delete depToDelete;
        system.debug('The records are deleted');
    }
    
    public void maxSalary(string position){
        this.position=position;
        List<AggregateResult> maxSalaryPosition=[SELECT 
                                                 MAX(Salary__c) MaximumSalary 
                                                 FROM Employee__c 
                                                 WHERE 
                                                 Position__c=:position];
   
        system.debug('Maximum salary in  '+position+'  is  '+maxSalaryPosition);
    
}
    public void positionSalary(string position){
        this.position=position;
        List<AggregateResult> maxminSalaryPosition=[SELECT 
                                                    MAX(Salary__c) MaxSalary,MIN(Salary__c) MinSalary
                                                    FROM 
                                                    Employee__c
                                                    WHERE Position__c=:position ];
                  system.debug('The  '+position+'  position '+maxminSalaryPosition);
      
        
    }

}