public class AllOpportunity{
    
    public integer amount,countStage;
    public string stage,leadSource;
    public  string name;
    public static decimal sumOfAmount=0;
    
    public static void allOpportunity(){
        list<Opportunity> opp=[
                               SELECT
                               Id ,Name
                                FROM
                               Opportunity
                               ];
        if(opp.size()==0){
            system.debug('No Opportunity to Show');
        }
        for(Opportunity p:opp){
            system.debug(p);
        }
}
    public static void greaterAmount(integer amount){
        List<Opportunity> opp=[SELECT 
                               Id,Name,Amount 
                               FROM 
                               Opportunity 
                               WHERE Amount>=:amount];
        for(opportunity p:opp){
            system.debug(p);
        }
        }
    public static void countStage(string stage){
         List<Opportunity> opp=[SELECT 
                                Id,Name,StageName 
                                FROM 
                                Opportunity
                                WHERE StageName=:stage];
        if(opp.size()==0){
            system.debug('No opportunities Exists in this Stage');
        } 
        else{
            system.debug('No of opportunity in this stage' +stage+ ':'+opp.size());
        }
        }
    public static void specStage(string stage,string LeadSource){
          List<Opportunity> opp=[SELECT 
                                Id,Name,StageName,LeadSource
                                FROM 
                                Opportunity WHERE StageName=:stage AND LeadSource=:leadSource];
        if(opp.size()==0){
            system.debug('No Opportunity in Selected Stagename and Leadsource');
        } else{
            for(opportunity p:opp)
            system.debug(p);
        }
    }
     public static void specName(string name){
       List<Opportunity> opp=[SELECT 
                              Id,Name 
                              FROM 
                              Opportunity 
                              WHERE Name LIKE :'%'+name+'%'];
        if(opp.size()==0){
            system.debug('No Opportunity in Selected Name');
        } else{
            for(opportunity p:opp)
            system.debug(p);
        }
    }
    public Static  void sumAmount(string stage){
        List<Opportunity> opp=[SELECT 
                               Id,Name,StageName,Amount 
                               FROM 
                               Opportunity
                               WHERE StageName=:stage AND Amount!=NULL];
        if(opp.size()==0){
            system.debug('No opportunities to sum Amount in Specific Stage');
        } 
        for(Opportunity p:opp){
            sumOfAmount=sumOfAmount+p.Amount;
             }
        system.debug(sumOfAmount);
        }
        }