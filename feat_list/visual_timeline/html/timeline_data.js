/* =====================================================================
   ভিজ্যুয়াল টাইমলাইন — ৫টা ডেমোর শেয়ার করা ডেটা, স্টেট আর হেল্পার।
   - ঘটনা, সাল আর জায়গা: সুপরিচিত তথ্য, অল্প কয়েকটা। আসল তালিকা আলেমরা দেবেন।
   - হাদিস নম্বর, বর্ণনাকারী আর পরিচ্ছেদের নাম IRD bukhari_bn.db থেকে (ঘটনার পরিচ্ছেদ থেকে বাছা)।
   - হাদিসের পুরো লেখা শুধু নিশ্চিত তালিকার বুখারি ১-এর জন্য; বাকি কার্ডে লেখা নেই,
     ট্যাপ করলে স্ন্যাকবার বলে হাদিসটা খুলবে। আরবি নেই।
   ===================================================================== */
(function () {
  'use strict';
  const p = (d, w = 24) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

  /* ---------- Icons ---------- */
  const ICON = {
    timeline: (w) => p('<path d="M6 3v18"/><circle cx="6" cy="7" r="2.2"/><circle cx="6" cy="17" r="2.2"/><path d="M10 7h10M10 17h7M10 12h5"/>', w),
    clock: (w) => p('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', w),
    pin: (w) => p('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>', w),
  };

  /* ---------- Home quick actions (row 1 keeps সাদাকা; টাইমলাইন joins row 2) ---------- */
  const QA = [
    ['latest', 'সর্বশেষ', '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'],
    ['goTo', 'জাম্প', '<path d="M5 19 19 5"/><path d="M9 5h10v10"/>'],
    ['prayer', 'ওয়াক্ত', '<path d="M4 20h16M6 20v-7a6 6 0 0 1 12 0v7"/><path d="M12 4v3M10 20v-4a2 2 0 0 1 4 0v4"/>'],
    ['sadaqa', 'সাদাকা', '<path d="M12 20s-7-4.2-7-9.5A3.8 3.8 0 0 1 12 8.2a3.8 3.8 0 0 1 7 2.3C19 15.8 12 20 12 20z"/>'],
    ['timeline', 'টাইমলাইন', null],
    ['feed', 'ফিড', '<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/>'],
    ['reels', 'রিলস', '<rect x="5" y="3.5" width="14" height="17" rx="3"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>'],
    ['quiz', 'কুইজ', '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.5a2.3 2.3 0 0 1 4.4.9c0 1.6-2.2 2-2.2 3.4M12 16.8v.2"/>'],
  ];
  function homeHTML() {
    const tile = ([k, label, d]) => k === 'timeline'
      ? `<button class="qa-tile new" data-act="home-tl"><span class="qa-ic">${ICON.timeline(28)}</span>${label}</button>`
      : `<button class="qa-tile" data-snack="${label} খুলবে — এই ফিচারের অংশ নয়"><span class="qa-ic">${p(d, 28)}</span>${label}</button>`;
    const rows = [];
    for (let i = 0; i < QA.length; i += 4) rows.push(`<div class="qa-row">${QA.slice(i, i + 4).map(tile).join('')}</div>`);
    return `<div class="qa">${rows.join('')}</div>`;
  }
  document.head.insertAdjacentHTML('beforeend', `<style>
    .qa{background:var(--card);border-radius:20px;box-shadow:var(--shadow);margin:14px 12px;padding:12px 0 10px}
    .qa-row{display:grid;grid-template-columns:repeat(4,1fr)}
    .qa-tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 4px 8px;border-radius:10px;font-size:14px;font-weight:700;color:var(--body);text-align:center}
    .qa-tile:hover{background:var(--surface-2)}
    .qa-tile.new{outline:2px dashed var(--primary);outline-offset:-4px}
    .qa-ic{color:var(--primary)}
  </style>`);

  /* ---------- Eras and events (time order). Events with no hadith never show. ---------- */
  const ERAS = [
    { id: 'makki', name: 'মক্কি যুগ', span: '৬১০–৬২২ খ্রি.' },
    { id: 'madani', name: 'মাদানি যুগ', span: '১–১১ হিজরি' },
  ];
  const EVENTS = [
    { id: 'wahy', era: 'makki', year: '৬১০ খ্রি.', name: 'ওহির সূচনা', place: 'হেরা গুহা, মক্কা', hadith: ['b3', 'b4'] },
    { id: 'habasha', era: 'makki', year: '৬১৫ খ্রি.', name: 'হাবশায় হিজরত', place: 'হাবশা', hadith: ['b3872', 'b3873', 'b3874', 'b3875', 'b3876'] },
    { id: 'hijrah', era: 'madani', year: '১ হিজরি', name: 'মদিনায় হিজরত', place: 'মক্কা থেকে মদিনা', hadith: ['b1', 'b3898', 'b3899'] },
    { id: 'badr', era: 'madani', year: '২ হিজরি', name: 'বদর যুদ্ধ', place: 'বদর', hadith: ['b3950', 'b3955', 'b3956', 'b3982'] },
    { id: 'uhud', era: 'madani', year: '৩ হিজরি', name: 'উহুদ যুদ্ধ', place: 'উহুদ পাহাড়, মদিনা', hadith: ['b4041', 'b4042', 'b4073', 'b4083'] },
    { id: 'khandaq', era: 'madani', year: '৫ হিজরি', name: 'খন্দক যুদ্ধ', place: 'মদিনা', hadith: ['b4097', 'b4098', 'b4100'] },
    { id: 'fath', era: 'madani', year: '৮ হিজরি', name: 'মক্কা বিজয়', place: 'মক্কা', hadith: ['b4275', 'b4276', 'b4280'] },
    { id: 'wada', era: 'madani', year: '১০ হিজরি', name: 'বিদায় হজ', place: 'আরাফার ময়দান', hadith: ['b4395', 'b4402', 'b4406'] },
  ];

  /* ---------- Hadith (Sahih al-Bukhari, all সহিহ). text only for the safe hadith. ---------- */
  const W = 'আল্লাহর রসূল (সাঃ)-এর প্রতি কীভাবে ওহী শুরু হয়েছিল।', HB = 'হাবশায় হিজরত।', HJ = 'নবী (সাঃ) এবং তাঁর সাহাবীদের মদীনায় হিজরত।';
  const H = {
    b1: { no: 1, ch: 'ওহীর সূচনা অধ্যায়', sec: W, nar: '‘আলক্বামাহ ইব্‌নু ওয়াক্কাস আল-লায়সী (রহঃ)', ev: 'hijrah',
      text: 'আমি উমর ইবনুল খাত্তাব (রাঃ)-কে মিম্বরের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রসূল (সাঃ)-কে বলতে শুনেছিঃ আমল (এর প্রাপ্য হবে) নিয়ত অনুযায়ী। আর মানুষ তার নিয়ত অনুযায়ী প্রতিফল পাবে।\n\nতাই যার হিজরত হবে দুনিয়া লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশ্যে- তবে তার হিজরত সে উদ্দেশ্যেই হবে, যে জন্যে, সে হিজরত করেছে।' },
    b3: { no: 3, sec: W, nar: 'উম্মুল মু’মিনীন ‘আয়িশা (রাঃ)' },
    b4: { no: 4, sec: W, nar: 'জাবির ইব্‌নু ‘আবদুল্লাহ্‌ আনসারী (রাঃ)' },
    b3872: { no: 3872, sec: HB, nar: 'উবাইদুল্লাহ ইব্‌নু ‘আদী ইব্‌নু খিয়ার (রহঃ)' },
    b3873: { no: 3873, sec: HB, nar: 'আয়িশাহ (রাঃ)' },
    b3874: { no: 3874, sec: HB, nar: 'উম্মু খালিদ (রাঃ)' },
    b3875: { no: 3875, sec: HB, nar: 'আবদুল্লাহ ইব্‌নু মাস\'উদ (রাঃ)' },
    b3876: { no: 3876, sec: HB, nar: 'আবূ মুসা (রাঃ)' },
    b3898: { no: 3898, sec: HJ, nar: 'উমার (রাঃ)' },
    b3899: { no: 3899, sec: HJ, nar: 'আবদুল্লাহ ইব্‌নু ‘উমার (রাঃ)' },
    b3950: { no: 3950, sec: 'বদর যুদ্ধে নিহতদের ব্যাপারে নবী (সাঃ)-এর ভবিষ্যদ্বাণী', nar: 'সা’দ ইব্‌নু মু‘আয (রাঃ)' },
    b3955: { no: 3955, sec: 'বদর যুদ্ধে যোগদানকারীর সংখ্যা', nar: 'বারা (রাঃ)' },
    b3956: { no: 3956, sec: 'বদর যুদ্ধে যোগদানকারীর সংখ্যা', nar: 'বারা (রাঃ)' },
    b3982: { no: 3982, sec: 'বদর যুদ্ধে যোগদানকারীগণের মর্যাদা', nar: 'আনাস (রাঃ)' },
    b4041: { no: 4041, sec: 'উহুদ যুদ্ধ', nar: 'ইবনু আব্বাস (রাঃ)' },
    b4042: { no: 4042, sec: 'উহুদ যুদ্ধ', nar: 'উকবাহ ইবনু ‘আমির (রাঃ)' },
    b4073: { no: 4073, sec: 'উহুদের দিন রসূলুল্লাহ (সাঃ)-এর আঘাতপ্রাপ্ত হওয়ার ঘটনা', nar: 'আবূ হুরায়রা (রাঃ)' },
    b4083: { no: 4083, sec: 'উহুদ (পাহাড়) আমাদেরকে ভালোবাসে', nar: 'ক্বাতাদাহ (রহঃ)' },
    b4097: { no: 4097, sec: 'খন্দকের যুদ্ধ। এ যুদ্ধকে আহযাবের যুদ্ধও বলা হয়', nar: 'ইবনু ‘উমার (রাঃ)' },
    b4098: { no: 4098, sec: 'খন্দকের যুদ্ধ। এ যুদ্ধকে আহযাবের যুদ্ধও বলা হয়', nar: 'সাহল ইবনু সাদ (রাঃ)' },
    b4100: { no: 4100, sec: 'খন্দকের যুদ্ধ। এ যুদ্ধকে আহযাবের যুদ্ধও বলা হয়', nar: 'আনাস (রাঃ)' },
    b4275: { no: 4275, sec: 'রমজান মাসে সংঘটিত মাক্কা বিজয়ের যুদ্ধ', nar: 'ইবনু \'আব্বাস (রাঃ)' },
    b4276: { no: 4276, sec: 'রমজান মাসে সংঘটিত মাক্কা বিজয়ের যুদ্ধ', nar: 'ইবনু \'আব্বাস (রাঃ)' },
    b4280: { no: 4280, sec: 'মাক্কা বিজয়ের দিনে নবী (সাঃ) কোথায় ঝাণ্ডা স্থাপন করেছিলেন', nar: '‘উরওয়াহ ইবনু যুবায়র (রহঃ)' },
    b4395: { no: 4395, sec: 'বিদায় হাজ্জ', nar: 'আয়িশাহ (রাঃ)' },
    b4402: { no: 4402, sec: 'বিদায় হাজ্জ', nar: 'ইবনু \'উমার (রাঃ)' },
    b4406: { no: 4406, sec: 'বিদায় হাজ্জ', nar: 'আবূ বাক্‌রাহ (রাঃ)' },
  };
  const GRADE = 'সহিহ হাদিস';

  /* ---------- State + helpers (same in all demos) ---------- */
  const S = { ev: 'wada', hk: 'b1', focus: null };
  const evById = (id) => EVENTS.find((e) => e.id === id);
  const timeLine = (hk) => { const e = evById(H[hk].ev); return e ? `${e.year} · ${e.name} · ${e.place}` : ''; };
  const paras = (t) => t.split(/\n+/).map((x) => `<p class="translation">${x}</p>`).join('');
  /* A hadith card in an event list: open the details page (only hadith with text here),
     the others would open their own hadith page in the app. */
  function openHadith(hk, go) {
    if (H[hk].text) { S.hk = hk; go('detail'); }
    else Kit.snack(`সহীহ বুখারী, হাদিস ${Kit.bn(H[hk].no)} খুলবে`);
  }

  /* Scroll a list so `el` sits near its top (used by the era buttons and by "open at this event") */
  function scrollTo(box, el, pad = 8, smooth = true) {
    if (!box || !el) return;
    const top = box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - pad;
    box.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  }
  /* Which era is on screen: the last [data-era-start] whose top has passed the list's top */
  function watchEra(box, cb) {
    if (!box) return;
    const check = () => {
      let cur = ERAS[0].id;
      box.querySelectorAll('[data-era-start]').forEach((el) => { if (el.getBoundingClientRect().top - box.getBoundingClientRect().top < 60) cur = el.dataset.eraStart; });
      cb(cur);
    };
    box.addEventListener('scroll', check, { passive: true });
    check();
  }

  window.TL = { ICON, ERAS, EVENTS, H, GRADE, S, homeHTML, evById, timeLine, paras, openHadith, scrollTo, watchEra,
    SCREENS: [
      { id: 'home', label: 'হোম' },
      { id: 'timeline', label: 'টাইমলাইন' },
      { id: 'event', label: 'ঘটনার হাদিস' },
      { id: 'chapter', label: 'অধ্যায়ে পড়া' },
      { id: 'detail', label: 'হাদিসের বিস্তারিত' },
      { id: 'jump', label: 'সময় থেকে টাইমলাইন' },
    ] };
})();
