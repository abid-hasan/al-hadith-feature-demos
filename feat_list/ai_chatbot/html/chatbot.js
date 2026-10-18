/* =====================================================================
   এআই হাদিস চ্যাটবট — shared data and flow for demo1–demo5.
   Every bot line is fixed app text; the "answer" is only real hadith
   cards from the database (book, number, grade). The bot never writes
   an explanation, advice or a ruling, and each question is its own
   search (nothing is carried over from earlier messages).
   Each demo keeps its own look in `R` and passes it to BOT.start().
   ===================================================================== */
(function () {
  'use strict';
  const { $, $$, bn } = Kit;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Books and hadith (text only from the safe list) ---------- */
  const BOOKS = {
    bukhari: { name: 'সহিহ বুখারি', abbr: 'বুখারী' },
    muslim: { name: 'সহিহ মুসলিম', abbr: 'মুসলিম' },
  };
  const H = {
    b6116: { book: 'bukhari', num: 6116, kitab: 'আদব', grade: 'sahih', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', tr: 'এক ব্যক্তি নবী (সাঃ)-কে বলল, আমাকে উপদেশ দিন। তিনি বললেন, রাগ করো না। লোকটি কয়েকবার একই কথা বলল, তিনি প্রতিবারই বললেন, রাগ করো না।' },
    b6018: { book: 'bukhari', num: 6018, kitab: 'আদব', grade: 'sahih', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', tr: 'যে আল্লাহ ও শেষ দিনের প্রতি ঈমান রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।' },
    b1894: { book: 'bukhari', num: 1894, kitab: 'সাওম', grade: 'sahih', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', tr: 'রোজা ঢালস্বরূপ।' },
    b1: { book: 'bukhari', num: 1, kitab: 'ওহীর সূচনা', grade: 'sahih', nar: 'উমর ইবনুল খাত্তাব (রা.) থেকে বর্ণিত', tr: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।' },
    m223: { book: 'muslim', num: 223, kitab: 'পবিত্রতা', grade: 'sahih', nar: 'আবু মালিক আশআরি (রা.) থেকে বর্ণিত', tr: 'পবিত্রতা ঈমানের অর্ধেক।' },
  };
  const GRADES = { sahih: 'সহিহ হাদিস' };

  /* ---------- What the search returns for a message ---------- */
  const Q = {
    mood: 'খুব রাগ হচ্ছে, কী করব?',
    neighbour: 'প্রতিবেশী নিয়ে নবীজি (সাঃ) কী বলেছেন?',
    fast: 'রোজার ফজিলত কী?',
    masala: 'শেয়ার ব্যবসা করা কি জায়েজ?',
    none: 'মোবাইল গেম খেলার নিয়ম',
  };
  const KNOWN = [[Q.mood, ['b6116', 'b6018', 'b1894', 'b1']], [Q.neighbour, ['b6018', 'b6116']], [Q.fast, ['b1894', 'b1', 'm223']]];
  const TAGS = {
    b6116: ['রাগ', 'রেগে', 'মেজাজ', 'ক্রোধ', 'ঝগড়া', 'ধৈর্য'],
    b6018: ['প্রতিবেশী', 'কথা', 'চুপ', 'গালি', 'ঝগড়া', 'আচরণ'],
    b1894: ['রোজা', 'রোযা', 'সিয়াম', 'রমজান', 'ঢাল'],
    b1: ['নিয়ত', 'নিয়্যত', 'উদ্দেশ্য', 'ইখলাস', 'আমল'],
    m223: ['পবিত্র', 'অজু', 'ওজু', 'ওযু', 'পরিষ্কার', 'গোসল'],
  };
  // Questions about whether something is allowed go to a scholar, never to the bot
  const MASALA = ['জায়েজ', 'জায়েয', 'নাজায়েজ', 'হালাল', 'হারাম', 'বৈধ', 'মাকরুহ', 'ফতোয়া', 'করা যাবে কি', 'চলবে কি'];
  const norm = (s) => String(s).replace(/[?？।!,]/g, ' ').replace(/\s+/g, ' ').trim();
  function answer(text) {
    const q = norm(text);
    if (MASALA.some((w) => q.includes(w))) return { bot: 'masala' };
    const k = KNOWN.find(([x]) => norm(x) === q);
    let ids = k ? k[1].slice() : null;
    if (!ids) {
      const order = Object.keys(H);
      ids = order.map((id) => [id, TAGS[id].filter((t) => q.includes(t)).length]).filter(([, n]) => n > 0)
        .sort((a, b) => b[1] - a[1] || order.indexOf(a[0]) - order.indexOf(b[0])).map(([id]) => id);
    }
    return ids.length ? { bot: 'found', ids } : { bot: 'none' };
  }

  /* ---------- Fixed app text (the only words the bot ever "says") ---------- */
  const T = {
    title: 'হাদিস চ্যাট',
    rule: 'এই চ্যাট শুধু অ্যাপের হাদিস খুঁজে দেয়, কোনো ফতোয়া বা মতামত দেয় না।',
    ruleMore: 'প্রতিটা প্রশ্ন আলাদা করে খোঁজা হয়, প্রতি প্রশ্নে ১টি ক্রেডিট লাগে।',
    found: (n) => `এ বিষয়ে ${bn(n)}টি হাদিস পাওয়া গেছে`,
    masala: 'এ বিষয়ে একজন আলেমকে জিজ্ঞেস করুন',
    masalaSub: 'কোনো কাজ জায়েজ কি না, সে প্রশ্নের উত্তর এই চ্যাট দেয় না।',
    none: 'কোন সার্চ রেজাল্ট পাওয়া যায়নি',
    noneSub: 'প্রশ্নটা অন্যভাবে লিখে আবার পাঠান।',
    hint: 'প্রশ্ন বা মনের কথা লিখুন',
    left: (n) => `আজ ${bn(n)}টি ক্রেডিট বাকি।`,
    out: 'আজকের ক্রেডিট শেষ।',
    reset: 'ব্যবহারের হিসাব রাত ১২টায় রিসেট হবে।',
    open: 'হাদিস চ্যাট খুলুন',
  };
  const LIMIT = 10;

  /* ---------- State ---------- */
  const S = { msgs: [], used: 3, draft: Q.mood, cur: null, back: 'answer' };
  const left = () => Math.max(0, LIMIT - S.used);
  const book = (id) => BOOKS[H[id].book];
  const ref = (id) => `${book(id).name} ${bn(H[id].num)}`;
  const credits = () => (left() ? T.left(left()) : T.out);

  /* ---------- Pages move into whichever screen is on ---------- */
  const PAGE = { entry: 'entry', chat: 'chat', answer: 'chat', masala: 'chat', empty: 'chat', limit: 'chat', hadith: 'hadith' };
  let R = {};
  let internal = false;
  const go = (id) => { internal = true; Kit.show(id); internal = false; };
  function render(id = Kit.current) {
    const p = PAGE[id], el = $('#pg-' + p);
    if (!el || !R[p]) return;
    R[p](el);
    $$('[data-q]', el).forEach((i) => { i.value = S.draft; });
    markEx();
  }
  // Bring the newest question to the top of the thread
  function toLatest(el) {
    const sc = $('[data-scroller]', el);
    if (!sc) return;
    const me = $$('[data-me]', sc).pop();
    sc.scrollTop = me ? me.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 12 : 0;
  }

  /* ---------- Send ---------- */
  function send(text) {
    const v = String(text == null ? S.draft : text).trim();
    if (!v) { Kit.snack('আগে কিছু লিখুন'); return; }
    if (!left()) { Kit.snack(T.out); return; }
    const a = answer(v);
    if (a.bot !== 'masala') S.used += 1;   // a question sent to a scholar is not searched
    S.msgs.push({ me: v }, a);
    S.draft = '';
    const to = !left() ? 'limit' : a.bot === 'found' ? 'answer' : a.bot === 'masala' ? 'masala' : 'empty';
    if (to === Kit.current) { render(); toLatest($('#pg-chat')); } else go(to);
  }

  /* ---------- Toolbar chips set up their step ---------- */
  function setup(id) {
    const fresh = () => { if (!left()) S.used = 3; };
    const one = (q) => [{ me: q }, answer(q)];
    if (id === 'chat') { fresh(); S.msgs = []; S.draft = Q.mood; }
    if (id === 'answer') { fresh(); S.msgs = one(Q.mood); S.draft = ''; }
    if (id === 'masala') { fresh(); S.msgs = one(Q.masala); S.draft = ''; }
    if (id === 'empty') { fresh(); S.msgs = one(Q.none); S.draft = ''; }
    if (id === 'limit') { S.used = LIMIT; S.msgs = one(Q.mood); S.draft = ''; }
    if (id === 'hadith') { if (!S.cur) S.cur = 'b6116'; S.back = 'answer'; if (!S.msgs.length) S.msgs = one(Q.mood); }
  }

  /* ---------- Example messages in the side panel ---------- */
  const EX = [Q.mood, Q.neighbour, Q.fast, Q.masala, Q.none];
  const EXTRA = EX.map((q) => `<button class="kit-chip" type="button" data-ex="${esc(q)}" aria-pressed="false">${esc(q)}</button>`).join('');
  function markEx() {
    const last = [...S.msgs].reverse().find((m) => m.me);
    $$('[data-ex]').forEach((b) => b.setAttribute('aria-pressed', String(!!last && Kit.current !== 'entry' && Kit.current !== 'hadith' && b.dataset.ex === last.me)));
  }

  /* ---------- In-phone actions ---------- */
  const ACT = {
    openchat: () => go(S.msgs.length ? (left() ? 'answer' : 'limit') : 'chat'),
    send: (t) => { const i = $('[data-q]', t.closest('.screen')); send(i ? i.value : S.draft); },
    open: (t) => { S.cur = t.dataset.hid; S.back = Kit.current; go('hadith'); },
    back: () => { go(S.back); toLatest($('#pg-chat')); },
    entry: () => go('entry'),
    exit: () => Kit.snack('আগের পেজে ফিরে যাবে'),
  };
  document.addEventListener('click', (e) => {
    const ex = e.target.closest('[data-ex]');
    if (ex) { if (!left()) S.used = 3; if (PAGE[Kit.current] !== 'chat' || Kit.current === 'limit') go('chat'); send(ex.dataset.ex); return; }
    const t = e.target.closest('[data-act]');
    if (t && t.closest('.phone') && ACT[t.dataset.act]) ACT[t.dataset.act](t);
  });
  document.addEventListener('input', (e) => { if (e.target.matches('[data-q]')) S.draft = e.target.value; });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.matches('[data-q]')) { e.preventDefault(); send(e.target.value); }
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
      $$('[data-scroller]', p).forEach((b) => { b.scrollTop = 0; });
      if (PAGE[id] === 'chat') toLatest(p);
    });
    Kit.init({ demo: opts.demo, name: opts.name, extra: EXTRA, screens: [
      { id: 'entry', label: 'চ্যাট খোলা' },
      { id: 'chat', label: 'চ্যাট পেজ' },
      { id: 'answer', label: 'হাদিস পাওয়া গেছে' },
      { id: 'masala', label: 'মাসআলার প্রশ্ন' },
      { id: 'empty', label: 'কিছু মেলেনি' },
      { id: 'hadith', label: 'হাদিস পেজ' },
      { id: 'limit', label: 'ক্রেডিট শেষ' },
    ] });
  }

  window.BOT = { start, render, S, H, BOOKS, GRADES, T, LIMIT, esc, bn, left, ref, book, credits };
})();
