/* =====================================================================
   হাদিস স্টোরি মোড — ৫টা ডেমোর শেয়ার করা ডেটা, স্টেট আর হেল্পার।
   - গল্প = হাদিসের অনুবাদ হুবহু (নিজের ভাষায় লেখা গল্প নয়)।
   - হাদিস: শুধু নিশ্চিত তালিকার বুখারি ১, ১৮৯৪, ৬০১৮, ৬১১৬; লেখা IRD bukhari_bn.db থেকে হুবহু,
     শুধু নবীজির নামের পরের চিহ্ন (সাঃ) লেখা। আরবি ডেমোতে রাখা হয়নি।
   - শিরোনাম আলেমরা দেবেন; এখানের শিরোনামগুলো ডেমোর জন্য।
   - বুখারি ছাড়া অন্য কিতাব এই ডেমোতে "ডাউনলোড করা নেই" অবস্থায়।
   ===================================================================== */
(function () {
  'use strict';
  const p = (d, w = 24) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

  /* ---------- Icons used by the demos ---------- */
  const ICON = {
    story: (w) => p('<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/><path d="M15.5 9.5h2M15.5 12.5h2M6.5 9.5h2"/>', w),
    prev: (w) => p('<path d="m15 18-6-6 6-6"/>', w),
    next: (w) => p('<path d="m9 18 6-6-6-6"/>', w),
    open: (w) => p('<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', w),
    download: (w) => p('<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>', w),
    arabic: (w) => p('<path d="M4 7h10M9 7v10M4 17h10"/><path d="M17 8.5h3M18.5 7v9"/>', w),
  };

  /* ---------- Home quick actions (row 1 keeps সাদাকা; গল্প joins row 2) ---------- */
  const QA = [
    ['latest', 'সর্বশেষ', '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'],
    ['goTo', 'জাম্প', '<path d="M5 19 19 5"/><path d="M9 5h10v10"/>'],
    ['prayer', 'ওয়াক্ত', '<path d="M4 20h16M6 20v-7a6 6 0 0 1 12 0v7"/><path d="M12 4v3M10 20v-4a2 2 0 0 1 4 0v4"/>'],
    ['sadaqa', 'সাদাকা', '<path d="M12 20s-7-4.2-7-9.5A3.8 3.8 0 0 1 12 8.2a3.8 3.8 0 0 1 7 2.3C19 15.8 12 20 12 20z"/>'],
    ['story', 'গল্প', null],
    ['feed', 'ফিড', '<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/>'],
    ['reels', 'রিলস', '<rect x="5" y="3.5" width="14" height="17" rx="3"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>'],
    ['quiz', 'কুইজ', '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.5a2.3 2.3 0 0 1 4.4.9c0 1.6-2.2 2-2.2 3.4M12 16.8v.2"/>'],
  ];
  function homeHTML() {
    const tile = ([k, label, d]) => k === 'story'
      ? `<button class="qa-tile new" data-act="home-story"><span class="qa-ic">${ICON.story(28)}</span>${label}</button>`
      : `<button class="qa-tile" data-snack="${label} খুলবে — এই ফিচারের অংশ নয়"><span class="qa-ic">${p(d, 28)}</span>${label}</button>`;
    const rows = [];
    for (let i = 0; i < QA.length; i += 4) rows.push(`<div class="qa-row">${QA.slice(i, i + 4).map(tile).join('')}</div>`);
    return `<div class="qa">${rows.join('')}</div>`;
  }
  // Shared home grid look (HomeSmallDashboard: 4 per row, radius 20)
  document.head.insertAdjacentHTML('beforeend', `<style>
    .qa{background:var(--card);border-radius:20px;box-shadow:var(--shadow);margin:14px 12px;padding:12px 0 10px}
    .qa-row{display:grid;grid-template-columns:repeat(4,1fr)}
    .qa-tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 4px 8px;border-radius:10px;font-size:14px;font-weight:700;color:var(--body);text-align:center}
    .qa-tile:hover{background:var(--surface-2)}
    .qa-tile.new{outline:2px dashed var(--primary);outline-offset:-4px}
    .qa-ic{color:var(--primary)}
  </style>`);

  /* ---------- Books with stories (books without stories never show) ---------- */
  const BOOKS = [
    { id: 'bukhari', name: 'সহীহ বুখারী', abbr: 'বুখারী', stories: 4, chapters: 3, dl: true },
    { id: 'muslim', name: 'সহীহ মুসলিম', abbr: 'মুসলিম', stories: 12, chapters: 7, dl: false },
    { id: 'abudawud', name: 'সুনানে আবূ দাউদ', abbr: 'আবূ দাউদ', stories: 9, chapters: 6, dl: false },
    { id: 'tirmidhi', name: 'জামে‘ আত-তিরমিযী', abbr: 'তিরমিযী', stories: 7, chapters: 5, dl: false },
    { id: 'riyad', name: 'রিয়াদুস সালেহীন', abbr: 'রিয়াদুস', stories: 15, chapters: 9, dl: false },
  ];

  /* ---------- Bukhari: chapters (কিতাব) and their stories, in book order ---------- */
  const CHAPTERS = [
    { no: 1, title: 'ওহীর সূচনা অধ্যায়', stories: ['b1'] },
    { no: 30, title: 'সাওম', stories: ['b1894'] },
    { no: 78, title: 'আচার-ব্যবহার', stories: ['b6018', 'b6116'] },
  ];
  const STORIES = {
    b1: { no: 1, ch: 1, sec: 'আল্লাহর রসূল (সাঃ)-এর প্রতি কীভাবে ওহী শুরু হয়েছিল।',
      title: 'মিম্বারে দাঁড়িয়ে উমর (রাঃ) যা শোনালেন', nar: '‘আলক্বামাহ ইব্‌নু ওয়াক্কাস আল-লায়সী (রহঃ)',
      text: 'আমি উমর ইবনুল খাত্তাব (রাঃ)-কে মিম্বরের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রসূল (সাঃ)-কে বলতে শুনেছিঃ আমল (এর প্রাপ্য হবে) নিয়ত অনুযায়ী। আর মানুষ তার নিয়ত অনুযায়ী প্রতিফল পাবে।\n\nতাই যার হিজরত হবে দুনিয়া লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশ্যে- তবে তার হিজরত সে উদ্দেশ্যেই হবে, যে জন্যে, সে হিজরত করেছে।' },
    b1894: { no: 1894, ch: 30, sec: 'সাওমের ফজিলত',
      title: 'কেউ ঝগড়া করতে এলে রোজাদার যা বলবে', nar: 'আবূ হুরায়রা (রাঃ)',
      text: 'আল্লাহর রসূল (সাঃ) বলেছেনঃ সিয়াম ঢাল স্বরূপ। সুতরাং অশ্লীলতা করবে না এবং মূর্খের মত কাজ করবে না। যদি কেউ তার সাথে ঝগড়া করতে চায়, তাকে গালি দেয়, তবে সে যেন দুই বার বলে, আমি সাওম পালন করছি।\n\nঐ সত্তার শপথ, যার হাতে আমার প্রাণ, অবশ্যই সাওম পালনকারীর মুখের গন্ধ আল্লাহর নিকট মিসকের সুগন্ধির চাইতেও উৎকৃষ্ট, সে আমার জন্য আহার, পান ও কামাচার পরিত্যাগ করে। সিয়াম আমারই জন্য। তাই এর পুরস্কার আমি নিজেই দান করব। আর প্রত্যেক নেক কাজের বিনিময় দশ গুণ।' },
    b6018: { no: 6018, ch: 78, sec: 'যে ব্যক্তি আল্লাহ ও আখিরাতের দিনে বিশ্বাস রাখে, সে যেন তার প্রতিবেশীকে জ্বালাতন না করে।',
      title: 'প্রতিবেশী, মেহমান আর মুখের কথা', nar: 'আবূ হুরায়রা (রাঃ)',
      text: 'রসূলুল্লাহ (সাঃ) বলেছেন: যে ব্যক্তি আল্লাহ এবং কেয়ামতের দিনে বিশ্বাস রাখে, সে যেন তার প্রতিবেশীকে কষ্ট না দেয়। যে আল্লাহ এবং কেয়ামতের দিনে বিশ্বাস রাখে, সে যেন তার মেহমানকে সম্মান করে। যে আল্লাহ এবং কেয়ামতের দিনে বিশ্বাস রাখে, সে যেন ভাল কথা বলে অথবা চুপ থাকে।' },
    b6116: { no: 6116, ch: 78, sec: 'ক্রোধ থেকে বেঁচে থাকা।',
      title: 'এক ব্যক্তি উপদেশ চাইলেন', nar: 'আবূ হুরায়রা (রাঃ)',
      text: 'এক ব্যক্তি নবী (সাঃ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বললেন, নবী (সাঃ) প্রত্যেক বারেই বললেন: রাগ করো না।' },
  };
  const GRADE = 'সহিহ হাদিস';

  /* ---------- State + lookups (same in all demos) ---------- */
  const S = { book: 'bukhari', sid: 'b6018', arabic: false };
  const chapterOf = (sid) => CHAPTERS.find((c) => c.stories.includes(sid));
  const bookById = (id) => BOOKS.find((b) => b.id === id);
  function neighbours(sid) {
    const list = chapterOf(sid).stories, i = list.indexOf(sid);
    return { prev: list[i - 1] || null, next: list[i + 1] || null, pos: i + 1, total: list.length };
  }
  const paras = (t, cls = 'translation') => t.split(/\n+/).map((x) => `<p class="${cls}">${x}</p>`).join('');
  const firstLines = (t) => t.replace(/\n+/g, ' ');
  const ref = (st) => `সহীহ বুখারী · হাদিস ${Kit.bn(st.no)}`;

  /* Arabic toggle: the demo shows the state only (no Arabic text in demos) */
  function toggleArabic() {
    S.arabic = !S.arabic;
    Kit.snack(S.arabic ? 'আরবি চালু হয়েছে: অনুবাদের ওপরে আরবি দেখাবে' : 'আরবি বন্ধ হয়েছে');
    return S.arabic;
  }
  const dlManager = () => Kit.snack('ডাউনলোড ম্যানেজার খুলবে');

  window.STORY = { ICON, BOOKS, CHAPTERS, STORIES, GRADE, S, homeHTML, chapterOf, bookById, neighbours, paras, firstLines, ref, toggleArabic, dlManager,
    SCREENS: [
      { id: 'home', label: 'হোম' },
      { id: 'books', label: 'কিতাবের তালিকা' },
      { id: 'stories', label: 'গল্পের তালিকা' },
      { id: 'read', label: 'গল্প পড়া' },
      { id: 'original', label: 'মূল হাদিস' },
      { id: 'nodl', label: 'ডাউনলোড মেসেজ' },
    ] };
})();
