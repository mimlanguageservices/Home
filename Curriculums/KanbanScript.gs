// ============================================================
// KANBAN SYNC WEB APP - Google Apps Script
// Stores the Curriculums Kanban board in the curriculum spreadsheet:
// https://docs.google.com/spreadsheets/d/13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE
//
// The board lives on a "Kanban" tab (created automatically on first use):
//   Row 1 = headers (To Do | Doing | Done), one task per cell below.
// You can edit that tab by hand too — the page picks changes up within ~15s.
//
// DEPLOY INSTRUCTIONS:
// 1. Open the spreadsheet → Extensions → Apps Script
// 2. Paste this code (into a new file if the project already has code with a doGet)
// 3. Click Deploy → New deployment
// 4. Type: Web app
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Click Deploy, authorize, and copy the Web App URL
// 8. Paste that URL into Curriculums/index.html where it says KANBAN_SYNC_URL
//
// After editing this script later: Deploy → Manage deployments → Edit →
// Version: New version → Deploy (keeps the same URL).
// ============================================================

const SPREADSHEET_ID = '13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE';
const KANBAN_TAB = 'Kanban';
const KANBAN_COLS = ['todo', 'doing', 'done'];
const KANBAN_HEADERS = ['To Do', 'Doing', 'Done'];
const MAX_TASK_LENGTH = 500;

function doGet(e) {
  return jsonResponse_({ ok: true, board: readBoard_() });
}

// The page sends the whole board as text/plain JSON (avoids a CORS preflight).
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const incoming = JSON.parse(e.postData.contents);
    const board = {};
    KANBAN_COLS.forEach(col => {
      const list = Array.isArray(incoming[col]) ? incoming[col] : [];
      board[col] = list
        .map(t => String(t).trim().slice(0, MAX_TASK_LENGTH))
        .filter(t => t);
    });
    writeBoard_(board);
    return jsonResponse_({ ok: true, board: board });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getKanbanSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(KANBAN_TAB);
  if (!sheet) {
    sheet = ss.insertSheet(KANBAN_TAB);
    sheet.getRange(1, 1, 1, KANBAN_HEADERS.length)
      .setValues([KANBAN_HEADERS])
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function readBoard_() {
  const sheet = getKanbanSheet_();
  const board = { todo: [], doing: [], done: [] };
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return board;

  const rows = sheet.getRange(2, 1, lastRow - 1, KANBAN_COLS.length).getDisplayValues();
  rows.forEach(row => {
    KANBAN_COLS.forEach((col, i) => {
      const task = String(row[i]).trim();
      if (task) board[col].push(task);
    });
  });
  return board;
}

function writeBoard_(board) {
  const sheet = getKanbanSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, KANBAN_COLS.length).clearContent();
  }

  const height = Math.max(...KANBAN_COLS.map(col => board[col].length));
  if (height === 0) return;

  const rows = [];
  for (let r = 0; r < height; r++) {
    rows.push(KANBAN_COLS.map(col => board[col][r] || ''));
  }
  // Plain-text format so tasks like "1/2" or "=hi" aren't turned into dates/formulas
  const range = sheet.getRange(2, 1, height, KANBAN_COLS.length);
  range.setNumberFormat('@');
  range.setValues(rows);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
