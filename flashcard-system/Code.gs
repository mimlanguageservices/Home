// ============================================================
// FLASHCARD SYSTEM - Google Apps Script
// Attach this to each student's Google Sheet
// ============================================================

const PEXELS_API_KEY = 'YxosrG3B7ksGILcjCyvf1RswvTictW8k8CZsUFue3nmNP2SIFBFoZhjS';

// Language name → ISO code map
const LANG_CODES = {
  // European
  'english': 'en',       'spanish': 'es',      'french': 'fr',
  'german': 'de',        'italian': 'it',       'portuguese': 'pt',
  'dutch': 'nl',         'russian': 'ru',       'polish': 'pl',
  'ukrainian': 'uk',     'hungarian': 'hu',     'czech': 'cs',
  'slovak': 'sk',        'romanian': 'ro',      'bulgarian': 'bg',
  'serbian': 'sr',       'croatian': 'hr',      'greek': 'el',
  'swedish': 'sv',       'norwegian': 'no',     'danish': 'da',
  'finnish': 'fi',       'catalan': 'ca',       'latvian': 'lv',
  'lithuanian': 'lt',    'estonian': 'et',      'slovenian': 'sl',
  'albanian': 'sq',      'macedonian': 'mk',    'belarusian': 'be',
  // Asian
  'chinese': 'zh',       'mandarin': 'zh',      'cantonese': 'zh-TW',
  'japanese': 'ja',      'korean': 'ko',        'hindi': 'hi',
  'thai': 'th',          'vietnamese': 'vi',    'indonesian': 'id',
  'malay': 'ms',         'tagalog': 'tl',       'bengali': 'bn',
  'urdu': 'ur',          'punjabi': 'pa',       'tamil': 'ta',
  'telugu': 'te',        'marathi': 'mr',       'nepali': 'ne',
  'malayalam': 'ml',
  'sinhala': 'si',       'burmese': 'my',       'khmer': 'km',
  'lao': 'lo',           'georgian': 'ka',      'armenian': 'hy',
  'azerbaijani': 'az',   'kazakh': 'kk',        'uzbek': 'uz',
  // Middle Eastern & African
  'arabic': 'ar',        'hebrew': 'iw',        'persian': 'fa',
  'turkish': 'tr',       'swahili': 'sw',       'amharic': 'am',
  'somali': 'so',        'yoruba': 'yo',        'zulu': 'zu',
  'afrikaans': 'af',
  // Americas
  'haitian creole': 'ht','quechua': 'qu',
};

// ------------------------------------------------------------
// SETUP: Run this once on each new/copied sheet to install triggers
// Extensions > Apps Script > select setupTrigger > Run
// ------------------------------------------------------------
function setupTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove all existing managed triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    const fn = t.getHandlerFunction();
    if (fn === 'onEdit' || fn === 'refreshMissing') ScriptApp.deleteTrigger(t);
  });

  // Installable onEdit trigger
  ScriptApp.newTrigger('onEdit')
    .forSpreadsheet(ss)
    .onEdit()
    .create();

  // Time-driven trigger: fills missing Column B/C every minute
  ScriptApp.newTrigger('refreshMissing')
    .timeBased()
    .everyMinutes(1)
    .create();

  SpreadsheetApp.getUi().alert('Triggers installed successfully!');
}

// ------------------------------------------------------------
// TRIGGER: fires when any cell is edited
// ------------------------------------------------------------
function onEdit(e) {
  if (!e || !e.source) return;

  const sheet = e.source.getActiveSheet();
  const row   = e.range.getRow();
  const col   = e.range.getColumn();

  if (col !== 1 || row <= 1) return;

  const word = e.range.getValue().toString().trim();

  if (!word) {
    sheet.getRange(row, 2).clearContent();
    sheet.getRange(row, 3).clearContent();
    sheet.getRange(row, 4).clearContent();
    return;
  }

  // Prevent concurrent executions causing duplicates
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    Logger.log('Could not get lock — skipping (refreshMissing will catch this)');
    return;
  }

  try {
    const sourceLang = getLangCode(sheet.getRange(1, 1).getValue());
    const targetLang = getLangCode(sheet.getRange(1, 2).getValue());
    const today      = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy/MM/dd');

    if (row === 2) {
      // Check if this word already exists in rows 3+ to prevent duplicates
      // (user may have typed it again while waiting for the slow API calls)
      const lastRow = sheet.getLastRow();
      for (let r = 3; r <= lastRow; r++) {
        if (sheet.getRange(r, 1).getValue().toString().trim().toLowerCase() === word.toLowerCase()) {
          // Word already exists — clear the input row and move cursor back
          sheet.getRange(row, 1).clearContent();
          sheet.setActiveRange(sheet.getRange(2, 1));
          Logger.log('Duplicate word skipped: ' + word);
          return;
        }
      }

      // Show immediate feedback so user knows processing has started
      sheet.insertRowBefore(2);
      sheet.getRange(3, 1).setValue(word);
      sheet.getRange(3, 2).setValue('⏳');   // placeholder visible immediately
      sheet.setActiveRange(sheet.getRange(2, 1));
      SpreadsheetApp.flush();                 // push the placeholder to the screen now

      // Now do the slow API calls
      const translation = translateWord(word, sourceLang, targetLang);
      const img3        = getPixabayImage(word);
      sheet.getRange(3, 2).setValue(translation);
      sheet.getRange(3, 3).setValue(img3);
      sheet.getRange(3, 4).setValue(today);
      if (img3) sheet.getRange(3, 5).setFormula('=IMAGE("' + img3 + '",1)');
    } else {
      // Show immediate feedback
      sheet.getRange(row, 2).setValue('⏳');
      SpreadsheetApp.flush();

      const imgUrl = getPixabayImage(word);
      sheet.getRange(row, 2).setValue(translateWord(word, sourceLang, targetLang));
      sheet.getRange(row, 3).setValue(imgUrl);
      sheet.getRange(row, 4).setValue(today);
      if (imgUrl) sheet.getRange(row, 5).setFormula('=IMAGE("' + imgUrl + '",1)');
    }
  } finally {
    lock.releaseLock();
  }
}

// ------------------------------------------------------------
// AUTO-REFRESH: fills any missing Column B/C/D entries
// Runs every minute via time-driven trigger (set up by setupTrigger)
// ------------------------------------------------------------
function refreshMissing() {
  const sheet   = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const sourceLang = getLangCode(sheet.getRange(1, 1).getValue());
  const targetLang = getLangCode(sheet.getRange(1, 2).getValue());
  const today      = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy/MM/dd');

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;

  try {
    for (let row = 2; row <= lastRow; row++) {
      const word = sheet.getRange(row, 1).getValue().toString().trim();
      if (!word) continue;

      if (!sheet.getRange(row, 2).getValue()) {
        sheet.getRange(row, 2).setValue(translateWord(word, sourceLang, targetLang));
        Utilities.sleep(200);
      }
      if (!sheet.getRange(row, 3).getValue()) {
        const imgUrl = getPixabayImage(word);
        sheet.getRange(row, 3).setValue(imgUrl);
        if (imgUrl) sheet.getRange(row, 5).setFormula('=IMAGE("' + imgUrl + '",1)');
        Utilities.sleep(300);
      } else if (!sheet.getRange(row, 5).getFormula()) {
        const imgUrl = sheet.getRange(row, 3).getValue();
        if (imgUrl) sheet.getRange(row, 5).setFormula('=IMAGE("' + imgUrl + '",1)');
      }
      if (!sheet.getRange(row, 4).getValue()) {
        sheet.getRange(row, 4).setValue(today);
      }
    }
  } finally {
    lock.releaseLock();
  }
}

// ------------------------------------------------------------
// TRANSLATION using built-in LanguageApp (free)
// ------------------------------------------------------------
function translateWord(word, sourceLang, targetLang) {
  try {
    return LanguageApp.translate(word, sourceLang, targetLang);
  } catch (err) {
    Logger.log('Translation error: ' + err);
    return '';
  }
}

// ------------------------------------------------------------
// IMAGE FETCH from Pexels
// ------------------------------------------------------------
function getPixabayImage(word) {
  const url = 'https://api.pexels.com/v1/search?query='
    + encodeURIComponent(word)
    + '&per_page=1&orientation=landscape';

  try {
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      headers: { Authorization: PEXELS_API_KEY }
    });
    const data = JSON.parse(response.getContentText());
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }
    Logger.log('Pexels: no results for "' + word + '"');
  } catch (err) {
    Logger.log('Pexels error: ' + err);
  }
  return '';
}

// ------------------------------------------------------------
// HELPER: language name → ISO code
// ------------------------------------------------------------
function getLangCode(name) {
  if (!name) return 'en';
  const code = LANG_CODES[name.toString().toLowerCase().trim()];
  return code || 'en';
}

// ------------------------------------------------------------
// UTILITY: Run this once manually to backfill an existing sheet
// (Tools > Run > backfillSheet)
// ------------------------------------------------------------
function backfillSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const sourceLang = getLangCode(sheet.getRange(1, 1).getValue());
  const targetLang = getLangCode(sheet.getRange(1, 2).getValue());

  for (let row = 2; row <= lastRow; row++) {
    const word = sheet.getRange(row, 1).getValue().toString().trim();
    if (!word) continue;

    const currentTranslation = sheet.getRange(row, 2).getValue();
    const currentImage       = sheet.getRange(row, 3).getValue();

    if (!currentTranslation) {
      sheet.getRange(row, 2).setValue(translateWord(word, sourceLang, targetLang));
      Utilities.sleep(200); // avoid rate limits
    }

    if (!currentImage) {
      sheet.getRange(row, 3).setValue(getPixabayImage(word));
      Utilities.sleep(300);
    }
  }
}
