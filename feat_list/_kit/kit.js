/* =====================================================================
   feat_list demo kit — page shell, screens, sheets, snackbar, icons.
   Docs: feat_list/_kit/README.md
   ===================================================================== */
(function () {
  'use strict';

  const BN = '০১২৩৪৫৬৭৮৯';
  const qs = new URLSearchParams(location.search);
  // Inside the feature viewer: it shows the controls, so tell it what we have.
  const embedded = qs.get('embed') === '1' && window.parent !== window;
  const post = (m) => { if (embedded) window.parent.postMessage(m, '*'); };
  if (embedded) document.documentElement.classList.add('kit-embed');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  /* ---------- Icons (real app SVGs where they exist) ---------- */
  const s = (d, w = 24, extra = '') =>
    `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const icons = {
    back: s('<path d="M15 5l-7 7 7 7"/>'),
    close: s('<path d="M6 6l12 12M18 6L6 18"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    more: s('<circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>'),
    check: s('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    plus: s('<path d="M12 5v14M5 12h14"/>'),
    chevron: s('<path d="M9 5l7 7-7 7"/>'),
    down: s('<path d="M6 9l6 6 6-6"/>'),
    sort: s('<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>'),
    filter: s('<path d="M4 6h16M7 12h10M10 18h4"/>'),
    mic: s('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
    share: s('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>'),
    copy: s('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>'),
    link: s('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
    info: s('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    play: s('<path d="M7 5v14l11-7z" fill="currentColor"/>'),
    pause: s('<path d="M8 5v14M16 5v14"/>'),
    book: s('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
    edit: s('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
    trash: s('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
    clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    home: s('<path d="M4 11l8-7 8 7v9H4z"/>'),
    grid: s('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
    user: s('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),
    sun: s('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>'),
    theme: s('<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor"/>', 16),
    // Real app assets
    bookmarkFilled: '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M20.58 12.26c0 3.48-.5 8.82-.5 9.02s-.21.51-.41.62c-.1.1-.2.1-.41.1-.1 0-.2 0-.4-.1l-6.22-3.29h-.2L6.22 21.9c-.2.1-.51.1-.72 0-.2-.1-.4-.31-.4-.62 0-.2-.51-5.54-.51-9.02.1-2.26.3-5.23.51-7.39A2.6 2.6 0 0 1 7.54 2.3C8.97 2.2 11 2 12.64 2s3.67.2 5.1.3a2.6 2.6 0 0 1 2.44 2.57c.2 2.16.4 5.13.4 7.39Z" fill="currentColor"/></svg>',
    folder: '<svg width="24" height="20" viewBox="0 0 24 20"><path d="M10.35 1.36A2.33 2.33 0 0 0 8.7.67H2.67A2.33 2.33 0 0 0 .34 3L.33 17a2.34 2.34 0 0 0 2.34 2.33h18.66A2.34 2.34 0 0 0 23.67 17V5.33A2.34 2.34 0 0 0 21.33 3H12z" fill="currentColor"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M15.44 4.52 11.52.6A1.7 1.7 0 0 0 9.34.38a1.6 1.6 0 0 0-.21 2.5l.39.4c.2.2.2.5 0 .75L8.14 5.41a1 1 0 0 1-.94.26l-.54-.14a5 5 0 0 0-1.91-.14 2.2 2.2 0 0 0-1.87 1.49 2.3 2.3 0 0 0 .54 2.43l1.15 1.19L.28 14.78a.67.67 0 0 0 .94.94l4.26-4.27.83.86c.56.59 1.33.94 2.14.96.27 0 .53-.04.78-.13a2.1 2.1 0 0 0 1.38-1.79 5.2 5.2 0 0 0-.14-1.9l-.14-.67a1 1 0 0 1 .26-.94l1.38-1.37a.5.5 0 0 1 .73-.02l.34.34a1.6 1.6 0 0 0 2.19.25 1.6 1.6 0 0 0 .21-2.51Z" fill="#FF2459"/></svg>',
    menuCollection: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><path d="M5 5.5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3V29l-9-5.5L5 29z" fill="#1AA483"/><path d="M5 5.5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3V9H5z" fill="#118C6E"/><circle cx="24.5" cy="23.5" r="7" fill="#FFB84D"/><path d="M24.5 20v7M21 23.5h7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>',
  };

  /* ---------- Helpers ---------- */
  const bn = (v) => String(v).replace(/\d/g, (d) => BN[d]);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Theme ---------- */
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    store.set('featKit.theme', t);
  }
  setTheme(qs.get('theme') || store.get('featKit.theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  /* ---------- Screens ---------- */
  let screens = [];
  let current = null;
  const listeners = [];

  function show(id) {
    const el = document.querySelector(`.screen[data-screen="${id}"]`);
    if (!el) return;
    closeAll();
    $$('.screen').forEach((sc) => sc.classList.toggle('on', sc === el));
    $$('.kit-chip').forEach((c) => c.setAttribute('aria-pressed', c.dataset.go === id));
    const chip = $(`.kit-chip[data-go="${id}"]`);
    if (chip) chip.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const sb = $('.statusbar');
    if (sb) sb.classList.toggle('light', el.dataset.status === 'light');
    current = id;
    post({ type: 'kit-screen', id });
    const sc = el.querySelector('.scroll'); if (sc && el.dataset.keepScroll === undefined) sc.scrollTop = 0;
    listeners.forEach((fn) => fn(id));
  }

  /* ---------- Sheets / dialogs ---------- */
  function scrim() { return $('.phone .scrim'); }
  function open(id) {
    const el = document.getElementById(id);
    if (!el) return;
    $$('.sheet.on, .dialog.on').forEach((o) => { if (o !== el && !el.dataset.stack) o.classList.remove('on'); });
    el.classList.add('on');
    scrim()?.classList.add('on');
  }
  function close(id) {
    const el = typeof id === 'string' ? document.getElementById(id) : id;
    el?.classList.remove('on');
    if (!$('.sheet.on, .dialog.on')) scrim()?.classList.remove('on');
  }
  function closeAll() {
    $$('.sheet.on, .dialog.on').forEach((o) => o.classList.remove('on'));
    scrim()?.classList.remove('on');
  }

  /* ---------- Snackbar ---------- */
  let snackTimer;
  function snack(text, action) {
    const el = $('.phone .snack');
    if (!el) return;
    el.innerHTML = `<span>${text}</span>${action ? `<button type="button">${action.label}</button>` : ''}`;
    if (action) el.querySelector('button').onclick = () => { el.classList.remove('on'); action.onClick?.(); };
    el.classList.add('on');
    clearTimeout(snackTimer);
    snackTimer = setTimeout(() => el.classList.remove('on'), 2600);
  }

  /* ---------- Fit the phone to the window ----------
     Phones take the full height (only the phone scrolls); wide tablet
     frames keep their size and are scaled down when they don't fit. */
  function fit() {
    const phone = $('.phone');
    const stage = $('.kit-stage');
    if (!phone || !stage) return;
    phone.style.zoom = '';
    phone.style.height = '';
    const cs = getComputedStyle(stage);
    const w = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const h = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const frame = matchMedia('(max-width:480px)').matches && !embedded ? 0 : 22;
    const pw = phone.offsetWidth;
    const ph = phone.offsetHeight;
    let z;
    if (pw <= 480) {
      z = Math.min(1, (w - frame) / pw);
      phone.style.height = `${Math.max(320, (h - frame) / z)}px`;
    } else {
      z = Math.min(1, (w - frame) / pw, (h - frame) / ph);
    }
    if (z > 0 && z < 1) phone.style.zoom = z;
  }

  /* ---------- Demo-specific toolbar controls ---------- */
  const extraButtons = () => $$('.kit-extra button');
  const extrasInfo = () => extraButtons().map((b, i) => ({
    i, label: (b.textContent || b.getAttribute('aria-label') || '').trim(),
    pressed: b.getAttribute('aria-pressed'),
  }));

  /* ---------- Build shell ---------- */
  function init(opts) {
    screens = opts.screens || [];
    const side = document.createElement('aside');
    side.className = 'kit-side';
    side.innerHTML = `<div class="kit-name"><small>ডেমো ${bn(opts.demo)}</small>${opts.name}</div>
      <div class="kit-label">স্ক্রিন</div>
      <nav class="kit-chips" aria-label="স্ক্রিন">${screens.map((sc) =>
        `<button class="kit-chip" type="button" data-go="${sc.id}" aria-pressed="false">${sc.label}</button>`).join('')}</nav>
      <div class="kit-extra">${opts.extra || ''}</div>
      <button class="kit-btn" type="button" data-kit-theme aria-label="লাইট/ডার্ক মোড">${icons.theme}লাইট/ডার্ক</button>`;
    document.body.append(side);

    const phone = $('.phone');
    if (phone && !$('.statusbar', phone)) {
      phone.insertAdjacentHTML('afterbegin', `<div class="statusbar"><span>${bn('9:41')}</span><span class="sys">
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" stroke="currentColor" fill="none" opacity=".5"/><rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor"/><rect x="22.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".5"/></svg></span></div>`);
    }
    const vp = $('.viewport', phone || document);
    if (vp) {
      if (!$('.scrim', vp)) vp.insertAdjacentHTML('beforeend', '<div class="scrim"></div>');
      if (!$('.snack', vp)) vp.insertAdjacentHTML('beforeend', '<div class="snack" role="status" aria-live="polite"></div>');
      // Sheets and dialogs live inside the viewport so they stay inside the phone.
      $$('.sheet, .dialog').forEach((el) => { if (!vp.contains(el)) vp.appendChild(el); });
    }

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-go],[data-open],[data-close],[data-snack],[data-kit-theme]');
      if (t) {
        if (t.matches('[data-kit-theme]')) setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
        if (t.dataset.close !== undefined) t.dataset.close ? close(t.dataset.close) : close(t.closest('.sheet,.dialog'));
        if (t.dataset.go) show(t.dataset.go);
        if (t.dataset.go && t.matches('.kit-chip')) post({ type: 'kit-screen', id: t.dataset.go });
        if (t.dataset.open) open(t.dataset.open);
        if (t.dataset.snack) snack(t.dataset.snack);
      }
      if (e.target.classList.contains('scrim')) closeAll();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

    window.addEventListener('message', (e) => {
      const m = e.data || {};
      if (m.type === 'screen' && m.id) {
        // Go through the chip so demo-specific chips (a sheet, a state on the
        // same screen) run their own handlers too.
        const chip = $(`.kit-chip[data-go="${m.id}"]`);
        if (chip) chip.click(); else show(m.id);
      }
      if (m.type === 'theme' && m.id) setTheme(m.id);
      if (m.type === 'extra') extraButtons()[m.i]?.click();
    });

    fit();
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    post({ type: 'kit-ready', demo: opts.demo, name: opts.name, screens: screens.map(({ id, label }) => ({ id, label })), extras: extrasInfo() });
    // The demo's own toolbar controls (opts.extra) are mirrored in the viewer.
    const extra = $('.kit-extra');
    if (embedded && extra) {
      new MutationObserver(() => post({ type: 'kit-extras', extras: extrasInfo() }))
        .observe(extra, { subtree: true, childList: true, attributes: true, characterData: true });
    }

    // ?screen=<id> (or ?screenLabel=<chip label> when the ids differ between
    // demos) opens that screen; the viewer uses it to keep the screen when
    // switching demos. Asked-for screens go through their chip, after the
    // demo's own script has wired its chip handlers.
    const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
    const want = screens.find((sc) => sc.id === qs.get('screen'))
      || (qs.get('screenLabel') && screens.find((sc) => norm(sc.label) === norm(qs.get('screenLabel'))));
    if (screens[0]) show(screens[0].id);
    if (want && want !== screens[0]) {
      setTimeout(() => {
        const chip = $(`.kit-chip[data-go="${want.id}"]`);
        if (chip) chip.click(); else show(want.id);
      }, 0);
    }
  }

  window.Kit = { init, show, open, close, closeAll, snack, bn, icons, $, $$, onScreen: (fn) => listeners.push(fn), get current() { return current; } };
})();
