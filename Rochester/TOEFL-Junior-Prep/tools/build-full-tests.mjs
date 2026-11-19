// Builds every full 60 minute test from tools/full-tests/ftN.mjs (original content).
// Each test: Listening (L), Language Form & Meaning (G) and Reading (R), 20 minutes per section.
// In the content files the CORRECT option is always written first; `pos` gives the letter it is moved to,
// so the answer key is spread evenly across A-D.
// Writes: data/full-tests.js (all tests) and tools/listening-scripts-ft.json (audio scripts, picked up by generate-audio.mjs)
// Usage: node build-full-tests.mjs   then   node generate-audio.mjs F2-01 F2-02 ...   (new recordings only)
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const MINUTES = 20;
const voices = { 'Ms. Rivera': 'en-US-EmmaNeural', 'Mr. Ortiz': 'en-US-AndrewNeural', 'Ms. Park': 'en-US-MichelleNeural', 'Announcer': 'en-US-BrianNeural',
  'Mr. Hale': 'en-US-ChristopherNeural', 'Ms. Grant': 'en-US-JennyNeural', 'Maya': 'en-US-AriaNeural', 'Leo': 'en-US-GuyNeural', 'Sofia': 'en-US-JennyNeural', 'Librarian': 'en-US-EmmaNeural',
  'Nurse': 'en-US-MichelleNeural', 'Counselor': 'en-US-EmmaNeural', 'Clerk': 'en-US-JennyNeural', 'Mateo': 'en-US-GuyNeural', 'Valeria': 'en-US-AriaNeural', 'Coach Silva': 'en-US-BrianNeural',
  'Shop assistant': 'en-US-ChristopherNeural', 'Volunteer': 'en-US-MichelleNeural' };

const place = (o, letter) => { const p = 'ABCD'.indexOf(letter), rest = o.slice(1); rest.splice(p, 0, o[0]); return { o: rest, a: p }; };
function build(qs, pos, where) {
  if (qs.length !== pos.length) throw new Error(`${where}: ${qs.length} questions but pos "${pos}"`);
  return qs.map((q, i) => {
    if (q.o.length !== 4 || new Set(q.o).size !== 4) throw new Error(`${where} #${i + 1}: needs 4 different options`);
    return Object.assign({}, q, place(q.o, pos[i]));
  });
}

const dir = path.join(here, 'full-tests');
const files = (await fs.readdir(dir)).filter(f => /^ft\d+\.mjs$/.test(f)).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
const tests = [], listening = [];
for (const f of files) {
  const { id, L, G, R } = (await import(pathToFileURL(path.join(dir, f)))).default;
  const tag = 'F' + id;
  const items = L.map(it => {
    it.turns.forEach(([s]) => { if (!voices[s]) throw new Error(`${it.id}: no voice for "${s}"`); });
    return { id: it.id, test: tag, type: it.type, turns: it.turns.map(([s, t]) => ({ s, t })), questions: build(it.questions, it.pos, it.id) };
  });
  const language = G.map(t => {
    const n = (t.text.match(/\{\d+\}/g) || []).length;
    if (n !== t.blanks.length) throw new Error(`${t.id}: ${n} blanks in the text but ${t.blanks.length} answers`);
    return { id: t.id, title: t.title, kind: t.kind, text: t.text, blanks: build(t.blanks, t.pos, t.id) };
  });
  const reading = R.map(t => ({ id: t.id, title: t.title, kind: t.kind, level: t.level, text: t.text, questions: build(t.questions, t.pos, t.id) }));
  const all = [...items.flatMap(i => i.questions), ...language.flatMap(t => t.blanks), ...reading.flatMap(t => t.questions)];
  const counts = [0, 0, 0, 0]; all.forEach(q => counts[q.a]++);
  const qn = list => list.reduce((n, x) => n + (x.questions || x.blanks).length, 0);
  console.log(`Test ${id}: Listening ${qn(items)} · Language ${qn(language)} · Reading ${qn(reading)} · answers A-D ${counts.join('/')}`);
  listening.push(...items);
  tests.push({ id, minutes: MINUTES, listening: tag, language, reading });
}

await fs.writeFile(path.join(here, 'listening-scripts-ft.json'), JSON.stringify({ voices, items: listening }, null, 1));
await fs.writeFile(path.join(here, '..', 'data', 'full-tests.js'),
  '// Full 60 minute tests: built by tools/build-full-tests.mjs from tools/full-tests/ftN.mjs (edit those, not this file).\n'
  + '// Listening items are in audio/listening-data.js (test "F1", "F2", ...).\n'
  + 'window.FULL_TESTS = ' + JSON.stringify(tests) + ';\n');
console.log('wrote data/full-tests.js and tools/listening-scripts-ft.json');
