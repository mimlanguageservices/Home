// Usage: node build-bt-listening.mjs
// Reads bt-listening/btNN.mjs (items written from the book) + bt-listening/keys.json (answer letters per test)
// and writes listening-scripts-bt.json, which generate-audio.mjs turns into audio/<id>.mp3 and listening-data.js.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, 'bt-listening');
const keys = JSON.parse(fs.readFileSync(path.join(dir, 'keys.json'), 'utf8'));
const voices = {
  "Girl": "en-US-AriaNeural", "Boy": "en-US-GuyNeural", "Man": "en-US-ChristopherNeural", "Woman": "en-US-JennyNeural",
  "Teacher F": "en-US-MichelleNeural", "Teacher M": "en-US-AndrewNeural", "Principal F": "en-US-EmmaNeural", "Principal M": "en-US-BrianNeural"
};
const items = [];
for (const f of fs.readdirSync(dir).filter(f => /^bt\d+\.mjs$/.test(f)).sort()) {
  const n = parseInt(f.slice(2), 10);
  const mod = await import(pathToFileURL(path.join(dir, f)).href);
  const key = keys[n];
  let qi = 0, idx = 0;
  for (const it of mod.default) {
    idx++;
    const turns = it.kind === 'conv'
      ? it.lines.map((l, i) => typeof l === 'string' ? { s: it.speakers[i % it.speakers.length], t: l } : { s: l[0], t: l[1] })
      : [{ s: it.voice || 'Teacher F', t: it.text }];
    const questions = it.qs.map(([q, o]) => {
      const a = 'ABCD'.indexOf(key[qi++]);
      if (o.length !== 4 || a < 0) throw new Error(`${f} item ${idx}: bad question "${q}"`);
      return { q, o, a };
    });
    items.push({ id: `T${String(n).padStart(2, '0')}-${String(idx).padStart(2, '0')}`, test: n, type: it.type, turns, questions });
  }
  if (qi !== 42) throw new Error(`${f}: ${qi} questions (need 42)`);
  console.log(f, 'items', mod.default.length, 'questions', qi);
}
fs.writeFileSync(path.join(here, 'listening-scripts-bt.json'), JSON.stringify({ voices, items }, null, 1));
console.log('wrote', items.length, 'items');
