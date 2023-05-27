
function gettasks()
{
var sheet = SpreadsheetApp.openById('1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc');
  var regionSheet = sheet.getSheetByName("data");
  var regionRange = regionSheet.getDataRange();
  var data = regionRange.getValues(); 
 //console.log(data);
  // Filter the data based on multiple criteria
  var filteredData = data.filter(function(row) {
    return (row[6] == LDAP) && (row[7] == 'Open' || row[7] == 'In Progress');
});
console.log(filteredData );
console.log(LDAP );
  var regionValues = filteredData ;
console.log(data);
console.log(filteredData);
  return regionValues;
}
function getCaseData(caseId) {
  // Open the sheet and get the sheet that contains the data
  var sheet = SpreadsheetApp.openById("1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc").getSheetByName("data");
  // Get the values from the first column of the sheet, which are the case IDs
  var data = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
  var caseIdList = data.map(function(r){ return r[0];});
  // Find the position of the case ID in the list
  var position = caseIdList.indexOf(caseId);
  // Get the data for the case from the sheet using the position
  var casen = sheet.getRange(position+1, 1).getValue();
  var Reportedby  = sheet.getRange(position+1, 3).getValue();
  var Category  = sheet.getRange(position+1, 4).getValue();
  var Details  = sheet.getRange(position+1, 5).getValue();
  var P  = sheet.getRange(position+1, 6).getValue();
  var status = sheet.getRange(position+1, 8).getValue();
var date = sheet.getRange(position+1, 10).getValue();
//var datestring = date.toLocaleDateString();
  // Return the data as an object
  return {
    casen: casen,
    Reportedby: Reportedby,
    Category: Category,
    Details: Details,
    P: P,
    status: status,
    date:date
  };
}
 function updateStatus1(status, comment, caseId,Reportedby) {
  // Get the current date
  var daten = new Date();
  var dateString = daten.toLocaleDateString();
  var caseID = caseId;
  var Reportedby1 = Reportedby;
  // Update the status, comment, and date fields in the spreadsheet
  // Replace "Sheet1" with the name of your sheet
  var sheet = SpreadsheetApp.openById("1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc").getSheetByName("data");
  var data1 = sheet.getRange(1,1,sheet.getLastRow(),1).getValues();
  var caseIdlist = data1.map(function(r){ return r[0];});
  var position = caseIdlist.indexOf(caseId);
  sheet.getRange(position+1, 8).setValue(status);
  sheet.getRange(position+1, 9).setValue(comment);
  sheet.getRange(position+1, 10).setValue(new Date().getTime());
  sheet.getRange(position+1, 11).setValue(LDAP);
  // Send an email to the user's email address
  var email4= Session.getActiveUser().getEmail();
  var email3 = Reportedby1+"@gmail.com";
  var subject3 = 'Status Update Regarding your Report '+ "||" + "Report ID:" + caseID ;
  var subject4 =  'NO ACTION REQUIRED: A Concern status  has been Updated '+"|| " +  "Report ID:" + caseID ;
  var body = 'if you recieved this email please reach out to @Questions. Thank you'+' '+email;
  var htmlTemplate3 = HtmlService.createTemplateFromFile('email3');
  htmlTemplate3.caseID = caseID; 
  htmlTemplate3.date = new Date();
  htmlTemplate3.status = status;
  var htmlBody3 =  htmlTemplate3.evaluate().getContent();
 GmailApp.sendEmail(email3, subject3, body,{ htmlBody: htmlBody3 , noReply: true });
var htmlTemplate4 = HtmlService.createTemplateFromFile('email4');
       htmlTemplate4.status = status;
       htmlTemplate4.LDAP = LDAP; 
       htmlTemplate4.ReportID = caseID; 
       htmlTemplate4.date = new Date();
var htmlBody4 =  htmlTemplate4.evaluate().getContent();
  GmailApp.sendEmail(email4, subject4, body,{ htmlBody: htmlBody4 });
 }
