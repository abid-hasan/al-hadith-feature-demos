/* =====================================================================
   ছবি তুলে হাদিস যাচাই — shared demo data for demo1..demo5.
   - home: the home quick-action icons (real app SVGs; "যাচাই" = ic_home_verify)
   - img:  drawn mock photos (a Facebook post screenshot, a book page, a
           photo with no text, an English poster, a quote poster). These are
           pictures, so their colours stay fixed in light and dark.
   - ocr:  what the text reader returns for each photo (with the small
           mistakes a reader makes, and the extra lines around the hadith).
   - hadith: the matches the existing "হাদিস যাচাই" returns.
   - match(text): the existing matcher, reduced to what the demos need.
   ===================================================================== */
(function () {
  'use strict';
  const F = 'font-family="Kalpurush,Noto Sans Bengali,sans-serif"';
  const T = (x, y, s, fill, txt, extra = '') => `<text x="${x}" y="${y}" font-size="${s}" fill="${fill}" ${F} ${extra}>${txt}</text>`;
  const svg = (w, h, body, cls = '') => `<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

  /* ---------- Mock photos ---------- */
  let uid = 0;
  const img = {
    // Facebook post screenshot: the flow's example (gallery)
    post: (c) => svg(300, 440, `<rect width="300" height="440" fill="#FFFFFF"/>
      <rect width="300" height="22" fill="#F0F2F5"/>${T(12, 15, 10, '#65676B', '১০:১২')}
      <circle cx="30" cy="48" r="16" fill="#2E8B6E"/><path d="M22 52c3-8 13-8 16 0" stroke="#fff" stroke-width="2" fill="none"/><circle cx="30" cy="43" r="4" fill="#fff"/>
      ${T(54, 46, 13, '#050505', 'দ্বীনের আলো', 'font-weight="700"')}${T(54, 62, 10, '#65676B', '২ ঘণ্টা আগে')}
      ${['প্রিয় নবী (সাঃ) বলেছেন—', 'এক ব্যক্তি নবী (সাঃ)-এর কাছে বলল,', 'আমাকে ওসিয়ত করুন। তিনি বললেন:', 'তুমি রাগ করো না। লোকটি কয়েকবার', 'তা বললেন, নবী (সাঃ) প্রত্যেক বারেই', 'বললেন: রাগ করো না।', '(সহিহ বুখারি)']
        .map((l, i) => T(14, 96 + i * 22, 13.5, '#050505', l)).join('')}
      ${T(14, 268, 13.5, '#1B74E4', 'যারা মানবেন আমিন লিখে শেয়ার করুন')}
      <rect x="0" y="286" width="300" height="72" fill="#E7F3EE"/>${T(150, 330, 17, '#2E8B6E', 'রাগ করো না', 'text-anchor="middle" font-weight="700"')}
      <circle cx="22" cy="378" r="7" fill="#1B74E4"/>${T(34, 382, 10.5, '#65676B', '১.২ হাজার')}${T(286, 382, 10.5, '#65676B', '৩৪০টি কমেন্ট · ৮৯০টি শেয়ার', 'text-anchor="end"')}
      <rect x="12" y="394" width="276" height="1" fill="#CED0D4"/>
      ${T(52, 422, 12, '#65676B', 'লাইক', 'text-anchor="middle"')}${T(150, 422, 12, '#65676B', 'কমেন্ট', 'text-anchor="middle"')}${T(248, 422, 12, '#65676B', 'শেয়ার', 'text-anchor="middle"')}`, c),
    // Book page photographed with the camera
    book: (c, u = ++uid) => svg(300, 420, `<rect width="300" height="420" fill="#5B4A3A"/>
      <g transform="rotate(-2 150 210)"><rect x="22" y="20" width="258" height="384" rx="3" fill="#F6EFDF"/><rect x="22" y="20" width="10" height="384" fill="#E8DEC8"/>
      ${T(156, 52, 11, '#8A7A60', 'অধ্যায়: পবিত্রতা', 'text-anchor="middle"')}<rect x="44" y="62" width="224" height=".8" fill="#B9A988"/>
      ${['২২৩। আবূ মালিক আল আশ’আরী (রাঃ)', 'থেকে বর্ণিত, তিনি বলেন:', 'রাসূলুল্লাহ (সাঃ) বলেছেন: পবিত্রতা', 'হল ঈমানের অর্ধেক অংশ।', '‘আলহামদুলিল্লাহ’ মীজানের পরিমাপকে', 'পরিপূর্ণ করে দিবে এবং “সুবহানাল্লাহ', 'ওয়াল হামদুলিল্লাহ” আসমান ও জমীনের', 'মধ্যবর্তী স্থানকে পরিপূর্ণ করে দিবে।']
        .map((l, i) => T(44, 92 + i * 24, 13, '#2E2A22', l)).join('')}
      ${['ব্যাখ্যা: এখানে পবিত্রতা বলতে অজু,', 'গোসল ও শরীর-পোশাক পবিত্র রাখা বোঝায়।'].map((l, i) => T(44, 310 + i * 20, 11.5, '#6B604C', l)).join('')}
      ${T(156, 392, 11, '#8A7A60', '৮৪', 'text-anchor="middle"')}</g>
      <rect x="0" y="0" width="300" height="420" fill="url(#psvShade${u})"/><defs><linearGradient id="psvShade${u}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".12"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient></defs>`, c),
    // Landscape with no text: the reader finds nothing
    land: (c, u = ++uid) => svg(300, 420, `<defs><linearGradient id="psvSky${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7EC3E8"/><stop offset="1" stop-color="#F5D9A8"/></linearGradient></defs>
      <rect width="300" height="420" fill="url(#psvSky${u})"/><circle cx="214" cy="150" r="30" fill="#FFE7A3"/>
      <path d="M0 260 70 190 130 240 190 170 300 255V420H0z" fill="#5E8C6A"/><path d="M0 300 90 255 170 300 240 265 300 290V420H0z" fill="#3E6E4E"/>
      <path d="M0 360c60-20 120-20 300-6V420H0z" fill="#2C5A3C"/>`, c),
    // English-only poster
    en: (c) => svg(300, 420, `<rect width="300" height="420" fill="#14382E"/><rect x="18" y="18" width="264" height="384" rx="8" fill="none" stroke="#C9A85C" stroke-width="1.5"/>
      <text x="150" y="170" font-size="26" fill="#F3E7C4" text-anchor="middle" font-family="Georgia,serif" font-weight="700">Do not get angry.</text>
      <text x="150" y="214" font-size="14" fill="#C9A85C" text-anchor="middle" font-family="Georgia,serif">— Sahih al-Bukhari</text>
      <text x="150" y="360" font-size="12" fill="#F3E7C4" text-anchor="middle" font-family="Georgia,serif" opacity=".7">Share if you agree</text>`, c),
    // A quote poster that is not in the collection
    quote: (c) => svg(300, 420, `<rect width="300" height="420" fill="#F3E3D3"/><circle cx="60" cy="70" r="90" fill="#E9C9A9" opacity=".7"/><circle cx="260" cy="380" r="110" fill="#E2B892" opacity=".6"/>
      ${['যে সময়ের মূল্য বোঝে,', 'সে জীবনের মূল্য বোঝে।'].map((l, i) => T(150, 190 + i * 34, 21, '#5A3A22', l, 'text-anchor="middle" font-weight="700"')).join('')}
      ${T(150, 290, 13, '#8A6446', 'শেয়ার করে সবাইকে জানিয়ে দিন', 'text-anchor="middle"')}`, c),
  };

  /* ---------- What the reader returns (mistakes kept on purpose) ---------- */
  const ocr = {
    post: 'প্রিয় নবী (সাঃ) বলেছেন—\nএক ব্যক্তি নবী (সাঃ)-এর কাছে বলল, আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো লা। লোকটি কয়েকবাব তা বললেন, নবী (সাঃ) প্রত্যেক বারেই বললেন: রাগ করো না।\n(সহিহ বুখারি)\nযারা মানবেন আমিন লিখে শেয়ার করুন\n১.২ হাজার ৩৪০টি কমেন্ট',
    book: 'অধ্যায়: পবিত্রতা\n২২৩। আবূ মালিক আল আশ’আরী (রাঃ) থেকে বর্ণিত, তিনি বলেন: রাসূলুল্লাহ (সাঃ) বলেছেন: পবিত্রতা হল ঈমানের অর্ধেক অংশ। ‘আলহামদুলিল্লাহ’ মীজানের পরিমাপকে পরিপূর্ণ করে দিবে এবং “সুবহানাল্লাহ ওয়াল হামদুলিল্লাহ” আসমান ও জমীনের মধ্যবর্তী স্থানকে পরিপূর্ণ করে দিবে।\n৮৪',
    land: '',
    en: 'Do not get angry. — Sahih al-Bukhari',
    quote: 'যে সময়ের মূল্য বোঝে, সে জীবনের মূল্য বোঝে।\nশেয়ার করে সবাইকে জানিয়ে দিন',
  };
  // The lines the reader should delete or fix on the "লেখা ঠিক করা" step
  const fixes = {
    post: { extra: ['প্রিয় নবী (সাঃ) বলেছেন—', '(সহিহ বুখারি)', 'যারা মানবেন আমিন লিখে শেয়ার করুন', '১.২ হাজার ৩৪০টি কমেন্ট'], typos: [['করো লা', 'করো না'], ['কয়েকবাব', 'কয়েকবার']] },
    book: { extra: ['অধ্যায়: পবিত্রতা', '৮৪'], typos: [] },
  };

  /* ---------- Gallery (system photo picker) ---------- */
  const photos = [
    { id: 'post', label: 'স্ক্রিনশট', when: 'আজ' },
    { id: 'quote', label: 'পোস্টার', when: 'আজ' },
    { id: 'en', label: 'ইংরেজি পোস্টার', when: 'গতকাল' },
    { id: 'land', label: 'ভ্রমণের ছবি', when: 'গতকাল' },
  ];

  /* ---------- Matches (the existing verify result) ---------- */
  const hadith = {
    b6116: { book: 'সহিহ বুখারি', abbr: 'বুখারী', no: '৬১১৬', ch: 'আচার-ব্যবহার', grade: 'সহিহ', nar: 'আবূ হুরায়রা (রাঃ)',
      tr: 'এক ব্যক্তি নবী (সাঃ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বললেন, নবী (সাঃ) প্রত্যেক বারেই বললেন: রাগ করো না।' },
    m223: { book: 'সহিহ মুসলিম', abbr: 'মুসলিম', no: '২২৩', ch: 'পবিত্রতা', grade: 'সহিহ', nar: 'আবূ মালিক আল আশ’আরী (রাঃ)',
      tr: 'রাসূলুল্লাহ (সাঃ) বলেছেন: পবিত্রতা হল ঈমানের অর্ধেক অংশ। ‘আলহামদুলিল্লাহ’ মীজানের পরিমাপকে পরিপূর্ণ করে দিবে এবং “সুবহানাল্লাহ ওয়াল হামদুলিল্লাহ” আসমান ও জমীনের মধ্যবর্তী স্থানকে পরিপূর্ণ করে দিবে।' },
  };

  /* ---------- App text (lib/l10n/app_bn.arb, verify*) + new lines ---------- */
  const t = {
    title: 'হাদিস যাচাই', inputTitle: 'যে লেখাটি যাচাই করতে চান, সেটি এখানে দিন',
    hint: 'ফেসবুক, হোয়াটসঅ্যাপ বা অন্য কোথাও পাওয়া হাদিসটি এখানে পেস্ট করুন…',
    paste: 'পেস্ট করুন', fromPhoto: 'ছবি থেকে', camera: 'ছবি তুলুন', gallery: 'গ্যালারি থেকে নিন', cancel: 'বাতিল করুন',
    verify: 'যাচাই করুন', reading: 'ছবি থেকে লেখা পড়া হচ্ছে…',
    checkText: 'ছবি থেকে পড়া লেখা। ভুল বানান বা বাড়তি অংশ থাকলে ঠিক করে নিন।',
    noText: 'ছবিতে কোনো লেখা পাওয়া যায়নি। লেখা পরিষ্কার দেখা যায় এমন আরেকটা ছবি দিন।', another: 'আরেকটা ছবি',
    denied: 'ছবি দেখার অনুমতি বন্ধ আছে। অ্যাপ সেটিংস থেকে চালু করুন।', camDenied: 'ক্যামেরার অনুমতি বন্ধ আছে। অ্যাপ সেটিংস থেকে চালু করুন।', settings: 'সেটিংস',
    banglaOnly: 'এখন শুধু বাংলা লেখা যাচাই করা যায়', empty: 'আগে লেখাটি দিন', tooShort: 'মেলানোর জন্য লেখাটি আরেকটু বড় করে দিন',
    clip: 'পেস্ট করার মতো কোনো লেখা নেই',
    resultTitle: 'মিল খোঁজার ফলাফল', found: 'আপনার লেখাটি সংগ্রহে পাওয়া গেছে', gradeSrc: 'গ্রেড ও তাহকিক বই থেকে হুবহু নেওয়া',
    share: 'হাদিস কার্ড শেয়ার করুন', noMatch: 'মিল পাওয়া যায়নি', edit: 'লেখাটি বদলে আবার চেষ্টা করুন',
    noMatchMsg: 'অ্যাপের সংগ্রহে এই লেখার সাথে মেলে এমন কোনো হাদিস পাওয়া যায়নি। এর মানে এই নয় যে এটি জাল হাদিস — হাদিসের ভাণ্ডার এই অ্যাপের চেয়ে অনেক বড়। লেখাটি অন্য কোনো অনুবাদ থেকে নেওয়া হতে পারে। অথবা এটি হাদিস নয় — কোনো উক্তি বা বাণী হতে পারে। নিশ্চিত হতে একজন আলেমের সাথে পরামর্শ করুন।',
    permTitle: 'আল হাদিস-কে আপনার ফোনের ছবি দেখার অনুমতি দেবেন?', camPermTitle: 'আল হাদিস-কে ছবি তোলার অনুমতি দেবেন?',
    allow: 'অনুমতি দিন', deny: 'অনুমতি দেবেন না', pickTitle: 'একটি ছবি বেছে নিন',
  };

  /* ---------- Matcher: Bangla only, then the two known hadith ---------- */
  function match(text) {
    const s = (text || '').trim();
    if (!s) return { kind: 'msg', msg: t.empty };
    if (!/[ঀ-৿]/.test(s)) return { kind: 'msg', msg: t.banglaOnly };
    if (s.replace(/\s+/g, '').length < 12) return { kind: 'msg', msg: t.tooShort };
    if (/রাগ\s*করো/.test(s) && /ওসিয়ত|উপদেশ|কয়েকবার|রাগ করো না/.test(s)) return { kind: 'found', ids: ['b6116'] };
    if (/পবিত্রতা/.test(s) && /ঈমান/.test(s)) return { kind: 'found', ids: ['m223'] };
    return { kind: 'none' };
  }

  /* ---------- Home quick actions (real app SVGs) ---------- */
  const home = {
    order: [['latest', 'সর্বশেষ'], ['goTo', 'জাম্প'], ['prayer', 'ওয়াক্ত'], ['sadaqa', 'সাদাকা'], ['verify', 'যাচাই'], ['feed', 'ফিড'], ['reels', 'রিলস'], ['quiz', 'কুইজ']],
    verify: '<svg width="30" height="30" fill="none" viewBox="0 0 33 33"><rect x="4.5" y="2.5" width="18" height="24" rx="3" fill="var(--primary)"/><rect x="7.5" y="5.5" width="12" height="18" rx="1.5" fill="var(--tint)"/><path d="m10 10h7m-7 4h5" stroke="var(--primary-dark)" stroke-width="1.8" stroke-linecap="round"/><circle cx="21.5" cy="21.5" r="6" fill="var(--tint)" stroke="var(--primary-dark)" stroke-width="2.4"/><path d="m25.8 25.8 4 4" stroke="var(--primary-dark)" stroke-width="2.6" stroke-linecap="round"/><path d="m19 21.6 1.8 1.8 3.2-3.4" stroke="var(--primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    // Simplified glyphs of the other tiles (context only; they are not part of this feature)
    latest: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><circle cx="16.5" cy="16.5" r="12" fill="var(--primary)"/><path d="M16.5 10v7l4.5 3" stroke="var(--tint)" stroke-width="2.4" stroke-linecap="round"/></svg>',
    goTo: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><rect x="4" y="4" width="25" height="25" rx="6" fill="var(--primary)"/><path d="M11 16.5h11m-4-4 4 4-4 4" stroke="var(--tint)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    prayer: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><path d="M16.5 3c4 4 9 6 9 12v14h-18V15c0-6 5-8 9-12z" fill="var(--primary)"/><rect x="13" y="20" width="7" height="9" rx="3.5" fill="var(--tint)"/></svg>',
    sadaqa: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><path d="M16.5 27s-11-6.5-11-14a6 6 0 0 1 11-3.3A6 6 0 0 1 27.5 13c0 7.5-11 14-11 14z" fill="var(--primary)"/><circle cx="24.5" cy="8.5" r="4.5" fill="var(--accent)"/></svg>',
    feed: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><rect x="5" y="4" width="23" height="25" rx="4" fill="var(--primary)"/><path d="M10 11h13M10 16.5h13M10 22h8" stroke="var(--tint)" stroke-width="2.2" stroke-linecap="round"/></svg>',
    reels: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><rect x="7" y="3" width="19" height="27" rx="4" fill="var(--primary)"/><path d="M14 12v9l7-4.5z" fill="var(--tint)"/></svg>',
    quiz: '<svg width="30" height="30" viewBox="0 0 33 33" fill="none"><path d="M5.6 7h16c1.9 0 3.5 1.6 3.5 3.5v13c0 1.9-1.6 3.5-3.5 3.5h-8.5l-5.5 4.5V27h-2c-1.9 0-3.5-1.6-3.5-3.5v-13C2.1 8.6 3.7 7 5.6 7z" fill="var(--primary)"/><path d="M11 14.4c0-1.5 1.1-2.5 2.5-2.5s2.5 1 2.5 2.4c0 1.9-2.5 2.1-2.5 3.9" stroke="var(--tint)" stroke-width="2.2" stroke-linecap="round"/><circle cx="13.5" cy="21.1" r="1.25" fill="var(--tint)"/></svg>',
  };

  /* ---------- Extra icons (Material: photo_camera, image, content_paste, find_in_page, share) ---------- */
  const st = (d, w = 20) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ic = {
    camera: (w) => st('<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>', w),
    image: (w) => st('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 9"/>', w),
    paste: (w) => st('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h4"/>', w),
    found: (w) => st('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/><circle cx="11.5" cy="13.5" r="2.6"/><path d="m13.5 15.5 2 2"/>', w),
    share: (w) => st('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>', w),
    bt: (w) => st('<path d="m7 7 10 10-5 4V3l5 4L7 17"/>', w),
    print: (w) => st('<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>', w),
    file: (w) => st('<path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>', w),
    edit: (w) => st('<path d="M4 20h4L19 9l-4-4L4 16z"/>', w),
    star: (w) => st('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>', w),
    trash: (w) => st('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', w),
  };

  window.PSV = { img, ocr, fixes, photos, hadith, t, match, home, ic };
})();
