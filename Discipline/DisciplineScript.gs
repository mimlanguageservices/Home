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
//                         (cases marked Removed are left out)
//   ?mode=update&row=5&date=...&name=...&status=Processed
//                      -> sets the Status of one case. status is one of
//                         Processed / Emailed parents / Removed; Removed
//                         also needs &removePin=<REMOVE_PIN>
//   ?mode=email&class=8A&name=...&subject=...&body=...&sender=...&note=...
//                      -> emails the student's parents (address taken
//                         from the roster's mother/father email columns, never
//                         from the request) and logs it on the Emails tab.
//                         Used by ParentEmail.html.
//
//   ?mode=draft&class=8A&name=...&message=...&sender=...
//                      -> asks Claude to turn the teacher's short note into a
//                         full email (praise, kind version of the note,
//                         sign-off) translated to Spanish. Nothing is sent.
//
// CLAUDE SETUP (needed for mode=draft):
// 1. Create an API key at https://platform.claude.com (API usage is billed
//    there, separately from a claude.ai Pro/Max subscription).
// 2. In Apps Script: Project Settings (gear) -> Script properties ->
//    Add property: ANTHROPIC_API_KEY = <your key>. Never paste the key
//    into the HTML — the page is public; the script is not.
//
// NOTE: the email mode uses MailApp. The first time you redeploy with
// it, Google will ask you to authorize "Send email as you" — accept it.
// ============================================================

const SPREADSHEET_ID = '1U37diEkPAAupol2Yg0ahOAOSGKN8DkI_av6LdhP-p7I';
const ROSTER_SHEET_NAME = 'Sheet1'; // change if your tab has another name
const SITUATIONS_SHEET_NAME = 'Situations';

// Column positions in the roster sheet (1-indexed)
const COL_CLASS = 1; // A
const COL_NAME = 2; // B
const COL_IMAGE = 3; // C
const COL_GENDER = 9; // I
// Parent email addresses. Emails go to both parents; a blank cell is
// simply skipped. A cell may hold more than one address, separated by
// commas, semicolons or spaces.
const COL_MOTHER_EMAIL = 10; // J
const COL_MOTHER_NAME = 11;  // K
const COL_FATHER_EMAIL = 12; // L
const COL_FATHER_NAME = 13;  // M

// Emails tab: one row per email sent from ParentEmail.html.
const EMAILS_SHEET_NAME = 'Emails';
const EMAIL_HEADERS = ['Date', 'Class', 'Student', 'To', 'Subject', 'Message', 'Sent by', 'Teacher note'];

// ------------------------------------------------------------------
// CLAUDE — turns the teacher's note into the email (mode=draft).
// Edit CLAUDE_PROMPT freely to change how the emails are written.
// ------------------------------------------------------------------
const CLAUDE_MODEL = 'claude-sonnet-5-5';

// Every email is signed with this name (and it is the sender name
// parents see in their inbox).
const TEACHER_NAME = 'Jerome Meadows';
const CLAUDE_PROMPT = [
  "You write emails from a teacher to a student's parents. The teacher gives you a short note; you turn it into a complete, warm email.",
  "",
  "Structure:",
  "1. Greeting: address the parents by name when names are given, otherwise address the parents or guardians of the student.",
  "2. First paragraph: speak highly of the student, sincerely and warmly. You know nothing about the student beyond what is given here, so keep the praise general (their qualities, their potential, that they are valued in the class) and never invent specific achievements, grades or events.",
  "3. Second paragraph: rewrite the teacher's note so it sounds kind, respectful and constructive. Keep every fact and every request in the note. Do not add new facts, and do not soften it so much that the concern gets lost.",
  "4. Sign off with a warm closing line, then the teacher's name on its own line, exactly as given.",
  "",
  "Finally, translate the email into Spanish: natural, warm Spanish of the kind a school uses with families, addressing the parents formally (usted / ustedes). Use the student's gender for grammatical agreement when it is given.",
  "",
  "Write plain text with a blank line between paragraphs: no markdown, no bullet points. Keep the whole email short enough to read in under a minute.",
  "",
  "Return english_subject and english_body (the email in English, so the teacher can check it), then subject and body (the same email in Spanish, which is what gets sent)."
].join('\n');

const DRAFT_SCHEMA = {
  type: 'object',
  properties: {
    english_subject: { type: 'string' },
    english_body: { type: 'string' },
    subject: { type: 'string' },
    body: { type: 'string' }
  },
  required: ['english_subject', 'english_body', 'subject', 'body'],
  additionalProperties: false
};

// Situations tab layout. The tab is created automatically on the
// first report. Status and Notes are filled in by hand in the sheet
// as each case moves through its process; the app shows them.
const SITUATION_HEADERS = ['Date', 'Class', 'Student', 'Photo', 'Code', 'Situation', 'Status', 'Notes', 'Photo URL'];
const SCOL_DATE = 1;
const SCOL_STATUS = 7;
const SCOL_PHOTO_URL = 9;

// Choices for the Status dropdown in the sheet. Edit freely — the
// first one is what every new report starts with.
const STATUSES = ['Reported', 'In process', 'Processed', 'Emailed parents', 'Resolved', 'Removed'];

// Statuses the app's buttons can set on a case.
const APP_STATUSES = ['Processed', 'Emailed parents', 'Removed'];

// ------------------------------------------------------------------
// PIN — the one PIN for everything: unlocking Discipline.html and
// ParentEmail.html, and confirming a case removal.
// Change this string to change it, then redeploy
// (Deploy -> Manage deployments -> edit -> New version -> Deploy).
// ------------------------------------------------------------------
const ACCESS_PIN = '1959';

// Removing a case asks for the PIN again. Removed rows stay in the
// sheet (as a record) but are hidden from the app.
const REMOVE_PIN = ACCESS_PIN;

// Brute-force guard: after this many wrong PINs in the window, all
// requests are blocked for the same window length.
const MAX_FAILS = 8;
const LOCK_WINDOW_SECONDS = 600; // 10 minutes

// Run this ONCE from the Apps Script editor (choose "authorize" in the
// function menu at the top, then click Run) to grant the permissions the
// web app needs: reaching Claude (external requests) and sending email.
// Google only asks for new permissions when you run code in the editor.
function authorize() {
  UrlFetchApp.fetch('https://api.anthropic.com/v1/models', { muteHttpExceptions: true });
  Logger.log('Emails left today: ' + MailApp.getRemainingDailyQuota());
  Logger.log('All set — now redeploy (Manage deployments -> New version).');
}

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
    if (mode === 'update') {
      return updateSituation(e);
    }
    if (mode === 'email') {
      return emailParents(e);
    }
    if (mode === 'draft') {
      return draftEmail(e);
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

  const width = Math.max(COL_CLASS, COL_NAME, COL_IMAGE, COL_GENDER,
    COL_MOTHER_EMAIL, COL_MOTHER_NAME, COL_FATHER_EMAIL, COL_FATHER_NAME);
  const values = sheet.getRange(2, 1, lastRow - 1, width).getValues();
  const students = [];

  values.forEach(function (row) {
    const name = (row[COL_NAME - 1] || '').toString().trim();
    if (!name) return; // skip blank separator rows
    students.push({
      class: (row[COL_CLASS - 1] || '').toString().trim(),
      name: name,
      image: (row[COL_IMAGE - 1] || '').toString().trim(),
      gender: normalizeGender(row[COL_GENDER - 1]),
      motherEmail: parseEmails(row[COL_MOTHER_EMAIL - 1]).join(', '),
      motherName: (row[COL_MOTHER_NAME - 1] || '').toString().trim(),
      fatherEmail: parseEmails(row[COL_FATHER_EMAIL - 1]).join(', '),
      fatherName: (row[COL_FATHER_NAME - 1] || '').toString().trim(),
      parentEmail: parentEmails(row).join(', ')
    });
  });

  return respond({ success: true, students: students });
}

// Mother's and father's addresses together, without duplicates.
function parentEmails(row) {
  const all = parseEmails(row[COL_MOTHER_EMAIL - 1]).concat(parseEmails(row[COL_FATHER_EMAIL - 1]));
  return all.filter(function (a, i) {
    return all.map(function (x) { return x.toLowerCase(); }).indexOf(a.toLowerCase()) === i;
  });
}

// Pull every valid-looking address out of a cell.
function parseEmails(v) {
  return (v || '').toString()
    .split(/[\s,;]+/)
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s); });
}

function emailParents(e) {
  const className = (e.parameter.class || '').toString().trim();
  const studentName = (e.parameter.name || '').toString().trim();
  const subject = (e.parameter.subject || '').toString().trim();
  const body = (e.parameter.body || '').toString().trim();
  const sender = (e.parameter.sender || '').toString().trim() || TEACHER_NAME;
  const note = (e.parameter.note || '').toString().trim();

  if (!studentName || !subject || !body) {
    return respond({ success: false, error: 'Missing student, subject or message' });
  }

  // Look the address up in the roster so the app can only ever email
  // a student's own parents.
  const r = findStudentRow(className, studentName);
  if (!r) {
    return respond({ success: false, error: 'Student not found in the roster — refresh and try again.' });
  }
  const to = parentEmails(r);
  if (!to.length) {
    return respond({ success: false, error: 'No parent email in the sheet for ' + studentName + '.' });
  }
  if (MailApp.getRemainingDailyQuota() < to.length) {
    return respond({ success: false, error: 'Daily Gmail sending limit reached. Try again tomorrow.' });
  }

  const opts = { to: to.join(','), subject: subject, body: body };
  if (sender) opts.name = sender;
  MailApp.sendEmail(opts);

  const log = getEmailsSheet();
  log.appendRow([new Date(), className, studentName, to.join(', '), subject, body, sender, note]);

  return respond({ success: true, to: to.join(', ') });
}

// Roster row for one student, or null.
function findStudentRow(className, studentName) {
  const sheet = getSheet(ROSTER_SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const width = Math.max(COL_CLASS, COL_NAME, COL_GENDER,
    COL_MOTHER_EMAIL, COL_MOTHER_NAME, COL_FATHER_EMAIL, COL_FATHER_NAME);
  const rows = sheet.getRange(2, 1, lastRow - 1, width).getValues();
  for (let i = 0; i < rows.length; i++) {
    if ((rows[i][COL_NAME - 1] || '').toString().trim() === studentName &&
        (rows[i][COL_CLASS - 1] || '').toString().trim() === className) {
      return rows[i];
    }
  }
  return null;
}

// Ask Claude to turn the teacher's note into the parent email.
function draftEmail(e) {
  const className = (e.parameter.class || '').toString().trim();
  const studentName = (e.parameter.name || '').toString().trim();
  const message = (e.parameter.message || '').toString().trim();
  const sender = (e.parameter.sender || '').toString().trim() || TEACHER_NAME;

  if (!studentName || !message) {
    return respond({ success: false, error: 'Missing student or message' });
  }
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) {
    return respond({ success: false, error: 'No Claude API key: add ANTHROPIC_API_KEY under Project Settings -> Script properties.' });
  }
  const r = findStudentRow(className, studentName);
  if (!r) {
    return respond({ success: false, error: 'Student not found in the roster — refresh and try again.' });
  }

  // Only greet parents who will actually receive the email.
  const parents = [];
  const motherName = (r[COL_MOTHER_NAME - 1] || '').toString().trim();
  const fatherName = (r[COL_FATHER_NAME - 1] || '').toString().trim();
  if (motherName && parseEmails(r[COL_MOTHER_EMAIL - 1]).length) parents.push(motherName + ' (mother)');
  if (fatherName && parseEmails(r[COL_FATHER_EMAIL - 1]).length) parents.push(fatherName + ' (father)');
  const gender = normalizeGender(r[COL_GENDER - 1]);

  const details = [
    'Student: ' + studentName + (className ? ', class ' + className : '') + (gender ? ', ' + gender : ''),
    'Parents: ' + (parents.length ? parents.join(', ') : '(names not given)'),
    'Teacher: ' + sender,
    '',
    "Teacher's note:",
    '<teacher_note>',
    message,
    '</teacher_note>'
  ].join('\n');

  const res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2026-10-21',
      // If Claude's safety check ever declines, retry on a fallback model.
      'anthropic-beta': 'server-side-fallback-2026-07-01'
    },
    payload: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 16000,
      fallbacks: 'default',
      system: CLAUDE_PROMPT,
      output_config: {
        effort: 'low', // short rewrite: keeps it quick
        format: { type: 'json_schema', schema: DRAFT_SCHEMA }
      },
      messages: [{ role: 'user', content: details }]
    })
  });

  let data;
  try {
    data = JSON.parse(res.getContentText());
  } catch (err) {
    return respond({ success: false, error: 'Claude returned an unreadable reply (HTTP ' + res.getResponseCode() + ').' });
  }
  if (res.getResponseCode() !== 200) {
    const msg = data && data.error && data.error.message ? data.error.message : 'HTTP ' + res.getResponseCode();
    return respond({ success: false, error: 'Claude: ' + msg });
  }
  if (data.stop_reason === 'refusal') {
    return respond({ success: false, error: 'Claude declined to write this one — try rewording the note.' });
  }
  if (data.stop_reason === 'max_tokens') {
    return respond({ success: false, error: 'Claude ran out of room — try a shorter note.' });
  }
  const text = (data.content || [])
    .filter(function (b) { return b.type === 'text'; })
    .map(function (b) { return b.text; })
    .join('');
  let draft;
  try {
    draft = JSON.parse(text);
  } catch (err) {
    return respond({ success: false, error: 'Claude returned an unexpected format — try again.' });
  }

  return respond({ success: true, draft: draft });
}

function getEmailsSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(EMAILS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(EMAILS_SHEET_NAME);
    sheet.appendRow(EMAIL_HEADERS);
    sheet.getRange(1, 1, 1, EMAIL_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
  } else {
    // Older tabs: add any header columns added since they were made.
    const head = sheet.getRange(1, 1, 1, EMAIL_HEADERS.length);
    const vals = head.getValues()[0];
    if (vals.some(function (v, i) { return !v; })) {
      head.setValues([EMAIL_HEADERS.map(function (h, i) { return vals[i] || h; })]).setFontWeight('bold');
    }
  }
  return sheet;
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
  let row;
  try {
    sheet.appendRow([now, className, studentName, photo, code, situation, STATUSES[0], '', image]);
    row = sheet.getLastRow();
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
      row: row, date: now.toISOString(), class: className, name: studentName, image: image,
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
  values.forEach(function (r, i) {
    if (!r[2]) return; // no student name -> blank row
    const status = String(r[SCOL_STATUS - 1] || '').trim();
    if (status.toLowerCase() === 'removed') return;
    const d = r[SCOL_DATE - 1];
    list.push({
      row: i + 2,
      date: d instanceof Date ? d.toISOString() : String(d || ''),
      class: String(r[1] || '').trim(),
      name: String(r[2] || '').trim(),
      code: String(r[4] || '').trim(),
      situation: String(r[5] || '').trim(),
      status: status,
      notes: String(r[7] || '').trim(),
      image: String(r[SCOL_PHOTO_URL - 1] || '').trim()
    });
  });
  list.reverse(); // newest first

  return respond({ success: true, situations: list });
}

function updateSituation(e) {
  const row = parseInt(e.parameter.row, 10);
  const date = (e.parameter.date || '').toString().trim();
  const studentName = (e.parameter.name || '').toString().trim();
  const status = (e.parameter.status || '').toString().trim();

  if (APP_STATUSES.indexOf(status) === -1) {
    return respond({ success: false, error: 'Unknown status: ' + status });
  }
  if (status === 'Removed') {
    const supplied = (e.parameter.removePin || '').toString().trim();
    if (supplied !== REMOVE_PIN) {
      // Wrong removal PINs count toward the same brute-force lock.
      const cache = CacheService.getScriptCache();
      const fails = Number(cache.get('pinFails') || 0);
      cache.put('pinFails', String(fails + 1), LOCK_WINDOW_SECONDS);
      return respond({ success: false, error: 'Incorrect removal PIN.' });
    }
  }

  const sheet = getSituationsSheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (!(row >= 2 && row <= sheet.getLastRow())) {
      return respond({ success: false, error: 'Case not found — refresh and try again.' });
    }
    // Make sure the row still holds the case the app is showing (rows
    // can move if someone sorts or deletes in the sheet).
    const r = sheet.getRange(row, 1, 1, 3).getValues()[0];
    const d = r[SCOL_DATE - 1];
    // Dates are compared to the second; Sheets can round milliseconds.
    const sameDate = d instanceof Date
      ? Math.abs(d.getTime() - new Date(date).getTime()) < 1000
      : String(d || '') === date;
    if (String(r[2] || '').trim() !== studentName || !sameDate) {
      return respond({ success: false, error: 'The sheet has changed — refresh and try again.' });
    }
    const cell = sheet.getRange(row, SCOL_STATUS);
    // Refresh the dropdown first so older rows accept the new statuses.
    cell.setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
    );
    cell.setValue(status);
  } finally {
    lock.releaseLock();
  }

  return respond({ success: true, row: row, status: status });
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
