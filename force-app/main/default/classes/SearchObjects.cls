public class SearchObjects{
    public string StrObject;
    public List<string> strFields;
    public string searchField;
    public string operator;
    public string value;
   
    public integer searchRecords(string StrObject,List<string> strFields){
        this.StrObject=StrObject;
        this.strFields=strFields;
        List<sObject> lstObject=database.query('SELECT ' +string.join(strFields,',')+ ' FROM ' +StrObject); 
        for(sObject s:lstObject){
            system.debug(s.get('Name'));
        }
         return lstObject.size();
    }
    public List<sObject> searchRecordsFilter(string StrObject,List<string> strFields,string searchField,string operator,string value){
        this.StrObject=StrObject;
        this.strFields=strFields;
        this.searchField=searchField;
        this.operator=operator;
        this.value=value;
        if(value.isNumeric()){
        List<sObject> lstObject=database.query('SELECT ' +string.join(strFields,',')+ 
                                                ' FROM ' +StrObject+ 
                                                ' WHERE '+searchField+operator+value); 
            for(sObject s:lstObject){
            system.debug(s.get('Name'));
      }
            return lstObject;
      }  else{
         List<sObject> lstObject=database.query('SELECT ' +string.join(strFields,',')+ 
                                                ' FROM ' +StrObject+ 
                                                ' WHERE '+searchField+operator+':value'); 
            
            for(sObject s:lstObject){
            system.debug(s.get('Name'));
      }
        return lstObject;
      }   
       
}
}