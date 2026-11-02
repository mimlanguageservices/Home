// Timed-test safety, shared by the test pages and the hub.
//   tjDraft: keeps a student's answers on this iPad while they take a timed test, so a reload does not lose work.
//   Lock:    a submitted test stays locked (score + review only) until the teacher enters the PIN.
(function () {
  const TEACHER_PIN = '1959';   // change this to your own PIN
  const DKEY = 'tj_draft', PKEY = 'tj_progress', UKEY = 'tj_unlocked';

  function read(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function setUnlocked(key, on) { const u = read(UKEY); if (on) u[key] = true; else delete u[key]; write(UKEY, u); }

  const tjDraft = {
    load: key => read(DKEY)[key] || null,
    // Submitting a retake locks the test again
    save: (key, v) => { const d = read(DKEY); d[key] = v; write(DKEY, d); if (v.submitted || v.finished) setUnlocked(key, false); },
    clear: key => { const d = read(DKEY); delete d[key]; write(DKEY, d); }
  };
  function tjScore(key) { return read(PKEY)[key] || null; }
  // Timed tests keep the most recent score in c/t and the last three attempts, newest first, in h
  function tjRecordScore(key, c, t) {
    const p = read(PKEY), old = p[key];
    const prev = old ? (old.h || [{ c: old.c, t: old.t, at: null }]) : [];   // scores saved before the history have no time
    p[key] = { c, t, h: [{ c, t, at: Date.now() }].concat(prev).slice(0, 3) };
    write(PKEY, p);
  }
  function tjHistoryHtml(key) {
    const s = tjScore(key);
    if (!s || !s.h) return '';
    const when = at => at ? new Date(at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'earlier';
    return '<div class="tj-hist">' + s.h.map((a, i) => `<span${i ? '' : ' class="tj-hist-latest"'}>${a.c}/${a.t} &middot; ${when(a.at)}</span>`).join('') + '</div>';
  }
  // Unlocking removes the saved answers so the retake starts fresh; the score stays on the menu
  function tjUnlock(key) { tjDraft.clear(key); setUnlocked(key, true); }
  // A test with a score and no saved answers was submitted earlier and has not been unlocked
  function tjLocked(key) { return !!key && !tjDraft.load(key) && !!tjScore(key) && !read(UKEY)[key]; }

  function tjAskPin(onOk) {
    const wrap = document.createElement('div');
    wrap.className = 'tj-pin';
    wrap.innerHTML = `<div class="tj-pin-box"><b>Teacher PIN</b><p>Only your teacher can unlock this test.</p>
      <input type="password" inputmode="numeric" autocomplete="off" maxlength="8"><div class="tj-pin-err"></div>
      <div class="tj-pin-btns"><button type="button" class="tj-pin-cancel">Cancel</button><button type="button" class="tj-pin-ok">Unlock</button></div></div>`;
    document.body.appendChild(wrap);
    const inp = wrap.querySelector('input'), err = wrap.querySelector('.tj-pin-err');
    const ok = () => {
      if (inp.value === TEACHER_PIN) { wrap.remove(); onOk(); }
      else { err.textContent = 'Wrong PIN.'; inp.value = ''; inp.focus(); }
    };
    wrap.querySelector('.tj-pin-cancel').onclick = () => wrap.remove();
    wrap.querySelector('.tj-pin-ok').onclick = ok;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') ok(); });
    setTimeout(() => inp.focus(), 50);
  }
  // Ask for the PIN, then unlock the test and reload it from the start
  function tjRetake(key, href) { tjAskPin(() => { tjUnlock(key); location.href = href; }); }

  // Shown when a test was submitted earlier (on this iPad) and has not been unlocked
  function tjLockedHtml(key) {
    const s = tjScore(key);
    return `<div class="tj-locked"><div class="tj-locked-icon">&#128274;</div><h2>Test completed</h2>${s ? `<p>Your score: <b>${s.c} / ${s.t}</b></p>` : ''}
      <p>This test is locked. To take it again, ask your teacher to unlock it.</p><button type="button" class="tj-unlock-btn" id="tjUnlock">Teacher unlock</button></div>`;
  }

  const css = document.createElement('style');
  css.textContent = `.tj-pin { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(26,32,44,0.55); }
    .tj-pin-box { width: 100%; max-width: 340px; padding: 22px; border-radius: 18px; background: #fff; color: #2d3748; box-shadow: 0 20px 60px rgba(0,0,0,0.3); font-family: inherit; }
    .tj-pin-box b { font-size: 1.2rem; }
    .tj-pin-box p { margin: 6px 0 12px; color: #718096; font-size: 0.95rem; }
    .tj-pin-box input { width: 100%; min-height: 52px; padding: 0 14px; border: 2px solid #c7d2fe; border-radius: 12px; font: 600 1.4rem inherit; font-family: inherit; letter-spacing: 6px; text-align: center; }
    .tj-pin-err { min-height: 22px; margin-top: 6px; color: #e53e3e; font-weight: 600; font-size: 0.9rem; }
    .tj-pin-btns { display: flex; gap: 10px; margin-top: 6px; }
    .tj-pin-btns button, .tj-unlock-btn { flex: 1; min-height: 50px; padding: 0 20px; border: 0; border-radius: 12px; font: 600 1rem inherit; font-family: inherit; touch-action: manipulation; cursor: pointer; }
    .tj-pin-cancel { background: #eef2ff; color: #4c51bf; }
    .tj-pin-ok, .tj-unlock-btn { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
    .tj-locked { text-align: center; padding: 24px 8px; line-height: 1.6; }
    .tj-locked-icon { font-size: 3rem; }
    .tj-locked h2 { margin: 6px 0 10px; }
    .tj-locked p { margin-bottom: 10px; color: #4a5568; }
    .tj-unlock-btn { margin-top: 8px; }
    .tj-hist { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .tj-hist span { padding: 2px 10px; border-radius: 12px; background: #f1f5f9; color: #4a5568; font-size: 0.78rem; font-weight: 600; white-space: nowrap; }
    .tj-hist span.tj-hist-latest { background: #eef2ff; color: #4c51bf; }`;
  document.head.appendChild(css);

  Object.assign(window, { tjDraft, tjScore, tjRecordScore, tjHistoryHtml, tjUnlock, tjLocked, tjAskPin, tjRetake, tjLockedHtml });
})();
