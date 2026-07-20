// ============================================================
// LESSONS WEB APP - Google Apps Script
// Attach this to the main student spreadsheet:
// https://docs.google.com/spreadsheets/d/1e2ppEZlcrZENPHMMyIAtNxqCvqHnxCl_FuR3NUX046I
//
// DEPLOY INSTRUCTIONS:
// 1. Open the spreadsheet → Extensions → Apps Script
// 2. Paste this code, replacing any existing code
// 3. Click Deploy → New deployment
// 4. Type: Web app
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Click Deploy and copy the Web App URL
// 8. Paste that URL into Template.html where it says LESSONS_SCRIPT_URL
// ============================================================

const SPREADSHEET_ID = '1e2ppEZlcrZENPHMMyIAtNxqCvqHnxCl_FuR3NUX046I';
const LESSONS_SHEET_NAME = 'Lessons';
const STUDENT_NAME_COLUMN = 2; // Column B

function doGet(e) {
  try {
    const studentName = e.parameter.studentName;
    const lessonUrl   = e.parameter.lessonUrl;

    if (!studentName || !lessonUrl) {
      return respond({ success: false, error: 'Missing studentName or lessonUrl' });
    }

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(LESSONS_SHEET_NAME);

    if (!sheet) {
      return respond({ success: false, error: 'Sheet "' + LESSONS_SHEET_NAME + '" not found' });
    }

    // Find the student's row (names are in column B)
    const lastRow  = sheet.getLastRow();
    const names    = sheet.getRange(1, STUDENT_NAME_COLUMN, lastRow, 1).getValues();
    let studentRow = -1;

    for (let i = 0; i < names.length; i++) {
      if (names[i][0].toString().trim().toLowerCase() === studentName.trim().toLowerCase()) {
        studentRow = i + 1; // 1-indexed
        break;
      }
    }

    if (studentRow === -1) {
      return respond({ success: false, error: 'Student not found: ' + studentName });
    }

    // Find next empty column starting from column C (index 3)
    let nextCol = 3;
    while (sheet.getRange(studentRow, nextCol).getValue() !== '') {
      nextCol++;
    }

    sheet.getRange(studentRow, nextCol).setValue(lessonUrl);

    return respond({ success: true });

  } catch (err) {
    return respond({ success: false, error: err.toString() });
  }
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
