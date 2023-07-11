@isTest
public class TestSearchObjects {

    @TestSetup
    public static void Load_Data(){
        List<Account> LstAccount=new List<Account>();
        Account acc1=new Account();
        acc1.Name='Test 1';
        acc1.AnnualRevenue=100000;
        Account acc2=new Account();
        acc2.Name='test 2';
        acc2.AnnualRevenue=200000;
        LstAccount.add(acc1);
        LstAccount.add(acc2);
        insert LstAccount;
        }
    @isTest
    public static void doDmlTest(){
        SearchObjects sr= new SearchObjects();
        List<string> str1=new List<String>();
        str1.add('Id');
        str1.add('Name');
        integer acc=sr.searchRecords('Account',str1);
        system.assertEquals(2,acc,'Size Differs');
        
       List<sObject> r=sr.searchRecordsFilter('Account',str1,'AnnualRevenue','>','100');
       system.assertEquals(2,r.size(),'Size Differs');
       
       r=sr.searchRecordsFilter('Account',str1,'Name','=','Test 1');
       system.assertEquals(1,r.size(),'Size Differs');
    }
}