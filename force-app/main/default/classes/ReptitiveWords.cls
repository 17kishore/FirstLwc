/********************************************************************
 * Class Name: Repititive Words in the sentence
 * Created by: kishore v
 * Created on: 3/12/22
 * use of Class: To count the Words and Repititive Sentence 
 * ******************************************************************/
public class ReptitiveWords{
   public static void countWords(String words){
       if(string.isEmpty(words)){
            system.debug('The words are empty so count of words is not possible'); 
        } 
       else{
       words= words.toLowerCase();
       List<String> wordsList=words.normalizespace().split(' ');
       Set<String> wordsSet=new Set<String>(wordsList);
       Map<String,Integer> wordsMap=new Map<String,Integer>();
           
        for(String str1:wordsSet){
              Integer count=0;
            for(String str2:wordsList){
                if (str1.equals(str2)){
                   count+=1;
                   wordsMap.put(str1, count);
           }
      }
 }
        System.debug('The count of words and Reptitive Words:'+wordsMap);  
       }
   }
}