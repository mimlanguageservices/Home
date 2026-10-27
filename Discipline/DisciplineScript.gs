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
// After editing this code, redeploy the SAME deployment so the URL
// stays the same: Deploy -> Manage deployments -> edit (pencil) ->
// Version: New version -> Deploy.
//
// The app talks to this script with plain GET requests (no CORS
// pre-flight), matching the pattern already used elsewhere in this
// project.
//
//   ?mode=roster       -> returns the student list
//   ?mode=report&class=8A&name=...&image=...&code=1.1&situation=...
//                      -> appends one row to the Situations tab
//   ?mode=situations   -> returns every reported situation, newest first
// ============================================================

const SPREADSHEET_ID = '1U37diEkPAAupol2Yg0ahOAOSGKN8DkI_av6LdhP-p7I';
const ROSTER_SHEET_NAME = 'Sheet1'; // change if your tab has another name
const SITUATIONS_SHEET_NAME = 'Situations';

// Column positions in the roster sheet (1-indexed)
const COL_CLASS = 1; // A
const COL_NAME = 2; // B
const COL_IMAGE = 3; // C
const COL_GENDER = 9; // I

// Situations tab layout. The tab is created automatically on the
// first report. Status and Notes are filled in by hand in the sheet
// as each case moves through its process; the app shows them.
const SITUATION_HEADERS = ['Date', 'Class', 'Student', 'Photo', 'Code', 'Situation', 'Status', 'Notes', 'Photo URL'];
const SCOL_DATE = 1;
const SCOL_STATUS = 7;
const SCOL_PHOTO_URL = 9;

// Choices for the Status dropdown in the sheet. Edit freely — the
// first one is what every new report starts with.
const STATUSES = ['Reported', 'In process', 'Resolved'];

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
    if (mode === 'report') {
      return reportSituation(e);
    }
    if (mode === 'situations') {
      return getSituations();
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

  const values = sheet.getRange(2, 1, lastRow - 1, COL_GENDER).getValues();
  const students = [];

  values.forEach(function (row) {
    const name = (row[COL_NAME - 1] || '').toString().trim();
    if (!name) return; // skip blank separator rows
    students.push({
      class: (row[COL_CLASS - 1] || '').toString().trim(),
      name: name,
      image: (row[COL_IMAGE - 1] || '').toString().trim(),
      gender: normalizeGender(row[COL_GENDER - 1])
    });
  });

  return respond({ success: true, students: students });
}

function reportSituation(e) {
  const className = (e.parameter.class || '').toString().trim();
  const studentName = (e.parameter.name || '').toString().trim();
  const image = (e.parameter.image || '').toString().trim();
  const code = (e.parameter.code || '').toString().trim();
  const situation = (e.parameter.situation || '').toString().trim();

  if (!studentName || !code) {
    return respond({ success: false, error: 'Missing student or situation' });
  }

  const sheet = getSituationsSheet();
  const photo = image ? '=IMAGE("' + image.replace(/"/g, '""') + '")' : '';
  const now = new Date();

  // Lock so two phones reporting at once can't land on the same row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet.appendRow([now, className, studentName, photo, code, situation, STATUSES[0], '', image]);
    const row = sheet.getLastRow();
    sheet.getRange(row, SCOL_STATUS).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
    );
    sheet.setRowHeight(row, 60);
  } finally {
    lock.releaseLock();
  }

  return respond({
    success: true,
    situation: {
      date: now.toISOString(), class: className, name: studentName, image: image,
      code: code, situation: situation, status: STATUSES[0], notes: ''
    }
  });
}

function getSituations() {
  const sheet = getSituationsSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return respond({ success: true, situations: [] });
  }

  const values = sheet.getRange(2, 1, lastRow - 1, SITUATION_HEADERS.length).getValues();
  const list = [];
  values.forEach(function (r) {
    if (!r[2]) return; // no student name -> blank row
    const d = r[SCOL_DATE - 1];
    list.push({
      date: d instanceof Date ? d.toISOString() : String(d || ''),
      class: String(r[1] || '').trim(),
      name: String(r[2] || '').trim(),
      code: String(r[4] || '').trim(),
      situation: String(r[5] || '').trim(),
      status: String(r[SCOL_STATUS - 1] || '').trim(),
      notes: String(r[7] || '').trim(),
      image: String(r[SCOL_PHOTO_URL - 1] || '').trim()
    });
  });
  list.reverse(); // newest first

  return respond({ success: true, situations: list });
}

function getSituationsSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SITUATIONS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SITUATIONS_SHEET_NAME);
    sheet.appendRow(SITUATION_HEADERS);
    sheet.getRange(1, 1, 1, SITUATION_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
    sheet.setColumnWidth(4, 70);
  }
  return sheet;
}

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(name) || ss.getSheets()[0];
  if (!sheet) throw new Error('Sheet "' + name + '" not found');
  return sheet;
}

function normalizeGender(v) {
  const g = (v || '').toString().trim().toLowerCase();
  if (g === 'boy' || g === 'b' || g === 'male' || g === 'm') return 'boy';
  if (g === 'girl' || g === 'g' || g === 'female' || g === 'f') return 'girl';
  return '';
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
