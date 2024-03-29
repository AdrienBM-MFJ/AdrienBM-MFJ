function MonthlyReport() {
  var SS = SpreadsheetApp.getActive().getSheetByName('MonthlyReport');
  
  // GUI for Lori to input month and year
  var ui = SpreadsheetApp.getUi();
  
  var monthPicker = ui.prompt('MFJ Harvest Reports', 'Select month:', ui.ButtonSet.OK);
  var yearPicker = ui.prompt('MFJ Harvest Reports', 'Select year (YYYY):', ui.ButtonSet.OK);

  if (monthPicker.getSelectedButton() == ui.Button.OK && yearPicker.getSelectedButton() == ui.Button.OK) {
    var selectedMonth = Number(monthPicker.getResponseText()); // Convert to numeric format
    var selectedYear = yearPicker.getResponseText();
    
    // Check if the conversion was successful
    if (isNaN(selectedMonth) || selectedMonth < 1 || selectedMonth > 12) {
      ui.alert('Invalid month selection. Please enter a valid month (1-12).');
      return;
    }

    // Construct the DateFrom and DateTo strings based on the selected month and year
    console.log(selectedMonth, selectedYear)
    var DateFrom = formatDate(selectedYear, selectedMonth, 1);
    console.log(DateFrom)
    var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    console.log(daysInMonth)
    var DateTo = formatDate(selectedYear, selectedMonth, daysInMonth);
    console.log(DateTo)
  } else {
    ui.alert('Invalid month or year selection. Please try again.');
    return;
  }
    // Harvest API:
    var url = 'https://api.harvestapp.com/v2/time_entries?from=' + DateFrom + '&to=' + DateTo;
    //var accessToken = "1329445.pt.P5A-Fuj9_iXUxLpP5X787r1FF038oZl1BC-r7H2YVOpdXDA1fuV7sYQmA4B47Vx_uC6uAKsGd8aTXVMwAsGcGg";  // Charles Teese
    var accessToken = "2610172.pt.0dd_EwdooBbw_qFMhmQ24wPBrRUGxrEGtGH5y4mrNiUP51OyJzKC-64Y8rcKZDdBZBE6yMGja_HqfNu3TpdRpQ";    // Ryan Belair (ryan.belair is name of access token)
    var accountID = "586244";
    var headers = {
      "User-Agent": "RyanBelair (ryan.belair@mfj.io)",    // WAS: "CharlesTeese (charles.teese@mfj.io)"
      "Authorization": "Bearer "+ accessToken,
      "Harvest-Account-ID": accountID,
    };
    var options = {
      "method": "get",
      "headers": headers
    };
    var response = UrlFetchApp.fetch(url, options);
    var data = response.getContentText();
    var CleanArray = JSON.parse(data)
    var TotalPages = CleanArray.total_pages
    Logger.log(TotalPages)
    CellCounter = 2
    for (var j = 0; j < TotalPages; ++j){   
      var CleanData = CleanArray.time_entries 
      for (var i = 0; i < CleanData.length; ++i){
        SS.getRange('A'+CellCounter).setValue(CleanData[i].spent_date)
        SS.getRange('B'+CellCounter).setValue(CleanData[i].user.name)
        SS.getRange('F'+CellCounter).setValue(CleanData[i].hours)
        SS.getRange('D'+CellCounter).setValue(CleanData[i].project.name)
        SS.getRange('E'+CellCounter).setValue(CleanData[i].task.name)
        SS.getRange('C'+CellCounter).setValue(CleanData[i].client.name)
        SS.getRange('G'+CellCounter).setValue(CleanData[i].is_closed)
        CellCounter++
      }
      var NextPage = CleanArray.links.next
      Logger.log(NextPage)
      if (NextPage == null){
        break
      }
      var response = UrlFetchApp.fetch(NextPage, options);
      var data = response.getContentText();
      var CleanArray = JSON.parse(data)
      
    }
    var LastRow = SS.getLastRow()
    Logger.log(LastRow)

    // Get working hours in month:
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('REF')
    var range = sheet.getRange('A2:A13').getValues()
    for (var k = 0; k < range.length; ++k){
      if (range[k] == selectedMonth){
        var row = (k+2)
        Logger.log(row)
        
        // Change B to location of new year:
        var workingHours = sheet.getRange('B'+row).getValue()
        Logger.log(workingHours)
        var pivotSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pivot')
        var pivotRange = pivotSheet.getRange('F2:F').getValues()
        var cellCounter = 2
        for (var l = 0; l < pivotRange.length; ++l){
          pivotSheet.getRange('F'+cellCounter).setFormula('=E'+cellCounter+'/'+workingHours)
          cellCounter++
  
        }
  
      }
  
  
    }
  }
// Function to format date in yyyy-mm-dd
function formatDate(year, month, day) {
  month = ('0' + month).slice(-2); // Ensure month is two digits
  day = ('0' + day).slice(-2); // Ensure day is two digits
  return year + '-' + month + '-' + day;
}