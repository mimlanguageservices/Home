// Score badges for the timed tests.
//   above 90%  -> Mastery (gold trophy)
//   above 85%  -> Advanced (silver trophy)
//   above 79%  -> Competent (bronze trophy)
//   otherwise  -> Still in Progress
// The exact ratio is compared (not a rounded percent), so 79% exactly is "Still in Progress".
(function () {
  const TIERS = [
    { min: 90, name: 'Mastery', color: '#f5b301', text: '#8a6100', bg: '#fff8e1', msg: 'Outstanding! You have mastered this test.' },
    { min: 85, name: 'Advanced', color: '#9aa5b4', text: '#4a5568', bg: '#f1f5f9', msg: 'Great work! You are performing at an advanced level.' },
    { min: 79, name: 'Competent', color: '#cd7f32', text: '#8a4b12', bg: '#fff1e6', msg: 'Well done! You are competent at this level.' }
  ];
  const PROGRESS = { name: 'Still in Progress', color: '#38a169', text: '#276749', bg: '#f0fff4', msg: 'Keep practicing. Review the explanations and try again.' };

  function tjBadge(correct, total) {
    const pct = total ? (correct / total) * 100 : 0;
    const tier = TIERS.find(t => pct > t.min) || PROGRESS;
    return Object.assign({ pct: Math.round(pct), trophy: tier !== PROGRESS }, tier);
  }

  function icon(b, size) {
    if (!b.trophy) {
      return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><path d="M32 56V30" stroke="${b.color}" stroke-width="4" stroke-linecap="round"/><path d="M32 34C32 22 22 16 10 16c0 12 8 18 22 18z" fill="${b.color}"/><path d="M32 28C32 18 40 10 54 10c0 12-8 18-22 18z" fill="${b.color}" fill-opacity=".75"/><rect x="20" y="54" width="24" height="5" rx="2.5" fill="${b.color}" fill-opacity=".5"/></svg>`;
    }
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><path d="M18 12H8v4c0 7 5 12 12 12M46 12h10v4c0 7-5 12-12 12" fill="none" stroke="${b.color}" stroke-width="4" stroke-linecap="round"/><path d="M18 8h28v14c0 9-6 16-14 16s-14-7-14-16V8z" fill="${b.color}"/><path d="M25 13v9c0 4 2 7 5 8" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="29" y="38" width="6" height="10" fill="${b.color}"/><rect x="20" y="48" width="24" height="8" rx="2" fill="${b.color}"/></svg>`;
  }

  // Large badge for a result screen
  function tjBadgeHtml(correct, total) {
    const b = tjBadge(correct, total);
    return `<div class="tj-badge" style="background:${b.bg};color:${b.text}"><div class="tj-badge-icon">${icon(b, 84)}</div><div class="tj-badge-body"><div class="tj-badge-name">${b.name}</div><div class="tj-badge-pct">${b.pct}% &middot; ${correct} / ${total}</div><div class="tj-badge-msg">${b.msg}</div></div></div>
        <div class="tj-badge-key">Mastery: above 90% &middot; Advanced: above 85% &middot; Competent: above 79%</div>`;
  }

  // Small badge for a list card
  function tjBadgeMini(correct, total) {
    const b = tjBadge(correct, total);
    return `<span class="tj-mini" style="background:${b.bg};color:${b.text}">${icon(b, 18)}<span>${b.name}</span></span>`;
  }

  const css = document.createElement('style');
  css.textContent = `.tj-badge { display: flex; align-items: center; gap: 16px; text-align: left; margin: 14px auto 6px; padding: 14px 18px; border-radius: 16px; max-width: 480px; }
    .tj-badge-icon { flex: 0 0 auto; line-height: 0; }
    .tj-badge-name { font-size: 1.5rem; font-weight: 700; line-height: 1.2; }
    .tj-badge-pct { font-weight: 600; opacity: 0.85; margin: 2px 0 4px; }
    .tj-badge-msg { font-size: 0.95rem; line-height: 1.4; }
    .tj-badge-key { font-size: 0.78rem; color: #718096; margin-top: 6px; }
    .tj-mini { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px 3px 6px; border-radius: 14px; font-size: 0.8rem; font-weight: 700; white-space: nowrap; }
    @media (max-width: 480px) { .tj-badge { flex-direction: column; text-align: center; } }`;
  document.head.appendChild(css);

  window.tjBadge = tjBadge; window.tjBadgeHtml = tjBadgeHtml; window.tjBadgeMini = tjBadgeMini;
})();
