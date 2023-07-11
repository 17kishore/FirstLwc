public class Cmt {
    public static void countWords(String words){
       List<String> wordsList=words.split(' ');
       Set<String> wordsSet=new Set<String>(wordsList);
        List<integer> times=new List<integer>();
         List<string> names=new List<string>();
      Map<String,Integer> wordsMap=new Map<String,Integer>();
        
        for(String str1:wordsSet){
            Integer count=0;
           for(String str2:wordsList)
               if (str1==str2)
                   count+=1;
           times.add(count);
           names.add(str1);
           }
        for(integer i:times){
            system.debug(i);
        }
   }

}