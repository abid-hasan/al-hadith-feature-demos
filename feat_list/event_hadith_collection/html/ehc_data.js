/* =====================================================================
   ইভেন্ট ভিত্তিক হাদিস সংকলন — shared demo data and helpers for demo1..demo5.
   - dates: the Hijri dates the toolbar can set (the same rule as popular search)
   - events: each event's collection (chosen by scholars; ships as data)
   - hadith: the hadith in the collections (short, well-known texts only)
   - EHC.mount(): adds the parts every demo shares — the hadith page, the
     card menu sheet, the note sheet and the date buttons in the toolbar.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Dates (toolbar) → which event is on ---------- */
  const dates = [
    { id: 'r1', label: '১ রমজান', event: 'ramadan' },
    { id: 'r18', label: '১৮ রমজান', event: 'qadr' },
    { id: 's5', label: '৫ শাওয়াল', event: null },
  ];

  /* ---------- Collections ---------- */
  const events = {
    ramadan: { name: 'রমজানের হাদিস', short: 'রমজান', sub: 'রমজান ১৪৪৮ হিজরি',
      intro: 'রমজান রোজা আর ইবাদতের মাস। রোজার নিয়ত আর রোজা রেখে কথা ও আচরণ সংযত রাখা নিয়ে বাছাই করা হাদিস।',
      ids: ['b1894', 'b1', 'b6018', 'b6116'] },
    qadr: { name: 'লাইলাতুল কদরের হাদিস', short: 'লাইলাতুল কদর', sub: 'রমজানের শেষ দশ রাত',
      intro: 'রমজানের শেষ দশ রাত ইবাদতে কাটানোর সময়। নিয়ত, যিকির আর ইবাদত নিয়ে বাছাই করা হাদিস।',
      ids: ['b1', 'm223', 'b1894'] },
  };

  /* ---------- Hadith ---------- */
  const hadith = {
    b1894: { book: 'সহিহ বুখারি', abbr: 'বুখারী', no: '১৮৯৪', ch: 'সাওম (রোজা)', nar: 'আবূ হুরায়রা (রাঃ)', grade: 'সহিহ', tr: 'রোজা ঢালস্বরূপ।' },
    b1: { book: 'সহিহ বুখারি', abbr: 'বুখারী', no: '১', ch: 'ওহীর সূচনা', nar: 'উমর ইবনুল খাত্তাব (রাঃ)', grade: 'সহিহ', tr: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।' },
    b6018: { book: 'সহিহ বুখারি', abbr: 'বুখারী', no: '৬০১৮', ch: 'আচার-ব্যবহার', nar: 'আবূ হুরায়রা (রাঃ)', grade: 'সহিহ', tr: 'রাসূলুল্লাহ (সাঃ) বলেছেন: যে ব্যক্তি আল্লাহ এবং কেয়ামতের দিনে বিশ্বাস রাখে, সে যেন তার প্রতিবেশীকে কষ্ট না দেয়। যে আল্লাহ এবং কেয়ামতের দিনে বিশ্বাস রাখে, সে যেন তার মেহমানকে সম্মান করে। যে আল্লাহ এবং কেয়ামতের দিনে বিশ্বাস রাখে, সে যেন ভাল কথা বলে অথবা চুপ থাকে।' },
    b6116: { book: 'সহিহ বুখারি', abbr: 'বুখারী', no: '৬১১৬', ch: 'আচার-ব্যবহার', nar: 'আবূ হুরায়রা (রাঃ)', grade: 'সহিহ', tr: 'এক ব্যক্তি নবী (সাঃ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বললেন, নবী (সাঃ) প্রত্যেক বারেই বললেন: রাগ করো না।' },
    m223: { book: 'সহিহ মুসলিম', abbr: 'মুসলিম', no: '২২৩', ch: 'তাহারাত (পবিত্রতা)', nar: 'আবূ মালিক আল আশ’আরী (রাঃ)', grade: 'সহিহ', tr: 'রাসূলুল্লাহ (সাঃ) বলেছেন: পবিত্রতা হল ঈমানের অর্ধেক অংশ। ‘আলহামদুলিল্লাহ’ মীজানের পরিমাপকে পরিপূর্ণ করে দিবে এবং “সুবহানাল্লাহ ওয়াল হামদুলিল্লাহ” আসমান ও জমীনের মধ্যবর্তী স্থানকে পরিপূর্ণ করে দিবে। …' },
  };

  /* ---------- Icons ---------- */
  const st = (d, w = 20) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ic = {
    bookmark: (w) => st('<path d="M6 4h12v17l-6-4-6 4z"/>', w),
    bookmarkOn: (w) => `<svg width="${w || 20}" height="${w || 20}" viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    note: (w) => st('<path d="M5 4h10l4 4v12H5z"/><path d="M9 12h6M9 16h4"/>', w),
    copy: (w) => st('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>', w),
    share: (w) => st('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>', w),
    menu: (w) => st('<path d="M4 7h16M4 12h16M4 17h16"/>', w),
    // Crescent + star (event mark; uses theme tokens)
    moon: (w = 30) => `<svg width="${w}" height="${w}" viewBox="0 0 33 33" fill="none"><path d="M21 4.5A12.5 12.5 0 1 0 28.5 22 10 10 0 0 1 21 4.5z" fill="var(--accent)"/><path d="m24.5 8 1.1 2.3 2.4.3-1.8 1.7.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.7 2.4-.3z" fill="var(--accent)"/></svg>`,
    lantern: (w = 30) => `<svg width="${w}" height="${w}" viewBox="0 0 33 33" fill="none"><path d="M16.5 2v4" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><path d="M11 9h11l2 4v10l-2 4H11l-2-4V13z" fill="var(--accent)"/><path d="M13 13h7v10h-7z" fill="var(--card)" opacity=".85"/><path d="M16.5 15.5c1.4 1.4 1.4 3.6 0 5-1.4-1.4-1.4-3.6 0-5z" fill="var(--accent)"/><path d="M12 28h9" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/></svg>`,
  };
  const eventIcon = (ev, w) => (ev === 'qadr' ? ic.lantern(w) : ic.moon(w));

  /* ---------- Home quick actions (context only; simplified glyphs) ---------- */
  const qa = [['সর্বশেষ', '<circle cx="16.5" cy="16.5" r="12" fill="var(--primary)"/><path d="M16.5 10v7l4.5 3" stroke="var(--tint)" stroke-width="2.4" stroke-linecap="round"/>'],
    ['জাম্প', '<rect x="4" y="4" width="25" height="25" rx="6" fill="var(--primary)"/><path d="M11 16.5h11m-4-4 4 4-4 4" stroke="var(--tint)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'],
    ['ওয়াক্ত', '<path d="M16.5 3c4 4 9 6 9 12v14h-18V15c0-6 5-8 9-12z" fill="var(--primary)"/><rect x="13" y="20" width="7" height="9" rx="3.5" fill="var(--tint)"/>'],
    ['সাদাকা', '<path d="M16.5 27s-11-6.5-11-14a6 6 0 0 1 11-3.3A6 6 0 0 1 27.5 13c0 7.5-11 14-11 14z" fill="var(--primary)"/><circle cx="24.5" cy="8.5" r="4.5" fill="var(--accent)"/>']];
  const qaHtml = () => `<div class="qa"><div class="qa-row">${qa.map(([l, d]) => `<button class="qa-tile" data-snack="${l} — এই ফিচারের অংশ নয়"><svg width="30" height="30" viewBox="0 0 33 33" fill="none">${d}</svg>${l}</button>`).join('')}</div></div>`;
  const booksHtml = () => `<div class="bk-title">হাদিসের বই</div>${[['বুখারী', 'সহিহ বুখারি', 'ইমাম বুখারী (রহঃ)'], ['মুসলিম', 'সহিহ মুসলিম', 'ইমাম মুসলিম (রহঃ)']]
    .map(([a, n, c]) => `<button class="bk" data-snack="বইয়ের তালিকা — এই ফিচারের অংশ নয়"><span class="book-badge">${a}</span><span><b>${n}</b><small>${c}</small></span></button>`).join('')}`;

  window.EHC = { dates, events, hadith, ic, eventIcon, qaHtml, booksHtml, S: { date: 'r1', bm: new Set(), notes: {} } };
})();
