public class BatchableMarketUpdate implements Database.Batchable<sObject> {
    
    List<string> marketWithErrors=new List<string>();
    List<string> zoneWithErrors=new List<String>();
    string orgUrl=URL.getSalesforceBaseUrl().toExternalForm();

    public Database.QueryLocator start(Database.BatchableContext bc){
        
        string query='select Market__c,Market_Code__c from Store__c where Market_Code__c!=Null And Market__c=Null';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext bc,List<Store__c> listStores){
        
         Map<string,Id> marketRecordId =BatchableMarketUpdate.getMarketRecordIds(listStores);
        
        List<Store__c> storeToUpdate=new List<Store__c>();
        for(Store__c store:listStores){
            store.Market__c=marketRecordId.get(store.Market_Code__c);
            storeToUpdate.add(store);
        }
        List<Database.SaveResult> errorMarketRecords=Database.update(storeToUpdate,false);
        
        for(Database.SaveResult sr:errorMarketRecords){
            if(!sr.isSuccess()){
               marketWithErrors.add(orgUrl+'/'+sr.getId()); 
            }
          }
 }
    
    public void finish(Database.BatchableContext bc){
        
        if(marketWithErrors.size()>0){
            
        List<string> emailId=new List<string>{system.Label.Batch_Email_Id};
        string subject='Updated Failed Error in Market Records';
        string plainTextBody='The Following Market Records are Failed to update: \n';
        for(string lcc:marketWithErrors){
            plainTextBody+=lcc + '\n';
        }
        EmailUtilityFromBatch.sendEmailToOwner(emailId,subject,plainTextBody); 
     }
 }
    public static Map<string,Id> getMarketRecordIds(List<Store__c> listStores) {
        
        set<string> setMarketCodes=new set<String>();
        Map<string,Id> marketRecordId=new Map<string,Id>();
        List<Market__c> marketToInsert=new List<Market__c>();
        
        for(Store__c marketCode:listStores){
            setMarketCodes.add(marketCode.Market_Code__c);
        }
        
        for(Market__c marketRec:[Select Name from Market__c Where Name In:setMarketCodes]){ 
            marketRecordId.put(marketRec.Name,marketRec.Id);
            setMarketCodes.remove(marketRec.Name);
        }
       
        for(string val:setMarketCodes){
            marketToInsert.add(new Market__c(Name=val));
        }
        List<Database.SaveResult> errorMarketRecords=Database.insert(marketToInsert,false);
        
        for(Market__c marketRec:[Select Id,Name from Market__c where Name IN:setMarketCodes]){ 
            marketRecordId.put(marketRec.Name,marketRec.Id);
        }
        
        return marketRecordId;
     }
}