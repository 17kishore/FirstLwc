public class Department{
    
    public string departmentName;
    public integer employees;
    public string headQuarters;
    
    
     public list<Department__c>  queryDepartment(string departmentName){
         list<Department__c> depList=[SELECT 
                                     Id,Department_Name__c,Head_Quarters__c,Employees__c
                                     FROM 
                                     Department__c
                                     WHERE Department_Name__c =:departmentName];
        return depList;
    }

    
    public void addDepartment(string departmentName,integer employees,string headQuarters){
        this.departmentName=departmentName;
        this.employees=employees;
        this.headQuarters=headQuarters;
        list<Department__c> depToAdd=new list<Department__c>();
        
       list<Department__c>  lstToAdd=queryDepartment(departmentName);
        
           if(lstToAdd.size()>0) {
               system.debug('Already Department is there');
                 } else {                 
                    Department__c dep=new Department__c();
                    dep.Department_Name__c =departmentName;
                    dep.Employees__c=employees;
                    dep.Head_Quarters__c=headQuarters;
                    depToAdd.add(dep);
                    system.debug('Record successfully inserted');
                    }
        insert depToAdd;
        
          }
    public void updateDepartment(string departmentName,integer employees,string headQuarters){
        this.departmentName=departmentName;
        this.employees=employees;
        this.headQuarters=headQuarters;
          list<Department__c> depToUpdate=new list<Department__c>();
    
         list<Department__c>  lstToUpdate=queryDepartment(departmentName);
         if(lstToUpdate.size()==0){
            system.debug('No Records Available to update');
         }   
           for(Department__c d:lstToUpdate){
               if(d.Department_Name__c==departmentName){
                  d.Department_Name__c =departmentName;
                  d.Employees__c=employees;
                  d.Head_Quarters__c=headQuarters;
                  depToUpdate.add(d);
                  system.debug('The Records are Updated');
                   
               }
               update  depToUpdate;
    }
      
}

   public void deleteDepartment(string departmentName){
         this.departmentName=departmentName;
       list<Department__c> depToDelete=new list<Department__c>();
       
       list<Department__c>  lstToDelete=queryDepartment(departmentName);
       
       if(lstToDelete.size()==0){
            system.debug('No Records Available to Delete');
       } else {  
         for(Department__c d:lstToDelete){
             depToDelete.add(d);
             }
       }
       delete depToDelete;
       system.debug('Records was Successfully Deleted');
}

   public void searchDepartment(string departmentName){
        this.departmentName=departmentName;
        list<Department__c>  lstToSearch=queryDepartment(departmentName);
       
       if( lstToSearch.size()==0){
           system.debug('No Records Available');
       } else {
       for(Department__c d:lstToSearch){
           system.debug('The Department Name:'+d.Department_Name__c+',number of Employess='+d.Employees__c+',Head Quaters='+d.Head_Quarters__c);
       }
       }
       
   }
       public void lessEmpDepartment(){
           List<AggregateResult> lessEmp=[SELECT 
                                       MIN(Employees__c) MinimumEmployees
                                       FROM Department__c
                                          ];
                            
             system.debug(lessEmp);
          }
        }