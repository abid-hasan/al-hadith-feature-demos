/* =====================================================================
   সীরাত — shared demo data and flow engine (used by demo1..demo5).
   Each demo supplies its own look as a `D` object and calls
   SeerahDemo.start(D, { demo, name }). Screens and chip labels are the
   same in all five demos so the viewer can compare them side by side.
   Scholars will provide the real text and the chapter-to-hadith links;
   the text below is short, well-known seerah only.
   ===================================================================== */
(function () {
  'use strict';
  const { bn, icons, $, $$ } = Kit;

  /* ---------- Books (two titles from the sheet) ---------- */
  const BOOKS = [
    { id: 'rahiq', name: 'আর-রাহীকুল মাখতূম', short: 'রাহীক', size: '৬.২ MB', vol: () => 1, page: (i) => 48 + i * 37 },
    { id: 'hisham', name: 'সীরাত ইবনে হিশাম', short: 'হিশাম', size: '১১.৮ MB', vol: (i) => (i < 4 ? 1 : 2), page: (i) => (i < 4 ? 112 + i * 64 : 18 + (i - 4) * 71) },
  ];

  /* ---------- Chapters. [[key]] = an inline hadith reference ---------- */
  const CH = [
    { t: 'বংশপরিচয় ও জন্ম', era: 'মক্কি জীবন', when: 'নবুওয়াতের আগে', p: [
      'নবীজি (সাঃ) মক্কার কুরাইশ বংশের বনু হাশিম গোত্রে জন্মগ্রহণ করেন। যে বছর আবরাহা হাতির বাহিনী নিয়ে কাবা ধ্বংস করতে এসেছিল, সেই বছরেই তাঁর জন্ম। তাই বছরটি হস্তীবর্ষ নামে পরিচিত।',
      'তাঁর পিতা আবদুল্লাহ তাঁর জন্মের আগেই ইন্তেকাল করেন। মায়ের নাম আমিনা। দাদা আবদুল মুত্তালিব তাঁর নাম রাখেন মুহাম্মাদ।',
      'আরবের রীতি অনুযায়ী শিশুকালে তাঁকে দুধমা হালিমা সাদিয়ার কাছে বনু সাদ গোত্রে পাঠানো হয়। সেখানে মরুভূমির খোলা পরিবেশে তিনি বেড়ে ওঠেন।'] },
    { t: 'শৈশব ও যৌবন', era: 'মক্কি জীবন', when: 'নবুওয়াতের আগে', p: [
      'ছয় বছর বয়সে তাঁর মা আমিনা ইন্তেকাল করেন। এরপর দাদা আবদুল মুত্তালিব তাঁর দেখাশোনা করেন। দুই বছর পর দাদাও মারা গেলে চাচা আবু তালিব তাঁর দায়িত্ব নেন।',
      'যৌবনে সততা আর বিশ্বস্ততার জন্য মক্কার মানুষ তাঁকে আল-আমীন বলে ডাকত। পঁচিশ বছর বয়সে তিনি খাদিজা (রাঃ)-কে বিয়ে করেন।'] },
    { t: 'নবুওয়াত ও প্রথম ওহি', era: 'মক্কি জীবন', when: 'নবুওয়াতের ১ম বছর', p: [
      'চল্লিশ বছর বয়সে তিনি হেরা গুহায় নির্জনে ইবাদত করছিলেন। সেখানে জিবরীল (আঃ) প্রথম ওহি নিয়ে আসেন। তখন সূরা আলাকের প্রথম আয়াতগুলো নাজিল হয়।',
      'ঘরে ফিরে তিনি খাদিজা (রাঃ)-কে সব জানান। খাদিজা (রাঃ) তাঁকে সান্ত্বনা দেন এবং সবার আগে ঈমান আনেন।'] },
    { t: 'মক্কায় দাওয়াত', era: 'মক্কি জীবন', when: 'নবুওয়াতের ১–১৩ বছর', p: [
      'প্রথম তিন বছর দাওয়াত চলে গোপনে। এ সময় আবু বকর (রাঃ), আলী (রাঃ) আর যায়েদ ইবনে হারিসা (রাঃ) ঈমান আনেন।',
      'এরপর তিনি সাফা পাহাড়ে দাঁড়িয়ে প্রকাশ্যে দাওয়াত দেন। কুরাইশরা মুসলমানদের ওপর নির্যাতন শুরু করে। একদল সাহাবি তখন হাবশায় হিজরত করেন।'] },
    { t: 'মদিনায় হিজরত', era: 'মাদানি জীবন', when: 'হিজরি ১', refs: ['b1'], p: [
      'মক্কায় নির্যাতন বেড়ে গেলে সাহাবিরা ছোট ছোট দলে মদিনায় চলে যেতে থাকেন। কুরাইশরা তখন নবীজিকে (সাঃ) হত্যার ষড়যন্ত্র করে।',
      'সেই রাতে আলী (রাঃ) তাঁর বিছানায় শুয়ে থাকেন। নবীজি (সাঃ) আবু বকর (রাঃ)-কে সাথে নিয়ে বের হন এবং তিন রাত সাওর গুহায় লুকিয়ে থাকেন।',
      'হিজরতের আসল মূল্য নিয়তে। হাদিসে এসেছে, সকল কাজ নিয়তের ওপর নির্ভরশীল [[b1]]।',
      'মদিনায় পৌঁছানোর আগে তিনি কুবায় কয়েক দিন থাকেন এবং সেখানে একটি মসজিদ নির্মাণ করেন। এরপর মদিনায় পৌঁছালে আনসাররা তাঁকে আনন্দের সাথে বরণ করে নেন।',
      'পরে উমর (রাঃ)-এর খিলাফতের সময় এই হিজরতের বছর থেকেই হিজরি সন গণনা শুরু হয়।'] },
    { t: 'মদিনায় নতুন সমাজ', era: 'মাদানি জীবন', when: 'হিজরি ১', p: [
      'মদিনায় এসে প্রথমেই মসজিদে নববী নির্মাণ করা হয়। নবীজি (সাঃ) নিজেও নির্মাণকাজে অংশ নেন।',
      'মক্কা থেকে আসা মুহাজির আর মদিনার আনসারদের মধ্যে তিনি ভ্রাতৃত্বের বন্ধন গড়ে দেন। আনসাররা নিজেদের সম্পদ ভাগ করে নিয়ে মুহাজিরদের পাশে দাঁড়ান।'] },
    { t: 'দ্বিতীয় হিজরির ঘটনা', era: 'মাদানি জীবন', when: 'হিজরি ২', refs: ['b1894'], p: [
      'দ্বিতীয় হিজরিতে কিবলা বায়তুল মুকাদ্দাস থেকে কাবার দিকে ফেরানো হয়।',
      'এ বছরই রমজানের রোজা ফরজ হয়। কুরআনে বলা হয়েছে, হে মুমিনগণ! তোমাদের ওপর রোজা ফরজ করা হয়েছে (সূরা আল-বাকারা ২:১৮৩)। হাদিসে রোজাকে বলা হয়েছে ঢাল [[b1894]]।',
      'একই বছর রমজান মাসে বদরের যুদ্ধ হয়। সংখ্যায় কম হয়েও মুসলমানরা এ যুদ্ধে বিজয়ী হন।'] },
    { t: 'মক্কা বিজয়', era: 'মাদানি জীবন', when: 'হিজরি ৮', p: [
      'অষ্টম হিজরিতে নবীজি (সাঃ) বিশাল বাহিনী নিয়ে মক্কায় প্রবেশ করেন। প্রায় বিনা রক্তপাতে মক্কা বিজয় হয়।',
      'কাবা থেকে সব মূর্তি সরিয়ে ফেলা হয়। যারা একসময় তাঁকে কষ্ট দিয়েছিল, তিনি তাদের সাধারণ ক্ষমা ঘোষণা করেন।'] },
    { t: 'বিদায় হজ ও ইন্তেকাল', era: 'মাদানি জীবন', when: 'হিজরি ১০–১১', p: [
      'দশম হিজরিতে তিনি সাহাবিদের নিয়ে হজ করেন। এটিই বিদায় হজ। আরাফার ময়দানে তিনি গুরুত্বপূর্ণ ভাষণ দেন।',
      'একাদশ হিজরিতে মদিনায় আয়েশা (রাঃ)-এর ঘরে তিনি ইন্তেকাল করেন। সেখানেই তাঁকে দাফন করা হয়।'] },
  ];

  /* ---------- Hadiths linked to chapters (safe list only, no Arabic) ---------- */
  const H = {
    b1: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 1, kitab: 'ওহীর সূচনা', grade: 'সহিহ হাদিস', nar: 'উমর ইবনুল খাত্তাব (রাঃ)',
      tr: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।', ch: 4 },
    b1894: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 1894, kitab: 'সাওম', grade: 'সহিহ হাদিস', nar: 'আবু হুরায়রা (রাঃ)',
      tr: 'রোজা ঢালস্বরূপ।', ch: 6 },
  };
  const ref = (k) => `${H[k].book} ${bn(H[k].no)}`;

  /* ---------- State ---------- */
  const S = { book: 'rahiq', dl: { rahiq: true, hisham: false }, ch: 4, fs: 17, hk: 'b1', hFrom: 'read', readFrom: 'toc', scroll: 0, restore: false };
  const book = (id = S.book) => BOOKS.find((b) => b.id === id);
  const src = (i = S.ch, b = book()) => `${b.name}, খণ্ড ${bn(b.vol(i))}, পৃষ্ঠা ${bn(b.page(i))}`;
  const refsOf = (i) => CH[i].refs || [];

  /* Paragraph helper: mode 'link' = inline "সহীহ বুখারী ১", 'note' = superscript number */
  function para(text, mode = 'link') {
    let n = 0;
    return text.replace(/\[\[(\w+)\]\]/g, (_, k) => {
      n += 1;
      return mode === 'note'
        ? `<button class="iref note" data-act="ref" data-k="${k}" aria-label="${ref(k)}">${bn(n)}</button>`
        : `<button class="iref" data-act="ref" data-k="${k}">${ref(k)}</button>`;
    });
  }

  /* ---------- Shared screen: the menu (only what is needed to reach "জীবনী") ---------- */
  const MENU_IC = {
    writers: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/></svg>',
    bio: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/></svg>',
    pub: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c.8-3.5 3.2-5.5 6-5.5s5.2 2 6 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.6.8 2.6 2.6 3 5.2"/></svg>',
  };
  function menuHTML() {
    const row = (ic, t, act) => `<button class="mn-row${act ? ' on' : ''}" ${act ? `data-act="${act}"` : 'tabindex="-1"'}>${MENU_IC[ic]}<span>${t}</span>${act ? icons.chevron : ''}</button>`;
    return `<div class="mn-dim"></div><nav class="mn" aria-label="মেনু">
      <div class="mn-top"><b>আল হাদিস</b><span>মেনু</span></div>
      <div class="mn-list">${row('writers', 'লেখক সম্পর্কে')}${row('bio', 'জীবনী', 'bio')}${row('pub', 'প্রকাশনী ও অনুবাদক')}</div></nav>`;
  }

  /* ---------- Shared screen: hadith details page (HadithFancyAppBar + RoundedScaffoldBody) ---------- */
  function hadithHTML(D) {
    const h = H[S.hk];
    return `<header class="appbar"><button class="icon-btn" data-act="hback" aria-label="পেছনে">${icons.back}</button><h1>${h.book}<small>হাদিস: ${bn(h.no)}</small></h1></header>
      <div class="rb"><div class="scroll" style="padding-top:14px">
        <article class="card hc"><div class="hadith-head"><span class="book-badge">${h.ab}</span><div class="hadith-meta"><b>${h.book}</b><span>হাদিস: ${bn(h.no)} · ${h.kitab}</span></div><span class="grade">${h.grade}</span></div>
          <p class="narrator">${h.nar} থেকে বর্ণিত:</p><p class="translation">${h.tr}</p>${D.hFoot ? D.hFoot(h) : ''}</article>
        ${D.hLink ? D.hLink(h) : ''}</div></div>`;
  }

  /* ---------- Engine ---------- */
  const SCREENS = [
    { id: 'menu', label: 'মেনু' },
    { id: 'section', label: 'জীবনী: সীরাত' },
    { id: 'download', label: 'ডাউনলোড' },
    { id: 'toc', label: 'সূচিপত্র' },
    { id: 'read', label: 'অধ্যায় পড়া' },
    { id: 'hadith', label: 'হাদিসে যাওয়া' },
    { id: 'link', label: 'সীরাতে পড়ুন' },
  ];
  const PAGE = { menu: 'menu', section: 'section', download: 'section', toc: 'toc', read: 'read', hadith: 'hadith', link: 'hadith' };

  function start(D, opts) {
    let internal = false;
    const go = (id) => { internal = true; Kit.show(id); internal = false; };
    const scrollEl = () => $('.screen.on .scroll');
    const setFs = () => { const sc = $('.screen[data-screen="read"]'); if (sc) sc.style.setProperty('--rfs', `${S.fs}px`); $$('[data-fsv]').forEach((e) => { e.textContent = bn(S.fs); }); };
    const openDl = (id) => { S.pending = id; if (D.openDl) { D.openDl(id); return; } const el = $('#dl'); if (el && D.dl) { el.innerHTML = D.dl(book(id)); Kit.open(el.id); } };

    function render(id) {
      const sec = $(`.screen[data-screen="${id}"]`);
      const pg = PAGE[id];
      sec.innerHTML = pg === 'menu' ? (D.menu ? D.menu() : menuHTML()) : pg === 'hadith' ? hadithHTML(D) : D[pg]();
      if (pg === 'read') {
        setFs();
        const sc = $('.scroll', sec);
        if (S.restore && sc) {
          if (S.scroll >= 0) sc.scrollTop = S.scroll;
          else $(`.iref[data-k="${S.hk}"]`, sec)?.scrollIntoView({ block: 'center' });
        } else if (sc) sc.scrollTop = 0;
        S.restore = false;
      }
      D.after?.(id, sec);
    }

    Kit.onScreen((id) => {
      if (!internal) { // a toolbar chip: set up that step
        if (id === 'section') S.dl.hisham = false;
        if (id === 'download') { S.dl.hisham = false; }
        if (id === 'toc') { S.book = 'rahiq'; }
        if (id === 'read') { S.book = 'rahiq'; S.ch = 4; S.readFrom = 'toc'; }
        if (id === 'hadith') { S.book = 'rahiq'; S.ch = 4; S.hk = 'b1'; S.hFrom = 'read'; S.scroll = -1; }
        if (id === 'link') { S.hk = 'b1894'; S.hFrom = 'link'; }
      }
      render(id);
      if (!internal && id === 'download') openDl('hisham');
    });

    const ACT = {
      bio: () => go('section'),
      sback: () => go('menu'),
      book: (el) => { const id = el.dataset.b; if (S.dl[id]) { S.book = id; go('toc'); } else openDl(id); },
      dlgo: (el) => {
        const id = el.dataset.b || S.pending;
        S.dl[id] = true; S.book = id; Kit.close('dl');
        go('toc');
        Kit.snack('ডাউনলোড হয়েছে। এখন ইন্টারনেট ছাড়াও পড়া যাবে');
      },
      tback: () => go('section'),
      ch: (el) => { S.ch = +el.dataset.c; S.readFrom = 'toc'; go('read'); },
      prev: () => { if (S.ch > 0) { S.ch -= 1; render('read'); } },
      next: () => { if (S.ch < CH.length - 1) { S.ch += 1; render('read'); } },
      ref: (el) => { S.scroll = scrollEl()?.scrollTop ?? 0; S.hk = el.dataset.k; S.hFrom = 'read'; go('hadith'); },
      hback: () => { if (S.hFrom === 'read') { S.restore = true; go('read'); } },
      seerah: () => { const h = H[S.hk]; S.book = 'rahiq'; S.ch = h.ch; S.readFrom = S.hFrom === 'link' ? 'link' : 'toc'; go('read'); },
      rback: () => { if (S.readFrom === 'link') { S.hk = 'b1894'; S.hFrom = 'link'; go('link'); } else go('toc'); },
      fs: (el) => { S.fs = Math.max(13, Math.min(25, S.fs + 2 * +el.dataset.d)); setFs(); },
    };
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-act]');
      if (!el || !el.closest('.phone')) return;
      if (ACT[el.dataset.act]) ACT[el.dataset.act](el);
      else D.act?.[el.dataset.act]?.(el);
    });

    $$('[data-ic]').forEach((b) => { b.innerHTML = icons[b.dataset.ic]; });
    Kit.init({ demo: opts.demo, name: opts.name, screens: SCREENS });
  }

  window.SeerahDemo = { start, BOOKS, CH, H, S, ref, src, refsOf, para, book };
})();
