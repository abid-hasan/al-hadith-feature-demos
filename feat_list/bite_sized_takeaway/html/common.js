/* =====================================================================
   ছোট টেকঅ্যাওয়ে — shared part of demo1…demo5 (load after kit.js).
   Holds what is the same in every demo: the real hadith data, today's
   hadith card, details page and a minimal more-options sheet. Each demo
   passes hooks that place its own "মূল শিক্ষা" box. Real data:
   database_sources/hadith.db + the Bangla book databases. Only POINTS
   is a sample (নমুনা).
   ===================================================================== */
window.BST = (function () {
  'use strict';
  const { bn, icons, $, $$ } = Kit;

  /* ---------- Data: copied as-is from the app's book databases ---------- */
  const DATA = [
    {
      "book": "সহীহ মুসলিম",
      "book_short": "মুসলিম",
      "id": "1",
      "number": "১",
      "narrator": "ইয়াহ্‌ইয়া ইবনু ইয়া‘মার",
      "translation": "বাসরার অধিবাসী মা’বাদ জুহাইনি প্রথম ব্যক্তি যে তাকদীর অস্বীকার করে। আমি ও হুমায়দ ইবনু আবদুর রহমান উভয়ে হজ্জ অথবা উমরার উদ্দেশ্যে রওয়ানা করলাম। আমরা বললাম, যদি আমরা এ সফরে রাসূলুল্লাহ (ﷺ) এর যে কোন সাহাবীর সাক্ষাৎ পেয়ে যাই তাহলে ঐ সব লোক তাকদীর সম্বন্ধে যা কিছু বলে সে সম্পর্কে তাঁকে জিজ্ঞেস করব। সৌভাগ্যক্রমে আমরা আব্দুল্লাহ ইবনু উমর (রাঃ)-এর মসজিদে ঢোকার পথে পেয়ে গেলাম। আমি ও আমার সাথী তাঁকে এমনভাবে ঘিরে নিলাম যে, আমাদের একজন তাঁর ডানে এবং অপরজন তাঁর বামে থাকলাম। আমি মনে করলাম আমার সাথী আমাকেই কথা বলার সুযোগ দেবে। (কারণ আমি ছিলাম বাকপটু)।\n\nআমি বললাম : “হে আবু আব্দুর রহমান! আমাদের এলাকায় এমন কিছু লোকের আবির্ভাব ঘটেছে, তারা একদিকে কুরআন পাঠ করে অপরদিকে জ্ঞানের অন্বেষণও করে। ইয়াহিয়া তাদের কিছু গুণাবলীর কথাও উল্লেখ করলেন। তাদের ধারণা (বক্তব্য) হচ্ছে, তাকদীর বলতে কিছু নেই এবং প্রত্যেক কাজ অকস্মাৎ সংঘটিত হয়।” ইবনু উমর (রাঃ) বললেনঃ “যখন তুমি এদের সাথে সাক্ষাৎ করবে তখন তাদেরকে জানিয়ে দাও যে, তাদের সাথে আমার কোন সম্পর্ক নেই, আর আমার সাথেও তাদের কোন সম্পর্ক নেই। আব্দুল্লাহ ইবনু উমর (রাঃ) আল্লাহর নামে শপথ করে বললেন, এদের কারো কাছে যদি উহুদ পাহাড় পরিমাণ স্বর্ণ থাকে এবং তা দান-খয়রাত করে দেয় তবে আল্লাহ তাঁর এ দান গ্রহণ করবেন না যতক্ষণ পর্যন্ত সে তাকদীরের উপর ঈমান না আনবে। অতঃপর তিনি বললেন, আমার পিতা উমর ইবনুল খাত্তাব (রাঃ) আমার কাছে বর্ণনা করেছেন, তিনি বলেনঃ একদা আমরা রাসূলুল্লাহ (ﷺ)-এর নিকট উপস্থিত ছিলাম। এমন সময় এক ব্যক্তি আমাদের সামনে আবির্ভূত হলো। তার পরনের কাপড়-চোপড় ছিল ধবধবে সাদা এবং মাথার চুলগুলো ছিল মিশমিশে কালো। সফর করে আসার কোন চিহ্নও তাঁর মধ্যে দেখা যায়নি। আমাদের কেউই তাঁকে চিনেও না।\n\nঅবশেষে সে নবী (ﷺ)-এর সামনে বসলো। সে তাঁর হাঁটুদ্বয় নবী (ﷺ)-এর হাঁটুদ্বয়ের সাথে মিলিয়ে দিলো এবং দুই হাতের তালু তাঁর (অথবা নিজের) উরুর উপর রাখলো এবং বললো, হে মুহাম্মাদ (ﷺ)! আমাকে ইসলাম সম্বন্ধে বলুন। রাসূলুল্লাহ (ﷺ) বললেনঃ ইসলাম হচ্ছে এই- তুমি সাক্ষ্য দিবে যে, আল্লাহ ছাড়া প্রকৃতপক্ষে কোন ইলাহ (মাবুদ) নেই, এবং মুহাম্মাদ (ﷺ) আল্লাহর রাসূল, সালাত কায়েম করবে, যাকাত আদায় করবে, রমযানের সাওম পালন করবে এবং যদি পথ অতিক্রম করার সামর্থ্য হয় তখন বাইতুল্লাহর হজ্জ করবে। সে বললো, আপনি সত্যই বলেছেন। বর্ণনাকারী [উমর (রাঃ)] বলেন, আমরা তাঁর কথা শুনে আশ্চর্যান্বিত হলাম। কেননা সে (অজ্ঞের ন্যায়) প্রশ্ন করছে আর (বিজ্ঞের ন্যায়) সমর্থন করছে।\n\nএরপর সে বললো, আমাকে ঈমান সম্পর্কে বলুন। রাসূলুল্লাহ (ﷺ) বললেনঃ ঈমান এই যে, তুমি আল্লাহ, তাঁর ফেরেশতাকুল, তাঁর কিতাবসমূহ, তাঁর প্রেরিত নবীগণ ও শেষ দিনের উপর ঈমান রাখবে এবং তুমি তাকদীর ও এর ভালো ও মন্দের প্রতিও ঈমান রাখবে। সে বললো, আপনি সত্যই বলেছেন। এবার সে বললো, আমাকে ‘ইহসান’ সম্পর্কে বলুন। রাসূলুল্লাহ (ﷺ) বললেনঃ ‘ইহসান’ এই যে, তুমি এমনভাবে আল্লাহর ইবাদত করবে যেন তাঁকে দেখছো, যদি তাকে না দেখো তাহলে তিনি তোমাকে দেখছেন বলে অনুভব করবে।\n\nএবার সে জিজ্ঞেস করলো, আমাকে কেয়ামত সম্বন্ধে বলুন! রাসূলুল্লাহ (ﷺ) বললেনঃ এ ব্যাপারে জিজ্ঞাসাকারীর চেয়ে জিজ্ঞাসিত ব্যক্তি বেশি কিছু জানে না। অতঃপর সে বললো, তাহলে আমাকে এর কিছু নিদর্শন বলুন। তিনি বললেন, দাসী তাঁর মনিবকে প্রসব করবে এবং (এককালের) নগ্নপদ, বস্ত্রহীন, দরিদ্র, ছাগলের রাখালদের বড় দালান-কোঠা নির্মাণের প্রতিযোগিতায় গর্ব-অহংকারে মত্ত দেখতে পাবে।\n\nবর্ণনাকারী [উমর (রাঃ)] বলেন, এরপর লোকটি চলে গেলো। আমি বেশ কিছুক্ষণ অপেক্ষা করলাম। তারপর রাসূলুল্লাহ (ﷺ) আমাকে বললেন, হে উমর! তুমি জান, এ প্রশ্নকারী কে? আমি আরজ করলাম, আল্লাহ ও তাঁর রাসূলই অধিক জ্ঞাত আছেন। রাসূলুল্লাহ (ﷺ) বললেন, তিনি জিবরাইল। তোমাদের কাছে তিনি তোমাদের দ্বীন শিক্ষা দিতে এসেছিলেন।",
      "grade": "সহিহ হাদিস"
    },
    {
      "book": "সহীহ মুসলিম",
      "book_short": "মুসলিম",
      "id": "422",
      "number": "৪২২",
      "narrator": "আবূ মালিক আল আশ’আরী (রাঃ)",
      "translation": "রাসূলুল্লাহ (ﷺ) বলেছেন: পবিত্রতা হল ঈমানের অর্ধেক অংশ। ‘আলহামদুলিল্লাহ’ মীজানের পরিমাপকে পরিপূর্ণ করে দিবে এবং “সুবহানাল্লাহ ওয়াল হামদুলিল্লাহ” আসমান ও জমীনের মধ্যবর্তী স্থানকে পরিপূর্ণ করে দিবে। ‘সালাত’ হচ্ছে একটি উজ্জ্বল জ্যোতি। ‘সাদাকা’ হচ্ছে দলিল। ‘ধৈর্য’ হচ্ছে জ্যোতির্ময়। আর ‘আল কুরআন’ হবে তোমার পক্ষে অথবা বিপক্ষে প্রমাণস্বরূপ। বস্তুতঃ সকল মানুষই প্রত্যেক ভোরে নিজেকে আমলের বিনিময়ে বিক্রি করে। তার আমল দ্বারা সে নিজেকে (আল্লাহর আজাব থেকে) মুক্ত করে অথবা সে তার নিজের ধ্বংস সাধন করে।",
      "grade": "সহিহ হাদিস"
    },
    {
      "book": "সহীহ বুখারী",
      "book_short": "বুখারী",
      "id": "1",
      "number": "১",
      "narrator": "‘আলক্বামাহ ইব্‌নু ওয়াক্কাস আল-লায়সী (রহঃ)",
      "translation": "আমি উমর ইবনুল খাত্তাব (রাঃ)-কে মিম্বরের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রসূল (ﷺ)-কে বলতে শুনেছিঃ আমল (এর প্রাপ্য হবে) নিয়ত অনুযায়ী। আর মানুষ তার নিয়ত অনুযায়ী প্রতিফল পাবে।\n\nতাই যার হিজরত হবে দুনিয়া লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশ্যে- তবে তার হিজরত সে উদ্দেশ্যেই হবে, যে জন্যে, সে হিজরত করেছে।",
      "grade": "সহিহ হাদিস"
    },
    {
      "book": "সহীহ বুখারী",
      "book_short": "বুখারী",
      "id": "6116",
      "number": "৬১১৬",
      "narrator": "আবূ হুরায়রা (রাঃ)",
      "translation": "এক ব্যক্তি নবী (ﷺ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বললেন, নবী (ﷺ) প্রত্যেক বারেই বললেন: রাগ করো না।",
      "grade": "সহিহ হাদিস"
    }
  ];
  // Hexagon badge = the book's abvr_code + color_code from the books table
  const BOOKS = { 'সহীহ মুসলিম': { abbr: 'M', color: '#2d91c2' }, 'সহীহ বুখারী': { abbr: 'B', color: '#70bb65' } };
  const H = {};
  DATA.forEach((d) => {
    const key = (d.book_short === 'মুসলিম' ? 'm' : 'b') + d.id;
    H[key] = { id: key, book: d.book, no: d.number, grade: d.grade, nar: d.narrator,
      tr: d.translation, ...BOOKS[d.book] };
  });
  // The only invented content: the md's own example for হাদিসে জিবরিল (সহীহ মুসলিম ১).
  // In the app these would come verified with the book data. Every other hadith has none.
  const POINTS = ['ইসলাম কী', 'ঈমান কী', 'ইহসান কী'];
  H.m1.points = POINTS;

  // m1 = long + verified points (box). The rest have nothing verified (no box).
  const LISTS = { list: ['m1', 'm422'], nobox: ['b1', 'b6116'] };
  const TITLES = { list: 'সহীহ মুসলিম', nobox: 'সহীহ বুখারী' };

  /* ---------- State ---------- */
  const st = { cur: 'm1', from: 'list', collapsed: new Set() };
  let hooks = {};

  /* ---------- Small helpers ---------- */
  const ic = (k, w) => (w ? icons[k].replace('width="24" height="24"', `width="${w}" height="${w}"`) : icons[k]);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const paras = (s) => s.split(/\n{2,}/).map((p) => `<p class="translation">${esc(p)}</p>`).join('');
  const sample = '<span class="tag" title="এই লেখা অ্যাপে এখনো নেই">নমুনা</span>';
  // Small icon next to "মূল শিক্ষা"
  const bulb = (w = 16) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>`;

  /* ---------- Hadith card: head → [top] → Arabic → [mid] → narrator → translation ---------- */
  function head(h) {
    return `<div class="hadith-head">
      <span class="book-badge" style="background:${h.color}" aria-label="${h.book}">${h.abbr}</span>
      <div class="hadith-meta"><b>${h.book}</b><span>হাদিস: ${h.no}</span></div>
      <span class="grade">${h.grade}</span>
      <button class="icon-btn" data-more="${h.id}" aria-label="হাদিস নং ${h.no}-এর অপশন">${icons.more}</button>
    </div>`;
  }
  function card(id, ctx) {
    const h = H[id];
    const s = (hooks.slots && hooks.slots(h, ctx)) || {};
    const parts = {
      head: head(h), top: s.top || '', mid: s.mid || '',
      arabic: '',  // Arabic hidden in these demos
      local: `<p class="narrator">${h.nar} থেকে বর্ণিত:</p>${paras(h.tr)}`,
    };
    const inner = hooks.card ? hooks.card(h, parts, ctx) : parts.head + parts.top + parts.arabic + parts.mid + parts.local;
    return `<article class="card hcard" data-id="${id}">${inner}</article>`;
  }

  /* ---------- Lists ---------- */
  function renderList(screen) {
    $(`#${screen}-body`).innerHTML = '<div class="top-gap"></div>' + LISTS[screen].map((id) => card(id, 'list')).join('');
  }

  /* ---------- Details page: hadith card → শিক্ষণীয় বিষয় ---------- */
  const tlist = (pts) => `<ol class="tlist">${pts.map((p, i) => `<li><b>${bn(i + 1)}</b><span>${p}</span></li>`).join('')}</ol>`;
  const teachings = (h) => (h.points ? `<div class="dcard" id="d-teach"><h3>শিক্ষণীয় বিষয় ${sample}</h3>${tlist(h.points)}</div>` : '');
  function renderDetails() {
    const h = H[st.cur];
    $('#d-title').innerHTML = `${h.book}<small>হাদিস: ${h.no}</small>`;
    const parts = {
      top: (hooks.detailsTop && hooks.detailsTop(h)) || '',
      card: card(st.cur, 'details'),
      teach: teachings(h),
    };
    $('#d-body').innerHTML = hooks.details ? hooks.details(h, parts) : parts.top + parts.card + parts.teach;
  }
  function openDetails(id) { st.cur = id; renderDetails(); applyCollapse(); Kit.show('details'); }

  /* ---------- Collapse / expand: every [data-box=id] follows one state per hadith ---------- */
  function applyCollapse() {
    $$('[data-box]').forEach((b) => {
      const c = st.collapsed.has(b.dataset.box);
      b.classList.toggle('collapsed', c);
      $$('[data-toggle]', b).forEach((t) => t.setAttribute('aria-expanded', String(!c)));
    });
  }
  function toggle(id) {
    st.collapsed.has(id) ? st.collapsed.delete(id) : st.collapsed.add(id);
    applyCollapse();
  }

  /* ---------- More-options sheet: "বিস্তারিত" (this feature's way in) + one neighbour ---------- */
  const MI = {
    details: '<path class="a" d="M3 7.5a2 2 0 0 1 2-2h7a4 4 0 0 1 4 4V28a2.5 2.5 0 0 0-2.5-2.5H5a2 2 0 0 1-2-2z"/><path class="b" d="M30 7.5a2 2 0 0 0-2-2h-7a4 4 0 0 0-4 4V28a2.5 2.5 0 0 1 2.5-2.5H28a2 2 0 0 0 2-2z"/><rect class="w" x="6.5" y="11" width="6" height="2.2" rx="1.1"/><rect class="w" x="6.5" y="15.5" width="6" height="2.2" rx="1.1"/><rect class="w" x="20.5" y="17" width="6" height="2.2" rx="1.1"/>',
    copyTr: '<rect class="b" x="10" y="3" width="19" height="22" rx="4"/><rect class="a" x="4" y="8" width="19" height="22" rx="4"/><rect class="w" x="8" y="14" width="11" height="2.4" rx="1.2"/><rect class="w" x="8" y="19" width="7" height="2.4" rx="1.2"/>',
  };
  const ACTIONS = [['details', 'বিস্তারিত'], ['copyTr', 'অনুবাদ কপি']];
  function openMenu(id) {
    st.cur = id;
    const inDetails = Kit.current === 'details';
    $('#m-ref').textContent = `${H[id].book} · হাদিস: ${H[id].no}`;
    $('#m-grid').innerHTML = ACTIONS.filter(([k]) => !(inDetails && k === 'details')).map(([k, t]) =>
      `<button class="mtile" data-act="${k}"><svg class="mi" width="34" height="34" viewBox="0 0 33 33" fill="none">${MI[k]}</svg>${t}</button>`).join('');
    Kit.open('sheet-more');
  }
  function act(k) {
    Kit.close('sheet-more');
    if (k === 'details') return openDetails(st.cur);
    Kit.snack('কপি হয়েছে');
  }

  /* ---------- Shell markup: screens + sheet ---------- */
  const bar = (title, back) => `<header class="appbar"><button class="icon-btn" aria-label="পেছনে" ${back}>${icons.back}</button><h1>${title}</h1></header>`;
  function shell() {
    const vp = $('.phone .viewport');
    vp.insertAdjacentHTML('afterbegin', `
      <section class="screen" data-screen="list">${bar(TITLES.list, 'data-snack="বইয়ের অধ্যায় তালিকায় ফিরে যাবে"')}<div class="scroll" id="list-body"></div></section>
      <section class="screen" data-screen="details"><header class="appbar"><button class="icon-btn" aria-label="পেছনে" id="d-back">${icons.back}</button><h1 id="d-title"></h1></header><div class="rbody"><div class="scroll" id="d-body"></div></div></section>
      <section class="screen" data-screen="nobox">${bar(TITLES.nobox, 'data-go="list"')}<div class="scroll" id="nobox-body"></div></section>`);
    vp.insertAdjacentHTML('beforeend', `
      <div class="sheet" id="sheet-more" role="dialog" aria-label="অন্যান্য অপশন">
        <div class="mhead"><div><h2>অন্যান্য অপশন</h2><p id="m-ref"></p></div><button class="xbtn" data-close aria-label="বন্ধ করুন">${icons.close}</button></div>
        <div class="mgrid" id="m-grid"></div></div>`);
  }

  /* ---------- Wiring ---------- */
  function wire() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-more],[data-act],[data-toggle],#d-back');
      if (!t) return;
      if (t.dataset.more) openMenu(t.dataset.more);
      else if (t.dataset.act) act(t.dataset.act);
      else if (t.dataset.toggle) toggle(t.dataset.toggle);
      else if (t.id === 'd-back') Kit.show(st.from);
    });
    Kit.onScreen((id) => {
      if (LISTS[id]) st.from = id;
      if (id === 'details') { if (!LISTS[st.from].includes(st.cur)) st.cur = LISTS[st.from][0]; renderDetails(); applyCollapse(); }
    });
  }

  /* ---------- Init: kit shell + toolbar chips that set a state instead of a screen ---------- */
  function init(o) {
    hooks = o.hooks || {};
    if (o.phoneClass) $('.phone').classList.add(o.phoneClass);
    shell();
    const VIRTUAL = {
      collapsed: () => { Kit.show('list'); st.collapsed.add('m1'); applyCollapse(); },
      details: () => { st.from = 'list'; st.cur = 'm1'; renderDetails(); applyCollapse(); },
    };
    const press = (id) => $$('.kit-chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.go === id)));
    // Each chip shows its own state, so every chip but "গোটানো" starts with the box open
    const run = (id) => {
      if (!id || !$(`.kit-chip[data-go="${id}"]`)) return;
      if (id !== 'collapsed') { st.collapsed.clear(); applyCollapse(); }
      if (VIRTUAL[id]) { VIRTUAL[id](); press(id); }
    };
    wire();
    ['list', 'nobox'].forEach(renderList);
    Kit.init({ demo: o.demo, name: o.name, screens: o.screens });
    document.addEventListener('click', (e) => { const c = e.target.closest('.kit-chip'); if (c) run(c.dataset.go); });
    window.addEventListener('message', (e) => { const m = e.data || {}; if (m.type === 'screen') run(m.id); });
    run(new URLSearchParams(location.search).get('screen'));
    if (!Kit.current) Kit.show('list');
  }

  return { init, bn, bulb, sample, tlist, ic };
})();
