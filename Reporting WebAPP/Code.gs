


var u = ScriptApp.getService().getUrl();
var date = new Date();
var dateM = new Date().getTime();
var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
var date1 = new Date(new Date().getTime()+(4*24*60*60*1000));
var current_date1 = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
var email = Session.getEffectiveUser().getEmail();

    var LDAP = email.split('@')[0];
var Route = {};
Route.path = function(route,callback){
Route[route] = callback;
}


 function doGet(e){
   Route.path("LandingPage",loadLandingPage);
  Route.path("Reports",loadReports);
  Route.path("Reported",loadReported);
if(Route[e.parameters.v]) {
return Route[e.parameters.v]();
} else {
return render("LandingPage");
}
}

    var url ="https://docs.google.com/spreadsheets/d/1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc/edit#gid=69383900";
    var ss1 =SpreadsheetApp.openByUrl(url);
    var ws1 = ss1.getSheetByName("Info table 2");
    var data1 =ws1.getRange(1,1,ws1.getLastRow(),1).getValues();
    var ldaplist = data1.map(function(r){ return r[0];});
    var position = ldaplist.indexOf(LDAP);
    var name = ws1.getRange(position+1, 2).getValue();
    var htmlname = name;


  function render(file, argsObject) {
  var temp = HtmlService.createTemplateFromFile(file);
  if (argsObject) {
    var keys = Object.keys(argsObject);
    keys.forEach(function(key) {
      temp[key] = argsObject[key];
    });
  }
  return temp.evaluate()
    .setTitle(file)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    ;
}
function loadLandingPage(){
return render("LandingPage",{ name: htmlname });

}

function loadReports(){
  
return render("Reports",{name: htmlname });

}

function loadReported(){
  
return render("Reported",{name: htmlname });

}

function include (filename){
  return render(filename).getContent();
 
}

function userclicked(info){

var encrypted = Utilities.base64Encode(LDAP);
var truncated = encrypted.substring(0, 5);

var date = new Date();

var minutes = date.getMinutes().toString().padStart(2, '0');


var seconds = date.getSeconds().toString().padStart(2, '0');

var timeString = minutes + seconds;

 var uniqueID = timeString+dateM+truncated ;
 var status = "Open";
var ss2 = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc/edit#gid=69383900");
var ws2 = ss2.getSheetByName("Info table 1");
var data2 =ws2.getRange(1,1,ws2.getLastRow(),1).getValues();
var plist = data2.map(function(r){ return r[0];});
var cnrtype = info.cnrtype;
var cnrinfo = info.cnrinfo;
var position = plist.indexOf(cnrtype);
var Per = ws2.getRange(position+1, 2).getValue();

if (Per == 'P0'){
var colnum = 3;
}else{
var colnum = 2;
}

var ws3 = ss2.getSheetByName("L1/L2");
var ws4 = ss2.getSheetByName("date table ");
var data3 =ws3.getRange(1,1,ws3.getLastRow(),1).getValues();
var assigned = data3.map(function(r){ return r[0];});
var position = assigned.indexOf(LDAP);
var assignedto = ws3.getRange(position+1, colnum).getValue();
console.log(assignedto);
var ss =SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc/edit#gid=69383900");
var ws = ss.getSheetByName("data");  
   ws.appendRow([uniqueID,dateM,LDAP,info.cnrtype ,info.cnrinfo, Per,assignedto,status]);
   
var email = Session.getEffectiveUser().getEmail();

var email2 = assignedto+"@gmail.com";

var subject = 'Your Report has been submitted '+ "||" + "Report ID:" + uniqueID ;

var subject2 =  'URGENT ACTION REQUIRED: A Report has been Reported '+"|| " +  "Report ID:" + uniqueID ;

var body = 'if y//ou recieved this email please reach out to @Questions. Thank you'+' '+email;
 
var htmlTemplate = HtmlService.createTemplateFromFile('email');
        htmlTemplate.LDAP = LDAP; 
        htmlTemplate.uniqueID = uniqueID; 
        htmlTemplate.cnrtype = cnrtype; 
        htmlTemplate.cnrinfo = cnrinfo; 
        htmlTemplate.newDate = new Date(new Date().getTime()+(4*24*60*60*1000));;
var htmlBody =  htmlTemplate.evaluate().getContent();

GmailApp.sendEmail(email, subject, body,{ htmlBody: htmlBody ,noReply: true});

var htmlTemplate2 = HtmlService.createTemplateFromFile('email2');
        htmlTemplate2.LDAP = LDAP; 
        htmlTemplate2.uniqueID = uniqueID; 
        htmlTemplate2.newDate = new Date(new Date().getTime()+(4*24*60*60*1000));;
var htmlBody2 =  htmlTemplate2.evaluate().getContent();

GmailApp.sendEmail(email2, subject2, body,{ htmlBody: htmlBody2 ,noReply: true});     


}
