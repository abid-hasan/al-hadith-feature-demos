/* ======================================================================
   স্মার্ট AI সার্চ — ENGINE (shared by all 5 demos).
   Demo hadith, the team's spelling list, the Roman-letter word list,
   typo fix, chapter match, highlight, the AI (meaning) ranking and the
   flow. Each demo's own look lives in its D object; D must render the
   screens search / results / ai / hadith / empty.
   - Hadith text: only the safe list (বুখারি ১, ১৮৯৪, ৬০১৮, ৬১১৬, মুসলিম ২২৩).
   - AI ranking here is a stand-in: each hadith carries topic words; in the
     app the server ranks by meaning. AI never writes text of its own.
   ====================================================================== */
const { $, $$, bn, icons } = Kit;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Demo hadith + chapter name + topic words for the AI stand-in ---------- */
const BOOKS = { bukhari: { name: 'সহিহ বুখারি', abbr: 'বুখারী' }, muslim: { name: 'সহিহ মুসলিম', abbr: 'মুসলিম' } };
const HADITHS = [
  { id: 'b1', book: 'bukhari', num: 1, chapter: 'ওহীর সূচনা', nar: 'উমর ইবনুল খাত্তাব (রা.) থেকে বর্ণিত', bn: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।',
    topics: [['নিয়ত', 3], ['উদ্দেশ্য', 3], ['দেখানো', 3], ['লোক দেখা', 3], ['মনের ইচ্ছা', 3], ['কবুল', 2], ['ভালো কাজ', 2]] },
  { id: 'b1894', book: 'bukhari', num: 1894, chapter: 'সাওম (রোজা)', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', bn: 'রোজা ঢালস্বরূপ।',
    topics: [['রোজা', 3], ['রমজান', 3], ['সংযম', 3], ['ক্ষুধা', 2], ['উপবাস', 3], ['গুনাহ থেকে বাঁচ', 2]] },
  { id: 'b6018', book: 'bukhari', num: 6018, chapter: 'আদব (শিষ্টাচার)', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', bn: 'যে আল্লাহ ও শেষ দিনের প্রতি ঈমান রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।',
    topics: [['কথা', 3], ['মুখ', 3], ['চুপ', 3], ['জিহ্বা', 3], ['গালি', 3], ['গিবত', 3], ['ঝগড়া', 2], ['রাগ', 1], ['মাথা গরম', 1]] },
  { id: 'b6116', book: 'bukhari', num: 6116, chapter: 'আদব (শিষ্টাচার)', nar: 'আবু হুরায়রা (রা.) থেকে বর্ণিত', bn: 'এক ব্যক্তি নবী (সাঃ)-কে বলল, আমাকে উপদেশ দিন। তিনি বললেন, রাগ করো না। লোকটি কয়েকবার একই কথা বলল, তিনি প্রতিবারই বললেন, রাগ করো না।',
    topics: [['রাগ', 3], ['রেগে', 3], ['মাথা গরম', 3], ['মেজাজ', 3], ['ধৈর্য', 2], ['ঝগড়া', 2], ['উপদেশ', 2]] },
  { id: 'm223', book: 'muslim', num: 223, chapter: 'পবিত্রতা', nar: 'আবু মালিক আশআরি (রা.) থেকে বর্ণিত', bn: 'পবিত্রতা ঈমানের অর্ধেক।',
    topics: [['পবিত্র', 3], ['পরিষ্কার', 3], ['অজু', 3], ['গোসল', 3], ['পাক', 2], ['ঈমান', 1]] },
].map((h, i) => ({ ...h, order: i }));

/* ---------- Spelling fold: small Bangla differences count as the same ----------
   ঈ/ই, ী/ি, ঊ/উ, ূ/ু, য/জ, ণ/ন, ৎ/ত, য-ফলা dropped. `map` keeps the
   source index of every folded letter, so the highlight lands on the
   hadith's own spelling. */
const FOLD = { 'ঈ': 'ই', 'ী': 'ি', 'ঊ': 'উ', 'ূ': 'ু', 'য': 'জ', 'ণ': 'ন', 'ৎ': 'ত', '‌': '', '‍': '' };
const YA = 'য', NUKTA = '়', HASANTA = '্', YYA = 'য়';
function fold(s) {
  const t = [], map = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === YA && s[i + 1] === NUKTA) { t.push(YYA); map.push(i); i++; continue; }   // য + ় = য়
    if (c === HASANTA && s[i + 1] === YA && s[i + 2] !== NUKTA) { i++; continue; }      // য-ফলা
    c = c in FOLD ? FOLD[c] : c.toLowerCase();
    if (c) { t.push(c); map.push(i); }
  }
  return { t: t.join(''), map };
}
HADITHS.forEach((h) => { h.ft = fold(h.bn).t; h.fc = fold(h.chapter).t; h.topics = h.topics.map(([p, w]) => [fold(p).t, w]); });

/* ---------- Team spelling list (ships with the app, works offline) ---------- */
const SPELLINGS = [
  ['সদকা', 'সাদাকা', 'সাদকা', 'ছদকা'],
  ['নিয়ত', 'নিয়্যত', 'নিয়াত', 'নিয়্যাত'],
  ['অজু', 'ওজু', 'ওযু', 'উযু'],
  ['কুরআন', 'কোরআন', 'কুরান'],
  ['জিকির', 'যিকির', 'যিকর'],
  ['হজ', 'হজ্জ', 'হজ্ব'],
].map((g) => [...new Set(g.map((w) => fold(w).t))]);
function expand(word) {
  const f = fold(word).t;
  return SPELLINGS.find((g) => g.includes(f)) || [f];
}

/* ---------- Team list of Roman-letter words (Banglish -> Bangla), offline ---------- */
const ROMAN = {
  roja: 'রোজা', roza: 'রোজা', rojar: 'রোজার', rag: 'রাগ', raag: 'রাগ', valo: 'ভালো', bhalo: 'ভালো',
  kotha: 'কথা', iman: 'ঈমান', eman: 'ঈমান', niyot: 'নিয়ত', niyat: 'নিয়ত', niyyat: 'নিয়ত',
  pobitrota: 'পবিত্রতা', pabitrata: 'পবিত্রতা', adob: 'আদব', adab: 'আদব', chup: 'চুপ', dhal: 'ঢাল',
  hole: 'হলে', ki: 'কী', korbo: 'করব', mukh: 'মুখ', ma: 'মা', babar: 'বাবার', odhikar: 'অধিকার',
  namaz: 'নামাজ', namajer: 'নামাজের', namazer: 'নামাজের', fojilot: 'ফজিলত', fazilat: 'ফজিলত',
};
const isRoman = (s) => /[a-z]/i.test(s) && !/[ঀ-৿]/.test(s);

/* ---------- Typo fix: one letter off from a known word (length 4+) ---------- */
const VOCAB = new Map();
HADITHS.forEach((h) => `${h.bn} ${h.chapter}`.split(/[\s,।()\-]+/).forEach((w) => {
  const f = fold(w).t;
  if (f.length >= 4 && !VOCAB.has(f)) VOCAB.set(f, w);
}));
function lev1(a, b) {                                   // true when a and b differ by at most one letter
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, d = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++d > 1) return false;
    if (a.length > b.length) i++; else if (a.length < b.length) j++; else { i++; j++; }
  }
  return d + (a.length - i) + (b.length - j) <= 1;
}
function fixTypo(word) {
  const alts = expand(word);
  if (alts[0].length < 4 || HADITHS.some((h) => alts.some((a) => h.ft.includes(a) || h.fc.includes(a)))) return word;
  for (const [f, w] of VOCAB) if (lev1(alts[0], f)) return w;
  return word;
}

/* ---------- Highlight ranges (grown to whole Bangla letters) ---------- */
const MARK = /[ঁ-ঃ়া-্ৗ]/;
function grow(s, end) {
  while (end < s.length && MARK.test(s[end])) end += s[end] === HASANTA ? 2 : 1;
  return Math.min(end, s.length);
}
function ranges(text, alts) {
  const { t, map } = fold(text), out = [];
  alts.forEach((a) => {
    if (!a) return;
    for (let i = t.indexOf(a); i >= 0; i = t.indexOf(a, i + a.length)) out.push([map[i], grow(text, map[i + a.length - 1] + 1)]);
  });
  out.sort((x, y) => x[0] - y[0]);
  return out.reduce((m, r) => {                                       // join touching words: "ভালো কথা"
    const l = m[m.length - 1];
    if (l && (r[0] <= l[1] || !text.slice(l[1], r[0]).trim())) l[1] = Math.max(l[1], r[1]); else m.push(r);
    return m;
  }, []);
}
function hl(text, alts) {
  if (!alts || !alts.length) return esc(text);
  let o = '', p = 0;
  ranges(text, alts).forEach(([a, b]) => { o += esc(text.slice(p, a)) + `<mark class="hl">${esc(text.slice(a, b))}</mark>`; p = b; });
  return o + esc(text.slice(p));
}

/* ---------- Search ----------
   normal: Roman letters -> Bangla, typo fix, spelling list, text or chapter.
   full  : the exact phrase only ("হুবহু মিল").
   ai    : Roman letters -> Bangla, then ranked by meaning (topic words here).
   literal: "যেভাবে লিখেছেন সেভাবেই খুঁজুন" skips the Roman/typo fix. */
const toLatin = (s) => s.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));
function compute(raw, method, literal) {
  const q = raw.trim().replace(/\s+/g, ' ');
  const base = { q, method, ai: false, fixed: '', list: [] };
  if (/^[0-9০-৯]+$/.test(q)) {
    const n = +toLatin(q);
    return { ...base, num: true, list: HADITHS.filter((h) => h.num === n).map((h) => ({ h, inText: false, inChap: false, alts: [] })) };
  }
  if (method === 'full') {
    const a = [fold(q).t];
    return { ...base, list: HADITHS.filter((h) => h.bn.includes(q)).map((h) => ({ h, inText: true, inChap: false, alts: a })) };
  }
  let words = q.split(' ');
  if (!literal) {
    if (isRoman(q)) words = words.map((w) => ROMAN[w.toLowerCase()] || w);
    if (method === 'normal') words = words.map(fixTypo);
    const fq = words.join(' ');
    if (fq !== q) base.fixed = fq;
  }
  if (method === 'ai') {
    const fq = fold(words.join(' ')).t;
    const list = HADITHS.map((h) => {
      const hits = h.topics.filter(([p]) => fq.includes(p));
      const score = hits.reduce((s, [, w]) => s + w, 0);
      return score ? { h, score, inText: false, inChap: false, alts: hits.map(([p]) => p).filter((p) => h.ft.includes(p)) } : null;
    }).filter(Boolean).sort((a, b) => (b.score - a.score) || (a.h.order - b.h.order));
    return { ...base, ai: true, list };
  }
  const groups = words.map(expand);
  const alts = groups.flat();
  const list = HADITHS.map((h) => {
    const inText = groups.every((g) => g.some((a) => h.ft.includes(a)));
    const inChap = groups.every((g) => g.some((a) => h.fc.includes(a)));
    return inText || inChap ? { h, inText, inChap, alts } : null;
  }).filter(Boolean).sort((a, b) => (b.inText - a.inText) || (a.h.order - b.h.order));
  return { ...base, list };
}

/* ---------- App strings (existing app text where it exists) ---------- */
const T = {
  hint: 'হাদিস নাম্বার / শব্দ দিয়ে খুঁজুন',
  aiHint: 'নিজের ভাষায় প্রশ্ন লিখুন',
  btn: 'সার্চ করুন',
  method: 'সার্চের পদ্ধতি নির্বাচন করুন',
  methods: [['normal', 'স্বাভাবিক'], ['full', 'হুবহু মিল'], ['ai', 'AI সার্চ']],
  you: (q) => `আপনি ( <b class="q-t">${esc(q)}</b> ) লিখে সার্চ করেছেন`,
  count: (n) => `সর্বমোট ফলাফল পাওয়া গেছে : ${bn(n)} টি`,
  fixed: (f) => `খোঁজা হয়েছে: <b>${esc(f)}</b>`,
  literal: 'যেভাবে লিখেছেন সেভাবেই খুঁজুন',
  best: 'সবচেয়ে কাছের হাদিস',
  more: 'আরো কাছাকাছি হাদিস',
  chap: 'অধ্যায়ে মিলেছে',
  none: 'কোন সার্চ রেজাল্ট পাওয়া যায়নি',
  tip: 'বানান একটু বদলে লিখুন, অথবা প্রশ্নটা AI সার্চে খুঁজুন।',
  aiTip: 'প্রশ্নটা অন্যভাবে লিখে আবার সার্চ করুন।',
  tryAi: 'AI সার্চে খুঁজুন',
  voice: 'ভয়েস সার্চে বলা কথা বক্সে বসেছে',
};
const ART = '<svg class="empty-art" width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden="true"><rect x="14" y="8" width="44" height="58" rx="6" style="fill:var(--tint);stroke:var(--primary)" stroke-width="2.5"/><path d="M24 24h24M24 34h24M24 44h12" style="stroke:var(--primary)" stroke-width="2.5" stroke-linecap="round" opacity=".55"/><circle cx="54" cy="54" r="13" style="fill:var(--card);stroke:var(--primary-dark)" stroke-width="3"/><path d="m63.5 63.5 9 9" style="stroke:var(--primary-dark)" stroke-width="4" stroke-linecap="round"/><path d="m49.5 49.5 9 9m0-9-9 9" style="stroke:var(--primary-dark)" stroke-width="2.5" stroke-linecap="round"/></svg>';

/* ---------- Small shared pieces ---------- */
const ctag = (r) => (r && r.inChap ? `<span class="ctag">${icons.book}${T.chap}</span>` : '');
const grade = () => '<span class="grade">সহিহ হাদিস</span>';
const aib = () => '<span class="aib">AI</span>';
const input = (cls = '') => `<input class="${cls}" data-q type="search" enterkeyhint="search" autocomplete="off" aria-label="হাদিস সার্চ ইনপুট" placeholder="${S.method === 'ai' ? T.aiHint : T.hint}">`;
const clearBtn = () => `<button class="icon-btn" type="button" data-act="clear" aria-label="ক্লিয়ার">${icons.close}</button>`;
const micBtn = () => `<button class="icon-btn mic" type="button" data-act="mic" aria-label="ভয়েস সার্চ">${icons.mic}</button>`;
const tools = () => clearBtn() + micBtn();
/* Method options: each demo styles .mo its own way. */
const methods = (cls = 'mo') => T.methods.map(([m, l]) => `<button class="${cls}" type="button" data-act="method" data-m="${m}" aria-pressed="${S.method === m}"><span class="rd"></span>${m === 'ai' ? aib() : ''}<span class="ml">${l}</span></button>`).join('');
/* "খোঁজা হয়েছে" line + way back to the user's own words. */
const fixLine = (cls = 'fix') => (S.res && S.res.fixed ? `<p class="${cls}">${T.fixed(S.res.fixed)} <button class="lnk" type="button" data-act="literal">${T.literal}</button></p>` : '');
const emptyTip = () => (S.res && S.res.ai ? T.aiTip : T.tip);
const tryAiBtn = (cls = 'btn tonal') => (S.res && !S.res.ai ? `<button class="${cls}" type="button" data-act="try-ai">${aib()}${T.tryAi}</button>` : '');

/* ---------- State + flow ---------- */
const S = { text: '', method: 'normal', res: null, cur: null };
const EXAMPLES = [
  ['normal', 'রোযা'], ['normal', 'নিয়্যত'], ['normal', 'roja'], ['normal', 'valo kotha'], ['normal', 'পবিত্তা'],
  ['ai', 'রাগ উঠলে কী করব'], ['ai', 'মুখ সামলাব কীভাবে'], ['ai', 'rag hole ki korbo'], ['normal', 'মাথা গরম হয়ে যায়'],
];
const EXTRA = EXAMPLES.map(([m, q]) => `<button class="kit-chip" type="button" data-ex="${q}" data-exm="${m}" aria-pressed="false">${m === 'ai' ? 'AI · ' : ''}${q}</button>`).join('');
const cur = () => HADITHS.find((h) => h.id === S.cur);
const hit = () => (S.res ? S.res.list.find((r) => r.h.id === S.cur) : null);
const target = () => (!S.res.list.length ? 'empty' : S.res.ai ? 'ai' : 'results');
function run(raw, literal) {
  const v = String(raw == null ? S.text : raw).trim();
  if (!v) { Kit.snack('সার্চ করার জন্য কিছু লিখুন'); return; }
  S.text = v;
  S.res = compute(v, S.method, literal);
  Kit.show(target());
}
function syncClear(sec) {
  const i = $('[data-q]', sec), has = !!(i && i.value);
  $$('[data-act="clear"]', sec).forEach((b) => { b.hidden = !has; });
  $$('[data-act="mic"]', sec).forEach((b) => { b.hidden = has; });
}
function markEx() {
  $$('[data-ex]').forEach((b) => b.setAttribute('aria-pressed', String(!!S.res && Kit.current !== 'search' && b.dataset.ex === S.res.q && b.dataset.exm === S.res.method)));
}
function render(id) {
  const sec = $(`.screen[data-screen="${id}"]`);
  if (!sec) return;
  D[id] && D[id](sec);
  $$('.body, .rl', sec).forEach((b) => { b.scrollTop = 0; });
  $$('[data-q]', sec).forEach((i) => { i.value = id === 'search' || !S.res ? S.text : S.res.q; });
  $$('[data-count]', sec).forEach((el) => { el.textContent = T.count(S.res ? S.res.list.length : 0); });
  const h = cur();
  if (h) {
    $$('[data-hb]', sec).forEach((el) => { el.textContent = BOOKS[h.book].name; });
    $$('[data-hn]', sec).forEach((el) => { el.textContent = `হাদিস: ${bn(h.num)}`; });
  }
  syncClear(sec);
  markEx();
}
/* A screen opened straight from the toolbar gets a fitting search. */
function preset(method, text) { S.method = method; S.text = text; S.res = compute(text, method); }
Kit.onScreen((id) => {
  if (id === 'results' && !(S.res && S.res.list.length && !S.res.ai)) preset('normal', 'roja');
  if (id === 'ai' && !(S.res && S.res.list.length && S.res.ai)) preset('ai', 'রাগ উঠলে কী করব');
  if (id === 'hadith' && !(S.res && S.res.list.length)) preset('normal', 'roja');
  if (id === 'empty' && !(S.res && !S.res.list.length)) preset('normal', 'মাথা গরম হয়ে যায়');
  if (id === 'hadith' && !hit()) S.cur = S.res.list[0].h.id;
  render(id);
});
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-act],[data-hid],[data-ex]');
  if (!t) return;
  if (t.dataset.ex) { S.method = t.dataset.exm; S.text = t.dataset.ex; run(); return; }
  if (t.dataset.hid) { S.cur = t.dataset.hid; Kit.show('hadith'); return; }
  const a = t.dataset.act, sec = t.closest('.screen');
  const box = sec && $('[data-q]', sec);
  if (a === 'run') run(box ? box.value : S.text);
  if (a === 'method') { if (box) S.text = box.value; S.method = t.dataset.m; render(Kit.current); }
  if (a === 'clear') { S.text = ''; box.value = ''; box.focus(); syncClear(sec); }
  if (a === 'mic') { Kit.snack(T.voice); run(S.method === 'ai' ? 'রাগ উঠলে কী করব' : 'রোজা'); }
  if (a === 'literal') run(S.res.q, true);
  if (a === 'try-ai') { S.method = 'ai'; run(S.res.q); }
  if (a === 'back') Kit.show(S.res && S.res.list.length ? target() : 'search');
  if (a === 'edit') { Kit.show('search'); setTimeout(() => { const i = $('.screen.on [data-q]'); if (i) { i.focus(); i.select(); } }, 30); }
  if (a === 'home') Kit.snack('হোম পেজে ফিরে যাবে');
});
document.addEventListener('input', (e) => { if (e.target.matches('[data-q]')) { S.text = e.target.value; syncClear(e.target.closest('.screen')); } });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.matches('[data-q]')) { e.preventDefault(); run(e.target.value); }
  if (e.key === 'Enter' && e.target.matches('[data-hid]')) e.target.click();
});
