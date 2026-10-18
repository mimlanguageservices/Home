// Usage: node generate-audio.mjs [--force] [L01 L02 ...]
// Reads listening-scripts.json, writes ../audio/<id>.mp3 and ../audio/listening-data.json
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'audio');
const data = JSON.parse(await fs.readFile(path.join(here, 'listening-scripts.json'), 'utf8'));
for (const extra of ['listening-scripts-2.json']) {
  const more = JSON.parse(await fs.readFile(path.join(here, extra), 'utf8'));
  Object.assign(data.voices, more.voices);
  data.items.push(...more.items);
}
const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter(a => !a.startsWith('--'));
await fs.mkdir(outDir, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function synth(text, voice) {
  for (let attempt = 1; ; attempt++) {
    try { const b = await synthOnce(text, voice); await sleep(1500); return b; }
    catch (e) {
      if (attempt >= 5) throw e;
      const wait = 5000 * attempt;
      console.log(`  retry ${attempt} in ${wait / 1000}s (${e.message || e.statusCode || e})`);
      await sleep(wait);
    }
  }
}

// msedge-tts can raise a truncated-stream error outside the stream's own error event, so route it to the active request
let activeReject = null;
process.on('uncaughtException', e => { if (activeReject) activeReject(e); else throw e; });

function synthOnce(text, voice) {
  return new Promise(async (resolve, reject) => {
    activeReject = reject;
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text);
      const chunks = [];
      audioStream.on('data', d => chunks.push(d));
      audioStream.on('close', () => { tts.close?.(); resolve(Buffer.concat(chunks)); });
      audioStream.on('error', reject);
    } catch (e) { reject(e); }
  });
}

for (const item of data.items) {
  if (only.length && !only.includes(item.id)) continue;
  const file = path.join(outDir, item.id + '.mp3');
  const exists = await fs.access(file).then(() => true, () => false);
  if (exists && !force) { console.log('skip', item.id, '(exists; use --force)'); continue; }
  const parts = [];
  for (const turn of item.turns) {
    const voice = data.voices[turn.s];
    if (!voice) throw new Error(`No voice for speaker "${turn.s}" in ${item.id}`);
    parts.push(await synth(turn.t, voice));
  }
  await fs.writeFile(file, Buffer.concat(parts));
  console.log('wrote', item.id, `(${item.turns.length} turns)`);
}
// Scripts and questions for the page (transcripts included)
await fs.writeFile(path.join(outDir, 'listening-data.json'), JSON.stringify(data.items, null, 1));
await fs.writeFile(path.join(outDir, 'listening-data.js'), 'window.LISTENING = ' + JSON.stringify(data.items) + ';');
console.log('done');
process.exit(0);
