# Flashcard System — Setup Guide

## Files
- `Code.gs` — paste into Google Apps Script (one copy per student sheet)
- `flashcard.html` — add to student's GitHub repo (one copy per student)

---

## Step 1: Create a Student Google Sheet

1. Open Google Sheets and create a new sheet
2. **Row 1** — type the languages in the first two cells:
   - A1: `English`  (or whatever Language 1 is)
   - B1: `Spanish`  (or whatever Language 2 is)
   - C1: `Image` (label only, not used by the script)
3. Share the sheet: **Share > Anyone with the link > Viewer**
4. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_IS_HERE/edit`

---

## Step 2: Attach the Apps Script

1. In the Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in `Code.gs`
3. Paste the contents of `Code.gs` from this folder
4. Save (Ctrl+S) and close

### Set up the onEdit trigger
1. In Apps Script, click **Triggers** (clock icon, left sidebar)
2. Click **+ Add Trigger**
3. Settings:
   - Function: `onEdit`
   - Event source: `From spreadsheet`
   - Event type: `On edit`
4. Save — authorise when prompted

Now whenever you type a word in Column A (Row 2 or below), Column B and C fill automatically.

---

## Step 3: Add the Flashcard Page to GitHub

1. Open `flashcard.html`
2. Find this line near the top of the `<script>` section:
   ```
   const SHEET_ID = 'PASTE_STUDENT_SHEET_ID_HERE';
   ```
3. Replace `PASTE_STUDENT_SHEET_ID_HERE` with the Sheet ID from Step 1
4. Save the file as e.g. `flashcards.html` in the student's GitHub repo
5. Commit and push — it will be live at their GitHub Pages URL

---

## Step 4: Adding a New Student

1. Copy an existing student's Google Sheet (File > Make a copy)
2. Clear all rows below Row 1
3. Update Row 1 if their language pair is different
4. Share the new sheet (Anyone with link > Viewer)
5. Attach the Apps Script again (Step 2)
6. Copy `flashcard.html`, update the `SHEET_ID`, add to their GitHub repo

---

## Supported Languages for Row 1

| Name to type | Language |
|---|---|
| English | English |
| Spanish | Spanish |
| French | French |
| German | German |
| Italian | Italian |
| Portuguese | Portuguese |
| Japanese | Japanese |
| Chinese | Chinese |
| Korean | Korean |
| Arabic | Arabic |
| Russian | Russian |
| Dutch | Dutch |
| Swedish | Swedish |
| Turkish | Turkish |
| Polish | Polish |
| Greek | Greek |
| Hindi | Hindi |
| Thai | Thai |
| Vietnamese | Vietnamese |
| Indonesian | Indonesian |

---

## Backfilling an Existing Sheet

If you have a sheet with words already in Column A and want to fill B and C:
1. Open Apps Script for that sheet
2. Go to **Run > backfillSheet**
3. Authorise and wait — it fills all rows top to bottom
