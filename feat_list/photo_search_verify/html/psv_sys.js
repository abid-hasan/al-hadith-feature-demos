/* =====================================================================
   ছবি তুলে হাদিস যাচাই — the phone's own system UI, shared by demo1..demo5.
   Load after kit.js and psv_data.js, and call PSV.sys({...}) before Kit.init.

   Adds to the phone:
   - #sheet-gal   system photo picker (4 recent photos)
   - #sheet-cam   camera with a book page in the viewfinder
   - #dlg-perm    permission dialog, asked the first time
   - screen "share": the gallery app with the Android share list ("Verify Hadith")
   API:
   - PSV.homeGrid()          home quick-action markup ("যাচাই" opens screen "verify")
   - PSV.gallery() / PSV.camera()  ask permission if needed, then open the picker
   - PSV.read(id)            what the reader gives back: {text} or {msg, again}
   - PSV.perm / PSV.setPerm(bool)   permission state (for the toolbar toggle)
   - PSV.notFoundSvg         the app's "no result" illustration
   ===================================================================== */
(function () {
  'use strict';
  const P = window.PSV, $ = Kit.$;

  P.perm = { gallery: false, camera: false };
  let onPick = () => {}, onPerm = () => {};

  P.homeGrid = () => [0, 4].map((i) => `<div class="qa-row">${P.home.order.slice(i, i + 4).map(([k, l]) => k === 'verify'
    ? `<button class="qa-tile go" data-go="verify">${P.home[k]}${l}</button>`
    : `<button class="qa-tile" data-snack="${l} — এই ফিচারের অংশ নয়">${P.home[k]}${l}</button>`).join('')}</div>`).join('');

  P.notFoundSvg = '<svg class="nf-ill" width="112" height="70" viewBox="0 0 112 70" fill="none"><rect x="12" y="2" width="78" height="52" rx="4" stroke="var(--primary)" stroke-width="2.5"/><path d="M12 13h78" stroke="var(--primary)" stroke-width="2.5"/><circle cx="84" cy="48" r="13" fill="var(--card)" stroke="var(--primary-dark)" stroke-width="3"/><path d="m93 57 9 9" stroke="var(--primary-dark)" stroke-width="4" stroke-linecap="round"/><path d="m79 43 10 10m0-10-10 10" stroke="var(--primary-dark)" stroke-width="3" stroke-linecap="round"/></svg>';

  /* ---------- What reading a photo gives ---------- */
  P.read = (id) => {
    const out = P.ocr[id];
    if (!out) return { msg: P.t.noText, again: true };
    if (!/[ঀ-৿]/.test(out)) return { msg: P.t.banglaOnly };
    return { text: out };
  };

  /* ---------- Permission, asked the first time ---------- */
  function ask(kind, then) {
    if (P.perm[kind]) return then();
    $('#perm-t').textContent = kind === 'camera' ? P.t.camPermTitle : P.t.permTitle;
    $('#perm-ic').innerHTML = P.ic[kind === 'camera' ? 'camera' : 'image'](22);
    $('#perm-yes').onclick = () => { P.perm[kind] = true; onPerm(); Kit.close('dlg-perm'); then(); };
    $('#perm-no').onclick = () => {
      Kit.close('dlg-perm');
      Kit.snack(kind === 'camera' ? P.t.camDenied : P.t.denied, { label: P.t.settings, onClick: () => Kit.snack('ফোনের সেটিংসে আল হাদিস-এর অনুমতির পেজ খুলবে') });
    };
    Kit.open('dlg-perm');
  }
  P.gallery = () => ask('gallery', () => Kit.open('sheet-gal'));
  P.camera = () => ask('camera', () => Kit.open('sheet-cam'));
  P.setPerm = (on) => { P.perm.gallery = P.perm.camera = on; onPerm(); };

  /* ---------- Mount ---------- */
  P.sys = (opts) => {
    onPick = opts.onPick; onPerm = opts.onPerm || onPerm;
    const vp = $('.phone .viewport');
    vp.insertAdjacentHTML('beforeend', `
      <section class="screen gal" data-screen="share">
        <div class="gtop"><button class="icon-btn" data-snack="গ্যালারি অ্যাপ — এই ফিচারের অংশ নয়" aria-label="পেছনে">${Kit.icons.back}</button></div>
        <div class="gimg"><div>${P.img.post()}</div></div>
        <div class="ash" id="ash">
          <div class="grab"></div>
          <div class="pv"><div>${P.img.post()}</div><div><b>১টি ছবি শেয়ার করা হচ্ছে</b><span>স্ক্রিনশট · আজ</span></div></div>
          <div class="apps"><button class="app me" id="app-verify"><i>${P.home.verify}</i>Verify Hadith</button>${[['bt', 'ব্লুটুথ'], ['print', 'প্রিন্ট'], ['file', 'ফাইলে সেভ']]
            .map(([k, l]) => `<button class="app" data-snack="${l} — এই ফিচারের অংশ নয়"><i>${P.ic[k](22)}</i>${l}</button>`).join('')}</div>
        </div>
      </section>
      <div class="sheet" id="sheet-gal" role="dialog" aria-label="${P.t.pickTitle}">
        <div class="sheet-head"><h2>${P.t.pickTitle}</h2><button class="icon-btn" data-close aria-label="বন্ধ করুন">${Kit.icons.close}</button></div>
        <div class="sheet-body"><div class="gp-when">সাম্প্রতিক</div><div class="gp">${P.photos.map((g) => `<button data-pick="${g.id}" aria-label="${g.label}">${P.img[g.id]()}<small>${g.label}</small></button>`).join('')}</div></div>
      </div>
      <div class="sheet cam" id="sheet-cam" role="dialog" aria-label="ক্যামেরা">
        <div class="vf"><div class="vf-img">${P.img.book()}</div><div class="frame"></div><div class="tip">পুরো লেখাটা ফ্রেমের ভেতরে রাখুন</div>
          <button class="icon-btn top" data-close aria-label="বন্ধ করুন">${Kit.icons.close}</button></div>
        <div class="bar"><button class="shutter" id="shutter" aria-label="ছবি তুলুন"></button></div>
      </div>
      <div class="dialog perm" id="dlg-perm" role="dialog" aria-label="অনুমতি">
        <div class="ico" id="perm-ic"></div><h2 id="perm-t"></h2>
        <div class="actions"><button class="btn tonal" id="perm-yes">${P.t.allow}</button><button class="btn text" id="perm-no">${P.t.deny}</button></div>
      </div>`);
    $('#shutter').onclick = () => { Kit.close('sheet-cam'); onPick('book', 'camera'); };
    $('#app-verify').onclick = () => onPick('post', 'share');
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-pick]');
      if (t) { Kit.close('sheet-gal'); onPick(t.dataset.pick, 'gallery'); }
    });
  };
})();
