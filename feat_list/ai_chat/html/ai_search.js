/* =====================================================================
   এআই চ্যাট (রেফারেন্সসহ) — shared data and flow for demo1–demo5.
   The AI only widens the search; every result is a real hadith from the
   app's database with book, number, chapter and grade. Nothing here writes
   an answer, a summary or a ruling. Each demo keeps its own look in
   `R` (render functions) and passes it to AIS.start().
   ===================================================================== */
(function () {
  'use strict';
  const { $, $$, bn } = Kit;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Books and hadith (text only from the safe list) ---------- */
  const BOOKS = {
    bukhari: { name: 'সহিহ বুখারি', abbr: 'বুখারী', order: 1 },
    muslim: { name: 'সহিহ মুসলিম', abbr: 'মুসলিম', order: 2 },
  };
  // kitab = অধ্যায়, bab = পরিচ্ছেদ: both come from our data, never from the AI
  const H = {
    b6116: { book: 'bukhari', num: 6116, kitab: 'আদব', bab: 'রাগ থেকে বেঁচে থাকা', grade: 'sahih', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', tr: 'এক ব্যক্তি নবী (সাঃ)-কে বলল, আমাকে উপদেশ দিন। তিনি বললেন, রাগ করো না। লোকটি কয়েকবার একই কথা বলল, তিনি প্রতিবারই বললেন, রাগ করো না।' },
    b6018: { book: 'bukhari', num: 6018, kitab: 'আদব', bab: 'প্রতিবেশীকে কষ্ট না দেওয়া', grade: 'sahih', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', tr: 'যে আল্লাহ ও শেষ দিনের প্রতি ঈমান রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।' },
    b1894: { book: 'bukhari', num: 1894, kitab: 'সাওম', bab: 'রোজার ফজিলত', grade: 'sahih', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', tr: 'রোজা ঢালস্বরূপ।' },
    b1: { book: 'bukhari', num: 1, kitab: 'ওহীর সূচনা', bab: 'রাসূলুল্লাহ (সাঃ)-এর প্রতি ওহীর সূচনা', grade: 'sahih', nar: 'উমর ইবনুল খাত্তাব (রা.) থেকে বর্ণিত', tr: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।' },
    m223: { book: 'muslim', num: 223, kitab: 'পবিত্রতা', bab: 'অজুর ফজিলত', grade: 'sahih', nar: 'আবু মালিক আশআরি (রা.) থেকে বর্ণিত', tr: 'পবিত্রতা ঈমানের অর্ধেক।' },
  };
  const GRADES = { sahih: 'সহিহ হাদিস' };

  /* ---------- What the server sends back for a question ----------
     Known questions have a fixed order (closest first); anything else is
     matched by meaning words. No word matched = nothing found. */
  const QUESTIONS = [
    { q: 'রাগ নিয়ন্ত্রণ করব কীভাবে?', ids: ['b6116', 'b6018', 'b1894', 'b1'] },
    { q: 'প্রতিবেশী কষ্ট দিলে কী করব?', ids: ['b6018', 'b6116', 'b1894', 'b1'] },
    { q: 'রোজা রাখলে কী লাভ?', ids: ['b1894', 'b1', 'm223'] },
    { q: 'অজু করার গুরুত্ব কী?', ids: ['m223', 'b1'] },
  ];
  const EMPTY_Q = 'মোবাইল গেম খেলার নিয়ম';
  const TAGS = {
    b6116: ['রাগ', 'রেগে', 'মেজাজ', 'ক্রোধ', 'ঝগড়া', 'উপদেশ', 'ধৈর্য', 'কষ্ট'],
    b6018: ['প্রতিবেশী', 'কথা', 'চুপ', 'জিহ্বা', 'গালি', 'ঝগড়া', 'কষ্ট', 'আচরণ'],
    b1894: ['রোজা', 'রোযা', 'সিয়াম', 'সাওম', 'রমজান', 'ঢাল'],
    b1: ['নিয়ত', 'নিয়্যত', 'উদ্দেশ্য', 'ইখলাস', 'আমল', 'কাজ'],
    m223: ['পবিত্র', 'অজু', 'ওজু', 'ওযু', 'পরিষ্কার', 'গোসল', 'ঈমান'],
  };
  const norm = (s) => String(s).replace(/[?？।!,]/g, ' ').replace(/\s+/g, ' ').trim();
  function find(text) {
    const q = norm(text);
    const known = QUESTIONS.find((x) => norm(x.q) === q);
    if (known) return { q: text.trim(), ids: known.ids.slice() };
    const order = Object.keys(H);
    const ids = order.map((id) => [id, TAGS[id].filter((t) => q.includes(t)).length])
      .filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1] || order.indexOf(a[0]) - order.indexOf(b[0])).map(([id]) => id);
    return { q: text.trim(), ids };
  }

  /* ---------- App strings ---------- */
  const T = {
    ai: 'AI সার্চ',
    normal: 'স্বাভাবিক',
    exact: 'হুবহু মিল',
    method: 'সার্চের পদ্ধতি নির্বাচন করুন',
    hintWord: 'হাদিস নাম্বার / শব্দ দিয়ে খুঁজুন',
    hintAsk: 'নিজের ভাষায় প্রশ্ন লিখুন',
    btn: 'হাদিস সার্চ করুন',
    title: 'সার্চ রেজাল্ট',
    you: (q) => `আপনি ( <b class="q-t">${esc(q)}</b> ) লিখে সার্চ করেছেন`,
    count: (n) => `সর্বমোট ফলাফল পাওয়া গেছে : ${bn(n)} টি`,
    more: 'আরও ফলাফল দেখুন',
    none: 'কোন সার্চ রেজাল্ট পাওয়া যায়নি',
    signin: 'AI সার্চ ব্যবহার করতে সাইন ইন করুন',
    signinBtn: 'Google দিয়ে সাইন ইন করুন',
    signinWhy: 'সাইন ইন করলে আপনার বুকমার্ক, নোট ও পিন ব্যাকআপ থাকবে এবং AI সার্চ আনলক হবে।',
    free: (n) => `প্রতিদিন ${bn(n)}টি ফ্রি AI সার্চ পাবেন`,
    left: (n) => `আজ ${bn(n)}টি ক্রেডিট বাকি।`,
    out: 'আজকের ক্রেডিট শেষ।',
    today: 'আজকের সার্চ',
    reset: 'ব্যবহারের হিসাব রাত ১২টায় রিসেট হবে।',
    sort: 'সাজান', best: 'সেরা মিল', bestD: 'বেশি মিল থাকা ফলাফল আগে।', bookO: 'বই অনুযায়ী', bookD: 'বই ও হাদিস নম্বর অনুযায়ী।',
    filter: 'গ্রেড ফিল্টার', allGrades: 'ডিফল্টভাবে সব গ্রেডে সার্চ হবে', clear: 'ক্লিয়ার',
  };
  const LIMIT = 10;   // free AI searches a day
  const FIRST = 3;    // closest matches shown before "আরও ফলাফল দেখুন"

  /* ---------- State ---------- */
  const S = { method: 'normal', signed: false, used: 3, text: QUESTIONS[0].q, res: null, shown: FIRST, sort: 'best', grades: new Set(), cur: null, back: 'results' };
  const left = () => Math.max(0, LIMIT - S.used);
  const book = (id) => BOOKS[H[id].book];
  const ref = (id) => `${book(id).name} ${bn(H[id].num)}`;
  function all() {
    if (!S.res) return [];
    let ids = S.res.ids.filter((id) => !S.grades.size || S.grades.has(H[id].grade));
    if (S.sort === 'book') ids = ids.slice().sort((a, b) => book(a).order - book(b).order || H[a].num - H[b].num);
    return ids;
  }
  const visible = () => all().slice(0, S.shown);
  const hasMore = () => all().length > S.shown;

  /* ---------- Pages move into whichever screen is on ---------- */
  const PAGE = { search: 'search', signin: 'search', nocredit: 'search', results: 'results', hadith: 'hadith', empty: 'empty', credit: 'credit' };
  let R = {};
  let internal = false;
  const go = (id) => { internal = true; Kit.show(id); internal = false; };
  function render(id = Kit.current) {
    const p = PAGE[id], el = $('#pg-' + p);
    if (!el || !R[p]) return;
    R[p](el);
    $$('[data-q]', el).forEach((i) => { i.value = S.text; });
    $$('[data-count]', el).forEach((c) => { c.textContent = S.res ? T.count(all().length) : ''; });
    fillSheets();
    markEx();
  }

  /* ---------- Sort and grade sheets (filled into any [data-sort-list] / [data-grade-list]) ---------- */
  function fillSheets() {
    $$('[data-sort-list]').forEach((l) => {
      l.innerHTML = [['best', T.best, T.bestD], ['book', T.bookO, T.bookD]].map(([v, t, d]) =>
        `<button class="opt" data-act="sort" data-v="${v}" aria-pressed="${S.sort === v}"><span class="rd"></span><span><b>${t}</b><small>${d}</small></span></button>`).join('');
    });
    const n = S.res ? S.res.ids.length : 0;
    $$('[data-grade-list]').forEach((l) => {
      l.innerHTML = `<p class="muted gl-note">${T.allGrades}</p>` + Object.entries(GRADES).map(([g, t]) =>
        `<button class="opt" data-act="grade" data-g="${g}" aria-pressed="${S.grades.has(g)}"><span class="cb"></span><span class="grade">${t}</span><small class="gn">${bn(n)}টি</small></button>`).join('');
    });
  }

  /* ---------- Search ---------- */
  function run(text) {
    const v = String(text == null ? S.text : text).trim();
    S.text = v;
    if (S.method !== 'ai') { Kit.snack('প্রশ্ন দিয়ে খুঁজতে "AI সার্চ" বেছে নিন'); return; }
    if (!v) { Kit.snack('সার্চ করার জন্য কিছু লিখুন'); return; }
    if (!S.signed) { Kit.open('sh-signin'); return; }
    if (!left()) { Kit.snack(T.out); return; }
    S.used += 1;
    S.res = find(v); S.shown = FIRST; S.sort = 'best'; S.grades.clear();
    go(S.res.ids.length ? 'results' : 'empty');
  }

  /* ---------- Toolbar chips set up their step ---------- */
  function setup(id) {
    const ok = () => { S.method = 'ai'; S.signed = true; if (!left()) S.used = 3; };
    if (id === 'search' && !left()) S.used = 3;
    if (id === 'signin') { S.method = 'ai'; S.signed = false; S.text = QUESTIONS[0].q; }
    if ((id === 'results' || id === 'hadith') && !(S.res && S.res.ids.length)) { ok(); S.text = QUESTIONS[0].q; S.res = find(S.text); S.shown = FIRST; }
    if (id === 'hadith' && (!S.cur || !S.res.ids.includes(S.cur))) { S.cur = S.res.ids[0]; S.back = 'results'; }
    if (id === 'empty') { ok(); S.text = EMPTY_Q; S.res = find(EMPTY_Q); }
    if (id === 'credit') { S.signed = true; if (!left()) S.used = 3; }
    if (id === 'nocredit') { S.method = 'ai'; S.signed = true; S.used = LIMIT; }
  }

  /* ---------- Example questions in the side panel ---------- */
  const EX = [...QUESTIONS.map((x) => x.q), EMPTY_Q];
  const EXTRA = EX.map((q) => `<button class="kit-chip" type="button" data-ex="${esc(q)}" aria-pressed="false">${esc(q)}</button>`).join('');
  function markEx() {
    $$('[data-ex]').forEach((b) => b.setAttribute('aria-pressed', String(!!S.res && Kit.current !== 'search' && b.dataset.ex === S.res.q)));
  }

  /* ---------- In-phone actions ---------- */
  const ACT = {
    method: (t) => { S.method = t.dataset.m; render(); },
    run: (t) => { const i = $('[data-q]', t.closest('.screen')); run(i ? i.value : S.text); },
    clear: (t) => { const i = $('[data-q]', t.closest('.screen')); S.text = ''; if (i) { i.value = ''; i.focus(); } },
    signin: () => { S.signed = true; Kit.close('sh-signin'); Kit.snack('সাইন ইন করা হয়েছে'); setTimeout(() => run(S.text), 350); },
    more: () => { S.shown = all().length; render(); },
    open: (t) => { S.cur = t.dataset.hid; S.back = Kit.current; go('hadith'); },
    back: () => go(S.back === 'hadith' ? 'results' : S.back),
    sort: (t) => { S.sort = t.dataset.v; const sh = document.getElementById('sh-sort'); if (sh) Kit.close(sh); render(); }, // demo 4 sorts inline, no sheet
    grade: (t) => { const g = t.dataset.g; S.grades.has(g) ? S.grades.delete(g) : S.grades.add(g); S.shown = Math.max(S.shown, FIRST); render(); },
    'grade-clear': () => { S.grades.clear(); render(); },
    edit: () => { go('search'); setTimeout(() => { const i = $('.screen.on [data-q]'); if (i) { i.focus(); i.select(); } }, 40); },
    search: () => go('search'),
    credit: () => go('credit'),
    exit: () => Kit.snack('আগের পেজে ফিরে যাবে'),
  };
  document.addEventListener('click', (e) => {
    const ex = e.target.closest('[data-ex]');
    if (ex) { S.method = 'ai'; S.text = ex.dataset.ex; if (!left()) S.used = 3; if (!['search', 'signin', 'nocredit'].includes(Kit.current)) go('search'); run(S.text); return; }
    const t = e.target.closest('[data-act]');
    if (t && t.closest('.phone') && ACT[t.dataset.act]) ACT[t.dataset.act](t);
  });
  document.addEventListener('input', (e) => { if (e.target.matches('[data-q]')) S.text = e.target.value; });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.matches('[data-q]')) { e.preventDefault(); run(e.target.value); }
    if (e.key === 'Enter' && e.target.matches('[data-hid]')) e.target.click();
  });

  /* ---------- Boot ---------- */
  function start(opts) {
    R = opts.render;
    $$('[data-i]').forEach((b) => { b.innerHTML = Kit.icons[b.dataset.i]; });
    Kit.onScreen((id) => {
      if (!internal) setup(id);
      const p = $(`.screen[data-screen="${id}"]`);
      p.appendChild($('#pg-' + PAGE[id]));
      render(id);
      $$('.body', p).forEach((b) => { b.scrollTop = 0; });
      if (!internal && id === 'signin') setTimeout(() => Kit.open('sh-signin'), 60);
    });
    Kit.init({ demo: opts.demo, name: opts.name, extra: EXTRA, screens: [
      { id: 'search', label: 'সার্চ পেজ' },
      { id: 'signin', label: 'সাইন ইন' },
      { id: 'results', label: 'রেজাল্ট' },
      { id: 'hadith', label: 'হাদিস পেজ' },
      { id: 'empty', label: 'কিছু মেলেনি' },
      { id: 'credit', label: 'ক্রেডিট' },
      { id: 'nocredit', label: 'ক্রেডিট শেষ' },
    ] });
  }

  window.AIS = { start, render, S, H, BOOKS, GRADES, T, LIMIT, FIRST, esc, bn, left, ref, book, all, visible, hasMore };
})();
