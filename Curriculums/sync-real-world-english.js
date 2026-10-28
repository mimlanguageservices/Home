// Regenerates Real-World-English-8/index.html from index.html.
// index.html is the single source of truth — never edit the generated file by hand.
//   node sync-real-world-english.js          one-off rebuild
//   node sync-real-world-english.js --watch  rebuild whenever index.html is saved
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'index.html');
const OUT = path.join(__dirname, 'Real-World-English-8', 'index.html');

function build() {
  let s = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  const cut = (a, b) => {
    const i = s.indexOf(a), j = s.indexOf(b, i);
    if (i < 0 || j < 0) throw new Error('anchor not found: ' + (i < 0 ? a : b));
    s = s.slice(0, i) + s.slice(j);
  };
  const rep = (a, b) => {
    if (!s.includes(a)) throw new Error('anchor not found: ' + a);
    s = s.replace(a, () => b);
  };

  rep('<title>Curriculums</title>', '<title>Real World English 8</title>');
  cut('  <nav class="sidebar"', '  <h1 id="page-title">');
  rep('<h1 id="page-title">Curriculums</h1>\n  <p id="subtitle">Browse by grade, subject, book, and lesson</p>',
      '<h1 id="page-title">Real World English 8</h1>\n  <p id="subtitle">Browse by book and lesson</p>');
  rep('  <div class="resource-list" id="resource-list" style="display:none"></div>\n  <div class="letter-stage" id="letter-stage" style="display:none"></div>\n', '');
  cut('\n  <div class="kanban-wrap"', '\n  <script>');
  cut('    // Sidebar resource pages', '    // ============================================================\n\n    // Sheet columns');
  rep("const SHEET_ID = '13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE';\n",
      "const SHEET_ID = '13vuBiyaM82zExzUjD4im2Zhoys_q3PjKt2Th3AiKFnE';\n" +
      "    // This site only shows rows whose Subject is this value\n    const SUBJECT = 'Real World English';\n" +
      "    // ...and only this grade (matches any Grade value starting with this, e.g. \"8th Grade\")\n    const GRADE_PREFIX = '8';\n");
  rep("    let view = 'curriculum'; // 'curriculum' | 'silent-starter' | 'circle-time' | 'processing-letters' | 'processing-category'\n    const resourceCache = {}; // key -> parsed resource rows\n\n    // Processing tab — no header row. Columns: Letter, Category, Question\n    let processingRows = [];\n\n", '');
  cut('    async function loadResourceTab', '    function showStatus');
  cut('    function setActiveNav', '    function render() {');
  rep("      if (view !== 'curriculum') return;\n\n      hideAllPanels();", '      hideAllPanels();');
  rep('    function render() {', `    function hideAllPanels() {
      document.getElementById('breadcrumb').style.display = 'none';
      document.getElementById('status').style.display = 'none';
      document.getElementById('grid').style.display = 'none';
      document.getElementById('topics-list').style.display = 'none';
    }

    function render() {`);
  rep('        .filter(r => r[idx.grade] && r[idx.subject] && r[idx.book] && r[idx.lesson])',
      '        .filter(r => r[idx.grade] && r[idx.subject] && r[idx.book] && r[idx.lesson])\n' +
      '        .filter(r => r[idx.subject].trim().toLowerCase() === SUBJECT.toLowerCase())\n' +
      '        .filter(r => r[idx.grade].trim().startsWith(GRADE_PREFIX))');
  rep('let path = { grade: null, subject: null, book: null };', 'let path = { subject: SUBJECT, book: null };');
  cut('      if (!path.grade) {', '      if (!path.book) {');
  rep('entries.filter(e => e.grade === path.grade && e.subject === path.subject).map(e => e.book)', 'entries.map(e => e.book)');
  rep('        e.grade === path.grade && e.subject === path.subject && e.book === path.book', '        e.book === path.book');
  cut("      const home = document.createElement('span');", '      if (path.book) {');
  rep('      if (path.book) {\n        bc.appendChild(sep());\n        const bookCrumb',
      "      if (path.book) {\n        const home = document.createElement('span');\n        home.className = 'crumb';\n        home.textContent = 'All Books';\n        home.onclick = () => { path.book = null; render(); };\n        bc.appendChild(home);\n        bc.appendChild(sep());\n        const bookCrumb");
  rep('function canGoBack() { return !!path.grade; }', 'function canGoBack() { return !!path.book; }');
  cut('    function goBack() {', '    function renderBreadcrumb() {');
  rep('    function renderBreadcrumb() {', '    function goBack() { path.book = null; render(); }\n\n    function renderBreadcrumb() {');
  cut("    document.getElementById('nav-curriculum').onclick", '    loadSheet();');

  new Function(s.match(/<script>([\s\S]*)<\/script>/)[1]); // syntax check
  return s;
}

function run() {
  try {
    const out = build();
    if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf8') !== out) {
      fs.writeFileSync(OUT, out);
      console.log('Real-World-English-8/index.html updated');
    }
  } catch (e) {
    console.error('sync-real-world-english FAILED: ' + e.message);
    console.error('index.html changed in a way the generator does not recognise — update sync-real-world-english.js');
    process.exitCode = 1;
  }
}

run();
if (process.argv.includes('--watch')) {
  let t;
  fs.watch(SRC, () => { clearTimeout(t); t = setTimeout(run, 300); });
  console.log('Watching index.html…');
}
