# English Grammar Lessons

This folder contains interactive HTML grammar lessons for English learners at A1, A2, and B1 levels.

## 📚 Course Structure

### A1 Level (Beginner) - 20 Lessons
Basic English grammar fundamentals including:
- The Alphabet & Spelling
- Sentence basics (SVO)
- Nouns (singular/plural, articles)
- Pronouns (subject, object, possessive, demonstrative)
- Verb "to be" and "have/has"
- Present Simple & Present Continuous
- Question formation (Yes/No and Wh- questions)
- Imperatives
- Adjectives (order, comparatives, superlatives)
- Prepositions (place & time)
- Modal verb "can/can't"

### A2 Level (Elementary) - 20 Lessons
Intermediate grammar concepts including:
- Past Simple (regular & irregular verbs)
- Past Continuous
- Future forms (going to, will)
- Countable/Uncountable nouns & Quantifiers
- Expressing preferences
- Degrees of comparison
- Modal verbs (must, should, have to)
- Possession
- Conjunctions & Time linkers
- Adverbs
- Question tags
- Polite grammar

### B1 Level (Intermediate) - 14 Lessons
Advanced grammar topics including:
- Present Perfect (Simple & Continuous)
- Past Perfect
- Future Continuous & Future Perfect
- Conditionals (Zero, First, Second)
- Mixed Modals & Modal probability
- Reported Speech (statements, questions, commands)
- Relative Clauses

## 🚀 Auto-Sync System

This folder is automatically synced to GitHub every 5 minutes using the **Grammar Auto-Sync System**.

### How it works:
- Monitors all HTML files in the English-Grammar folder
- Detects any changes (new files, edits, deletions)
- Automatically commits and pushes changes to GitHub
- Runs in the background on Windows startup

### Manual Commands:
```bash
# Sync files manually
node grammar-autosync.js sync

# Start auto-sync with custom interval
node grammar-autosync.js auto 10

# List all grammar files
node grammar-autosync.js list

# Check current status
node grammar-autosync.js status
```

## 📝 File Naming Convention

All files follow the pattern: `{Level}-{Number}-{Topic-Name}.html`

Examples:
- `A1-01-The-Alphabet.html`
- `A2-05-Will.html`
- `B1-14-Relative-Clauses.html`

## 🌐 Deployment

All grammar lessons are automatically deployed to GitHub Pages and accessible online at:
https://mimlanguageservices.github.io/Students/English-Grammar/

## 🛠️ Development

Each lesson includes:
- Interactive exercises with immediate feedback
- Audio components for listening practice
- Grammar explanations with examples
- Practice sections with auto-grading
- Writing exercises with grammar checking
- Responsive design for mobile devices

---

**Last Updated:** October 16, 2025
**Total Lessons:** 54 (A1: 20, A2: 20, B1: 14)
**Auto-Sync:** ✅ Enabled
