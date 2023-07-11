public class BatchableZoneUpdate implements Database.Batchable<sObject> {
    
    List<string> storeWithErrors=new List<string>();
    string orgUrl=URL.getSalesforceBaseUrl().toExternalForm();

    public Database.QueryLocator start(Database.BatchableContext bc) {
        
        string query = 'select Zone__c,Zone_Code__c from Store__c where Zone_Code__c!=Null And Zone__c=Null';
        return Database.getQueryLocator(query);
    }

    public void execute(Database.BatchableContext bc, List<Store__c> listStores) {
        
        Map<string,Id> zoneRecordId =BatchableZoneUpdate.getZoneRecordIds(listStores);

        List<Store__c> storeToUpdate = new List<Store__c>();
        for(Store__c store: listStores) {
            store.Zone__c = zoneRecordId.get(store.Zone_Code__c);
            storeToUpdate.add(store);
        }
        List<Database.SaveResult> errorStoreRecords=Database.update(storeToUpdate,false);
        
        for(Database.SaveResult sr:errorStoreRecords){
            if(!sr.isSuccess()){
               storeWithErrors.add(orgUrl+'/'+sr.getId()); 
            }
        }
 }

    public void finish(Database.BatchableContext bc) {
        
        if(storeWithErrors.size()>0){
            
        List<string> emailId=new List<string>{system.Label.Batch_Email_Id};
        string subject='Updated Failed Error in Store Records';
        string plainTextBody='The Following Store Records are Failed to update: \n';
        for(string lcc:storeWithErrors){
            plainTextBody+=lcc + '\n';
        }
        EmailUtilityFromBatch.sendEmailToOwner(emailId,subject,plainTextBody); 
     }
 }
    public static Map<string,Id> getZoneRecordIds(List<Store__c> listStores) {
        
     set<string> setZoneCodes = new set<String>();
     Map<string,Id> zoneRecordId = new Map<string,Id>();
     List<Zone__c> zoneToInsert = new List<Zone__c>();
        
     for(Store__c store: listStores) {
        setZoneCodes.add(store.Zone_Code__c);
    }

    for(Zone__c zoneRec: [Select Id, Name from Zone__c Where Name In: setZoneCodes]) {
        zoneRecordId.put(zoneRec.Name, zoneRec.Id);
        setZoneCodes.remove(zoneRec.Name);
    }

    for(string val: setZoneCodes) {
        zoneToInsert.add(new Zone__c(Name=val));
    }
     List<Database.SaveResult> errorZoneRecords=Database.insert(zoneToInsert,false);

    for(Zone__c zoneRec: [Select Id, Name from Zone__c Where Name IN: setZoneCodes]) {
        zoneRecordId.put(zoneRec.Name, zoneRec.Id);
    }

    return zoneRecordId;
    }
}