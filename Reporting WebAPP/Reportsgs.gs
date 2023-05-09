

function getconcerns()
{


  var sheet = SpreadsheetApp.openById('1YT44Sxrr7pnm7GRD2UzZwMNbzRkzXBjwMlpceW0KnMc');
  var regionSheet = sheet.getSheetByName("data");
  var regionRange = regionSheet.getDataRange();
  var data = regionRange.getValues(); 
 //console.log(data);
  // Filter the data based on multiple criteria
  var filteredData = data.filter(function(row) {
    return (row[2] == LDAP);

});
console.log(filteredData );
console.log(LDAP );
  var regionValues = filteredData ;
console.log(data);
console.log(filteredData);
  return regionValues;

}


function getCaseData2(caseId) {
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
   

  
