// this's the code.gs file in this code the appscript will access the googlesheet file and search for unique names in the tables in the google sheet file and map the tables 
and push the tables (4 tables in this case ) to the html templete file  


//All variables used to generate the Data
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_hour = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds() ;
    var hour = date.getHours();
    var url ="Sheet url"; //Replace Sheet url with your file url 
    const ss    = SpreadsheetApp.openByUrl(url);
    const ws    = ss.getSheetByName("tab1");
    const ws1   = ss.getSheetByName("configtab");

//Table range used t define the table rage 

const T1 = ws.getRange("range").getDisplayValues(); //Range for the file table , replace range with A1notation 
//end of table range 

//Table range 
const T2D = ws.createTextFinder("unique name "); //replace unique name  with a unique header from your table 
T2D.matchEntireCell(true) .matchCase(false);
const T2region = T2D.findNext();
const T2datarange = T2region.getDataRegion();
const T2 = T2datarange.getValues();

//end of table range 

//Table range 
const T3D = ws.createTextFinder("unique name");  //replace unique name  with a unique header from your table 
T3D.matchEntireCell(true) .matchCase(false);
const T3region = T3D.findNext();
const T3datarange = T3region.getDataRegion();
const T3 = T3datarange.getValues();

//end of table range 

//Table range 
//const T4D = ws.createTextFinder("unique name"); //replace unique name  with a unique header from your table 
//T4D.matchEntireCell(true) .matchCase(false);
//const T4region = T4D.findNext();
//const T4datarange = T4region.getDataRegion();
//const T4 = T4datarange.getValues();

//end of table range 

       const htmlTemplate = HtmlService.createTemplateFromFile("reporttemplate");
       htmlTemplate.T1 = T1;
       htmlTemplate.T2 = T2;
       htmlTemplate.T3 = T3;
       htmlTemplate.T4 = T4;
       
      //Mailing list 
       var email   =     ws1.getRange("C4").getValue(); // use a cell to refrence the email you want  to send your report to  exp: c4 where u will write your email 
       var ccemail  =     ws1.getRange("C5").getValue(); // use a cell to refrence the cc emails you want  to send your report to  exp: c4 where u will write your email 

      
       // Title 
       var subject = "My report  | "+ current_date; // Title of your email or report 
       var htmlForEmail= htmlTemplate.evaluate().getContent();
function sendme(){   // this function will help you automate the email in spesific hours range for exmpale here fro 7 am to 11 pm 
if(hour > 7 && hour < 23 ){

//Execute sendemail

     GmailApp.sendEmail(email,subject, "Please read it",{
                     
                     htmlBody: htmlForEmail,cc : ccemail , noReply: true 
                      });
                      }else{
                 
 GmailApp.sendEmail("youremail@email.com",subject,"Please read it "+hour); // replace youremail@email.com with your email to recive an email in case the excution is not send (hours when u den't need to send email )
                     

}
}
