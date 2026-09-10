# Curriculum Site — Setup Guide

## Files
- `index.html` — the site (single page, GitHub Pages ready)

**Connected sheet:** `13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE`
(https://docs.google.com/spreadsheets/d/13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE/edit)

---

## Sheet Structure

**Row 1** — headers, exactly these columns (any order is fine, matching is by keyword):

| Grade | Subject | Book | Lesson | Link | Assignment | Assignment Type |
|---|---|---|---|---|---|---|

**Row 2 and below** — one row per lesson, e.g.:

| Grade | Subject | Book | Lesson | Link | Assignment | Assignment Type |
|---|---|---|---|---|---|---|
| 8th Grade | Real World English | Impact 4 | 7.1 | https://docs.google.com/presentation/d/XXXX/edit | https://docs.google.com/document/d/AAAA/edit | Vocabulary |
| 8th Grade | Real World English | Impact 4 | 7.2 | https://docs.google.com/presentation/d/YYYY/edit | | |
| 8th Grade | Real World English | Impact 5 | 1.1 | https://docs.google.com/presentation/d/ZZZZ/edit | https://docs.google.com/document/d/BBBB/edit | Grammar |
| 9th Grade | Real World English | Impact 6 | 1.1 | https://docs.google.com/presentation/d/WWWW/edit | | |

- `Lesson` numbers (e.g. `7.1`, `7.2`) are sorted numerically within each book automatically.
- `Link` can be the normal "Share" link to the Google Slides file — it just opens in a new tab, no special publish/embed link needed.
- `Assignment` is optional per lesson — any link works (Google Doc, Form, etc). Shows as a purple button next to "Open Slides". Leave blank if a lesson has no homework yet.
- `Assignment Type` is optional free text (e.g. "Vocabulary", "Venn Diagram") — it's prepended to the assignment button's label, so it reads e.g. "Vocabulary Assignment" or "Venn Diagram Assignment". Leave blank and the button just reads "Open Assignment".
- Rows with an empty `Link` still show up, labeled "No slides yet".

The site is already pointed at the sheet above — just keep adding rows there and the site updates automatically.

---

## Step 1: Day-to-Day Editing (no code needed)

To add, remove, or reorder curriculum lessons, teachers just edit the Google Sheet directly:
- **New lesson** → add a new row with Grade, Subject, Book, Lesson, and the Slides link
- **New book, subject, or grade** → just type a new value in that column on a new row; the site picks it up automatically, no setup needed
- **Update a link** → edit the `Link` cell

Changes appear on the live site within a few seconds of editing the sheet (no republish needed).

---

## Step 2: Publish to GitHub Pages

1. Commit and push this `Curriculums/` folder to the repo
2. It will be live at your GitHub Pages URL, e.g.
   `https://<your-username>.github.io/<repo>/Curriculums/`

If you ever need to point the site at a **different** sheet, open `index.html` and update:
```
const SHEET_ID = '13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE';
```

---

## How Navigation Works

Students/teachers visiting the site:
1. Pick a **Grade** (e.g. "8th Grade")
2. Pick a **Subject** within that grade (e.g. "Real World English")
3. Pick a **Book** within that subject (e.g. "Impact 4")
4. See the list of **Lessons** in that book (e.g. "Lesson 7.1"), each with an "Open Slides ↗" button that opens the Google Slides deck in a new tab

A breadcrumb at the top (`All Grades › 8th Grade › Real World English › Impact 4`) lets them jump back up a level at any time.
