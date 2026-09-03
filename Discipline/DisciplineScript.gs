// ============================================================
// STUDENT DISCIPLINARY WEB APP - Google Apps Script
// Attach this to the disciplinary spreadsheet:
// https://docs.google.com/spreadsheets/d/1U37diEkPAAupol2Yg0ahOAOSGKN8DkI_av6LdhP-p7I
//
// DEPLOY INSTRUCTIONS:
// 1. Open the spreadsheet -> Extensions -> Apps Script
// 2. Paste this code, replacing any existing code
// 3. Click Deploy -> New deployment
// 4. Type: Web app
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Click Deploy and copy the Web App URL
// 8. Paste that URL into Discipline.html where it says SCRIPT_URL
//    (or open the app, tap the gear icon, and paste it there)
//
// The app talks to this script with plain GET requests (no CORS
// pre-flight), matching the pattern already used elsewhere in this
// project.
//
//   ?mode=roster                          -> returns the student list
//   ?mode=record&class=8A&name=...&action=Warning
//                                         -> ticks the matching column
//                                            TRUE and writes a Log row
// ============================================================

const SPREADSHEET_ID = '1U37diEkPAAupol2Yg0ahOAOSGKN8DkI_av6LdhP-p7I';
const ROSTER_SHEET_NAME = 'Sheet1'; // change if your tab has another name
const LOG_SHEET_NAME = 'Log';

// Column positions in the roster sheet (1-indexed)
const COL_CLASS = 1; // A
const COL_NAME = 2; // B
const COL_IMAGE = 3; // C
const COL_WARNING = 4; // D
const COL_MOVE_SEATS = 5; // E
const COL_INCIDENT = 6; // F

// Maps the action name coming from the app to its column
const ACTION_COLUMNS = {
  'Warning': COL_WARNING,
  'Move Seats': COL_MOVE_SEATS,
  'Incident': COL_INCIDENT
};

// ------------------------------------------------------------------
// ACCESS PIN
// Every request from the app must carry ?pin=<this value> or it is
// rejected. Change this string to change the PIN, then redeploy
// (Deploy -> Manage deployments -> edit -> New version -> Deploy).
// Keep it to digits so it is easy to type on a phone; 6+ digits.
// ------------------------------------------------------------------
const ACCESS_PIN = '1916';

// Brute-force guard: after this many wrong PINs in the window, all
// requests are blocked for the same window length.
const MAX_FAILS = 8;
const LOCK_WINDOW_SECONDS = 600; // 10 minutes

function doGet(e) {
  try {
    const gate = checkPin(e);
    if (!gate.ok) {
      return respond({ success: false, error: gate.error, unauthorized: true });
    }
    const mode = (e.parameter.mode || 'roster').toLowerCase();
    if (mode === 'record') {
      return recordAction(e);
    }
    if (mode === 'reset') {
      return resetActions(e);
    }
    return getRoster();
  } catch (err) {
    return respond({ success: false, error: err.toString() });
  }
}

function checkPin(e) {
  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('pinFails') || 0);

  if (fails >= MAX_FAILS) {
    return { ok: false, error: 'Too many wrong PIN attempts. Try again in a few minutes.' };
  }

  const supplied = (e.parameter.pin || '').toString().trim();
  if (supplied && supplied === ACCESS_PIN) {
    if (fails) cache.remove('pinFails'); // reset counter on success
    return { ok: true };
  }

  cache.put('pinFails', String(fails + 1), LOCK_WINDOW_SECONDS);
  return { ok: false, error: 'Incorrect PIN.' };
}

function getRoster() {
  const sheet = getSheet(ROSTER_SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return respond({ success: true, students: [] });
  }

  const values = sheet.getRange(2, 1, lastRow - 1, COL_INCIDENT).getValues();
  const students = [];

  values.forEach(function (row) {
    const name = (row[COL_NAME - 1] || '').toString().trim();
    if (!name) return; // skip blank separator rows
    students.push({
      class: (row[COL_CLASS - 1] || '').toString().trim(),
      name: name,
      image: (row[COL_IMAGE - 1] || '').toString().trim(),
      warning: toBool(row[COL_WARNING - 1]),
      moveSeats: toBool(row[COL_MOVE_SEATS - 1]),
      incident: toBool(row[COL_INCIDENT - 1])
    });
  });

  return respond({ success: true, students: students });
}

function recordAction(e) {
  const className = (e.parameter.class || '').toString().trim();
  const studentName = (e.parameter.name || '').toString().trim();
  const action = (e.parameter.action || '').toString().trim();

  if (!studentName || !action) {
    return respond({ success: false, error: 'Missing name or action' });
  }
  const targetCol = ACTION_COLUMNS[action];
  if (!targetCol) {
    return respond({ success: false, error: 'Unknown action: ' + action });
  }

  const sheet = getSheet(ROSTER_SHEET_NAME);
  const studentRow = findStudentRow(sheet, className, studentName);
  if (studentRow === -1) {
    return respond({ success: false, error: 'Student not found: ' + studentName });
  }

  sheet.getRange(studentRow, targetCol).setValue(true);
  appendLog(className, studentName, action);

  return respond({ success: true, class: className, name: studentName, action: action });
}

function resetActions(e) {
  const className = (e.parameter.class || '').toString().trim();
  const studentName = (e.parameter.name || '').toString().trim();

  if (!studentName) {
    return respond({ success: false, error: 'Missing name' });
  }

  const sheet = getSheet(ROSTER_SHEET_NAME);
  const studentRow = findStudentRow(sheet, className, studentName);
  if (studentRow === -1) {
    return respond({ success: false, error: 'Student not found: ' + studentName });
  }

  sheet.getRange(studentRow, COL_WARNING).setValue(false);
  sheet.getRange(studentRow, COL_MOVE_SEATS).setValue(false);
  sheet.getRange(studentRow, COL_INCIDENT).setValue(false);
  appendLog(className, studentName, 'Reset');

  return respond({ success: true, class: className, name: studentName, action: 'Reset' });
}

function findStudentRow(sheet, className, studentName) {
  const lastRow = sheet.getLastRow();
  const rows = sheet.getRange(1, 1, lastRow, COL_NAME).getValues();
  for (let i = 0; i < rows.length; i++) {
    const rowName = (rows[i][COL_NAME - 1] || '').toString().trim().toLowerCase();
    const rowClass = (rows[i][COL_CLASS - 1] || '').toString().trim().toLowerCase();
    const nameMatches = rowName === studentName.toLowerCase();
    const classMatches = !className || rowClass === className.toLowerCase();
    if (nameMatches && classMatches) {
      return i + 1; // 1-indexed
    }
  }
  return -1;
}

function appendLog(className, studentName, action) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let log = ss.getSheetByName(LOG_SHEET_NAME);
  if (!log) {
    log = ss.insertSheet(LOG_SHEET_NAME);
    log.appendRow(['Timestamp', 'Class', 'Student', 'Action']);
  }
  log.appendRow([new Date(), className, studentName, action]);
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(name) || ss.getSheets()[0];
  if (!sheet) throw new Error('Sheet "' + name + '" not found');
  return sheet;
}

function toBool(v) {
  if (v === true) return true;
  return v.toString().trim().toLowerCase() === 'true';
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
