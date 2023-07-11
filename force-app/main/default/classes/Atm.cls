public class Atm {
    
    public integer curbal=50000;
    public integer withdrawl;
    public integer deposit;
    
    public void withdrawl(integer withdrawl){
        if(withdrawl>0){
        system.debug('current balance:'+this.curbal);
        this.withdrawl=withdrawl;
        curbal = curbal- this.withdrawl;
        printSection();
        system.debug('Entered option-1');
        system.debug('Entered amount:'+this.withdrawl);
        system.debug('current balance:'+curbal);
            
        } else if(withdrawl>curbal){
            system.debug('Enter small Amount than current balance your current balance is:'+curbal);
            
        } else {
            system.debug('enter an amount greater than zero');
            
        }
    }
    public void deposit(integer deposit){
        if(deposit!=0 && deposit>0){
            system.debug('current balance:'+curbal);
            this.deposit=deposit;
            curbal=curbal+deposit;
       printSection();
        system.debug('Entered option-2');
        system.debug('Entered amount:'+this.deposit);
        system.debug('After Deposit:'+curbal);
            
        } else{
            system.debug('Enter an Valid Amount to be deposit');
        }
    }
    public void printSection(){
        system.debug('1-withdrawal');
        system.debug('2-deposit');
    }
    

}