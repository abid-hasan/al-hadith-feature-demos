/* =====================================================================
   ইভেন্ট ভিত্তিক হাদিস সংকলন — parts every demo shares (load after kit.js
   and ehc_data.js; call EHC.mount({...}) before Kit.init):
   - screen "hadith": the existing hadith page (HadithDetailsPage)
   - #sheet-menu: the card menu as today — বুকমার্ক, নোট, কপি, শেয়ার
     (menu: 'list' = MoreOptionBottomSheet rows, 'grid' = 2×2 tiles)
   - #sheet-note: write a note
   - the toolbar date buttons (EHC.extra) — the card follows the Hijri date
   ===================================================================== */
(function () {
  'use strict';
  const E = window.EHC, S = E.S, $ = Kit.$, $$ = Kit.$$, I = Kit.icons;
  let onChange = () => {}, onDate = () => {};

  /* ---------- Which event is on today ---------- */
  E.eventId = () => E.dates.find((d) => d.id === S.date).event;
  // A screen opened from the toolbar while nothing is on shows the Ramadan collection.
  E.shownId = () => E.eventId() || 'ramadan';
  E.ev = () => E.events[E.shownId()];
  E.count = (ev) => `${Kit.bn(ev.ids.length)}টি হাদিস`;

  /* ---------- Hadith card pieces ---------- */
  E.grade = (h) => `<span class="grade sahih">${h.grade}</span>`;
  E.bmIcon = (id, w) => (S.bm.has(id) ? E.ic.bookmarkOn(w) : E.ic.bookmark(w));

  /* ---------- Actions from the card menu ---------- */
  E.act = (kind, id) => {
    const h = E.hadith[id];
    if (kind === 'bookmark') {
      if (S.bm.has(id)) { S.bm.delete(id); Kit.snack('বুকমার্ক থেকে সরানো হয়েছে'); } else { S.bm.add(id); Kit.snack('বুকমার্ক করা হয়েছে'); }
      onChange(); renderHadith();
    } else if (kind === 'note') {
      $('#note-h').textContent = `${h.book} · হাদিস: ${h.no}`;
      $('#note-t').value = S.notes[id] || '';
      $('#note-save').onclick = () => { const v = $('#note-t').value.trim(); if (v) S.notes[id] = v; else delete S.notes[id]; Kit.close('sheet-note'); Kit.snack(v ? 'নোট সেভ হয়েছে' : 'নোট মুছে ফেলা হয়েছে'); onChange(); renderHadith(); };
      Kit.open('sheet-note');
      setTimeout(() => $('#note-t').focus(), 280);
    } else if (kind === 'copy') {
      Promise.resolve().then(() => navigator.clipboard.writeText(`${h.tr}\n\n${h.book}, হাদিস: ${h.no}`)).catch(() => { /* not allowed in this frame */ });
      Kit.snack('কপি হয়েছে');
    } else if (kind === 'share') Kit.snack('ফোনের শেয়ার মেনু খুলবে');
  };
  let menuId = null;
  E.menu = (id) => {
    menuId = id;
    const h = E.hadith[id];
    $('#menu-h').textContent = `${h.book} · হাদিস: ${h.no}`;
    $('#menu-bm').innerHTML = `${E.bmIcon(id, 22)}<span>${S.bm.has(id) ? 'বুকমার্ক সরান' : 'বুকমার্ক'}</span>`;
    $('#menu-note').innerHTML = `${E.ic.note(22)}<span>${S.notes[id] ? 'নোট দেখুন' : 'নোট'}</span>`;
    Kit.open('sheet-menu');
  };

  /* ---------- Hadith page ---------- */
  E.open = (id) => { S.hid = id; Kit.show('hadith'); };
  function renderHadith() {
    const id = S.hid, h = E.hadith[id];
    if (!h || !$('#hp-body')) return;
    $('#hp-title').innerHTML = `${h.book}<small>হাদিস: ${h.no}</small>`;
    $('#hp-body').innerHTML = `<div class="hp-sec"><b>অধ্যায়:</b> ${h.ch}</div>
      <article class="card hp-card"><div class="hadith-head"><span class="book-badge">${h.abbr}</span>
        <div class="hadith-meta"><b>${h.book}</b><span>হাদিস: ${h.no}</span></div>${E.grade(h)}
        <button class="icon-btn hp-ic${S.bm.has(id) ? ' on' : ''}" data-act="bookmark" data-id="${id}" aria-label="বুকমার্ক">${E.bmIcon(id, 20)}</button>
        <button class="icon-btn hp-ic" data-menu="${id}" aria-label="আরও">${I.more}</button></div>
        <p class="narrator hp-nar">${h.nar} থেকে বর্ণিত:</p><p class="translation">${h.tr}</p>
        ${S.notes[id] ? `<div class="hp-note"><b>আমার নোট</b>${S.notes[id]}</div>` : ''}</article>`;
  }
  E.renderHadith = renderHadith;

  /* ---------- Toolbar: Hijri date ---------- */
  E.extra = E.dates.map((d) => `<button class="kit-chip" type="button" data-date="${d.id}" title="আজকের হিজরি তারিখ">${d.label}</button>`).join('');
  function syncDates() { $$('[data-date]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.date === S.date)); }

  /* ---------- Mount ---------- */
  E.mount = (opts) => {
    onChange = opts.onChange || onChange; onDate = opts.onDate || onDate;
    const grid = opts.menu === 'grid';
    $('.phone .viewport').insertAdjacentHTML('beforeend', `
      <section class="screen" data-screen="hadith">
        <header class="appbar"><button class="icon-btn" data-go="collection" aria-label="পেছনে">${I.back}</button><h1 id="hp-title"></h1></header>
        <div class="hp-rbody"><div class="hp-panel"><div class="scroll" id="hp-body" style="padding-top:14px"></div></div></div>
      </section>
      <div class="sheet${grid ? ' menu-grid' : ''}" id="sheet-menu" role="dialog" aria-label="হাদিসের মেনু">
        <div class="sheet-head"><h2 id="menu-h"></h2><button class="icon-btn" data-close aria-label="বন্ধ করুন">${I.close}</button></div>
        <div class="sheet-body"><div class="menu-rows">
          <button class="mrow" id="menu-bm" data-m="bookmark"></button>
          <button class="mrow" id="menu-note" data-m="note"></button>
          <button class="mrow" data-m="copy">${E.ic.copy(22)}<span>কপি</span></button>
          <button class="mrow" data-m="share">${E.ic.share(22)}<span>শেয়ার</span></button>
        </div></div>
      </div>
      <div class="sheet" id="sheet-note" role="dialog" aria-label="নোট">
        <div class="sheet-head"><h2>নোট<small id="note-h"></small></h2><button class="icon-btn" data-close aria-label="বন্ধ করুন">${I.close}</button></div>
        <div class="sheet-body"><textarea id="note-t" class="note-t" placeholder="এই হাদিস নিয়ে আপনার নোট লিখুন"></textarea></div>
        <div class="sheet-foot"><button class="btn text" data-close>বাতিল</button><button class="btn" id="note-save">সেভ করুন</button></div>
      </div>`);
    document.addEventListener('click', (e) => {
      const m = e.target.closest('[data-m]');
      if (m) { const id = menuId; Kit.close('sheet-menu'); E.act(m.dataset.m, id); return; }
      const a = e.target.closest('[data-act]');
      if (a && a.closest('.phone')) { e.stopPropagation(); E.act(a.dataset.act, a.dataset.id); return; }
      const mn = e.target.closest('[data-menu]');
      if (mn && mn.closest('.phone')) { e.stopPropagation(); E.menu(mn.dataset.menu); return; }
      const d = e.target.closest('[data-date]');
      if (d) { S.date = d.dataset.date; syncDates(); onDate(); }
    });
    Kit.onScreen((id) => { if (id === 'hadith') { if (!S.hid || !E.ev().ids.includes(S.hid)) S.hid = E.ev().ids[0]; renderHadith(); } });
    setTimeout(syncDates, 0);
  };
})();
