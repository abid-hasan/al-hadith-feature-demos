/* =====================================================================
   সাহাবি আর তাবেঈদের জীবনী — shared demo data and flow engine
   (used by demo1..demo5). Each demo supplies its look as a `D` object
   and calls BioDemo.start(D, { demo, name }). Screens and chip labels
   are the same in all five demos.
   Scholars will write and check the real biographies; the text below is
   short, well-known information only. Hadith text: safe list only.
   ===================================================================== */
(function () {
  'use strict';
  const { bn, icons, $, $$ } = Kit;

  /* ---------- People. t: 'sahabi' | 'tabei'; bio: [heading, text] ---------- */
  const P = [
    { id: 'abuhurayra', t: 'sahabi', name: 'আবু হুরায়রা (রাঃ)', aka: 'আবূ হুরায়রা আবু হুরাইরা', full: 'আবদুর রহমান ইবনে সাখর আদ-দাওসী (প্রসিদ্ধ মত)',
      line: 'সবচেয়ে বেশি হাদিস বর্ণনাকারী সাহাবি',
      intro: 'ইয়েমেনের দাওস গোত্রের সাহাবি। খায়বার যুদ্ধের সময় মদিনায় আসেন এবং বাকি জীবন নবীজির (সাঃ) কাছাকাছি কাটান। সাহাবিদের মধ্যে তাঁর বর্ণিত হাদিসই সবচেয়ে বেশি।',
      bio: [
        ['নাম ও পরিচয়', 'তিনি ইয়েমেনের দাওস গোত্রের লোক। তাঁর আসল নাম নিয়ে কয়েকটি মত আছে, প্রসিদ্ধ মত হলো আবদুর রহমান ইবনে সাখর। ছোট একটি বিড়ালছানার প্রতি মমতার জন্য তিনি আবু হুরায়রা নামে পরিচিত হন।'],
        ['ইসলাম গ্রহণ', 'নিজ গোত্রের তুফাইল ইবনে আমর আদ-দাওসী (রাঃ)-এর দাওয়াতে তিনি ইসলাম গ্রহণ করেন। সপ্তম হিজরিতে খায়বার যুদ্ধের সময় তিনি মদিনায় আসেন।'],
        ['জ্ঞান ও হাদিস', 'তিনি আসহাবে সুফফার সাথে মসজিদে নববীতে থাকতেন এবং সবসময় নবীজির (সাঃ) সাথে থাকার চেষ্টা করতেন। তাই অল্প কয়েক বছরে তিনি অনেক হাদিস শোনেন ও মুখস্থ করেন।'],
        ['ইন্তেকাল', 'তিনি মদিনায় ইন্তেকাল করেন।']],
      books: [['সহীহ বুখারী', 446, ['b6116', 'b6018', 'b1894']], ['সহীহ মুসলিম', 609], ['সুনানে আবু দাউদ', 712], ['জামে তিরমিজি', 588]] },
    { id: 'aisha', t: 'sahabi', name: 'আয়েশা (রাঃ)', aka: 'আয়িশা উম্মুল মুমিনীন', full: 'আয়েশা বিনতে আবু বকর (রাঃ)',
      line: 'উম্মুল মুমিনীন, আবু বকর (রাঃ)-এর কন্যা',
      intro: 'নবীজির (সাঃ) স্ত্রী এবং আবু বকর (রাঃ)-এর কন্যা। তিনি বহু হাদিস বর্ণনা করেছেন এবং দ্বীনের জ্ঞানে সাহাবিদের মধ্যে প্রসিদ্ধ ছিলেন।',
      bio: [['পরিচয়', 'তিনি প্রথম খলিফা আবু বকর (রাঃ)-এর কন্যা এবং উম্মুল মুমিনীন, অর্থাৎ মুমিনদের মা।'],
        ['জ্ঞান ও হাদিস', 'নবীজির (সাঃ) ঘরের জীবন, ইবাদত আর আচরণের অনেক হাদিস তাঁর মাধ্যমে এসেছে। বড় বড় সাহাবিরাও অনেক বিষয়ে তাঁর কাছে জানতে চাইতেন।'],
        ['ইন্তেকাল', 'তিনি মদিনায় ইন্তেকাল করেন।']],
      books: [['সহীহ বুখারী', 242], ['সহীহ মুসলিম', 297], ['সুনানে আবু দাউদ', 301]] },
    { id: 'umar', t: 'sahabi', name: 'উমর ইবনুল খাত্তাব (রাঃ)', aka: 'ওমর আল-ফারুক', full: 'উমর ইবনুল খাত্তাব (রাঃ)',
      line: 'দ্বিতীয় খলিফা, উপাধি আল-ফারুক',
      intro: 'ইসলামের দ্বিতীয় খলিফা, ন্যায়বিচারের জন্য প্রসিদ্ধ। নিয়তের হাদিসটি তাঁর বর্ণনায় এসেছে।',
      bio: [['পরিচয়', 'তিনি কুরাইশ বংশের লোক। মক্কি জীবনেই তিনি ইসলাম গ্রহণ করেন।'],
        ['খিলাফত', 'আবু বকর (রাঃ)-এর পর তিনি খলিফা হন। তাঁর সময়েই হিজরি সন গণনা শুরু হয়।'],
        ['শাহাদাত', 'মসজিদে নববীতে ফজরের নামাজের সময় এক আততায়ীর আঘাতে তিনি শহিদ হন।']],
      books: [['সহীহ বুখারী', 60, ['b1']], ['সহীহ মুসলিম', 41]] },
    { id: 'ibnabbas', t: 'sahabi', name: 'আবদুল্লাহ ইবনে আব্বাস (রাঃ)', aka: 'ইবনে আব্বাস', full: 'আবদুল্লাহ ইবনে আব্বাস (রাঃ)',
      line: 'নবীজির (সাঃ) চাচাতো ভাই',
      intro: 'নবীজির (সাঃ) চাচা আব্বাস (রাঃ)-এর ছেলে। কুরআনের ব্যাখ্যায় তিনি বিশেষভাবে পরিচিত।',
      bio: [['পরিচয়', 'তিনি নবীজির (সাঃ) চাচা আব্বাস (রাঃ)-এর ছেলে। নবীজির (সাঃ) ইন্তেকালের সময় তিনি কিশোর ছিলেন। পরে কুরআনের ব্যাখ্যা আর ফিকহে তিনি বিশেষ পরিচিতি পান।']],
      books: [['সহীহ বুখারী', 217], ['সহীহ মুসলিম', 190]] },
    { id: 'anas', t: 'sahabi', name: 'আনাস ইবনে মালিক (রাঃ)', aka: 'আনাস', full: 'আনাস ইবনে মালিক আল-আনসারী (রাঃ)',
      line: 'দশ বছর নবীজির (সাঃ) খেদমত করেছেন',
      intro: 'মদিনার আনসারি সাহাবি। শিশু বয়স থেকে দশ বছর নবীজির (সাঃ) খেদমত করেছেন।',
      bio: [['পরিচয়', 'তিনি মদিনার আনসারি সাহাবি। শিশু বয়সে তাঁর মা তাঁকে নবীজির (সাঃ) খেদমতে দেন। তিনি দশ বছর নবীজির (সাঃ) সেবা করেন এবং অনেক হাদিস বর্ণনা করেন।']],
      books: [['সহীহ বুখারী', 268], ['সহীহ মুসলিম', 225]] },
    { id: 'abumalik', t: 'sahabi', name: 'আবু মালিক আল-আশআরী (রাঃ)', aka: 'আবূ মালিক', full: 'আবু মালিক আল-আশআরী (রাঃ)',
      line: 'ইয়েমেনের আশআরী গোত্রের সাহাবি',
      intro: 'ইয়েমেনের আশআরী গোত্রের সাহাবি। পবিত্রতা ঈমানের অর্ধেক, এই হাদিসটি তাঁর বর্ণনায় এসেছে।',
      bio: [['পরিচয়', 'তিনি ইয়েমেনের আশআরী গোত্রের সাহাবি। পবিত্রতা ঈমানের অর্ধেক, এই হাদিসটি তাঁর বর্ণনায় এসেছে।']],
      books: [['সহীহ মুসলিম', 4, ['m223']]] },
    { id: 'jabir', t: 'sahabi', name: 'জাবির ইবনে আবদুল্লাহ (রাঃ)', aka: 'জাবের', full: 'জাবির ইবনে আবদুল্লাহ আল-আনসারী (রাঃ)',
      line: 'মদিনার আনসারি সাহাবি',
      intro: 'মদিনার আনসারি সাহাবি। তাঁর বর্ণিত হাদিসের সংখ্যাও অনেক।',
      bio: [['পরিচয়', 'তিনি মদিনার আনসারি সাহাবি। নবীজির (সাঃ) সাথে অনেক অভিযানে অংশ নেন এবং অনেক হাদিস বর্ণনা করেন।']],
      books: [['সহীহ বুখারী', 212], ['সহীহ মুসলিম', 245]] },
    { id: 'alqama', t: 'tabei', name: 'আলকামা ইবনে ওয়াক্কাস (রহঃ)', aka: 'আলকামা আল-লাইসি', full: 'আলকামা ইবনে ওয়াক্কাস আল-লাইসি (রহঃ)',
      line: 'উমর (রাঃ) থেকে নিয়তের হাদিস বর্ণনাকারী',
      intro: 'মদিনার তাবেঈ। নিয়তের হাদিসটি তিনি উমর (রাঃ) থেকে বর্ণনা করেছেন।',
      bio: [['পরিচয়', 'তিনি মদিনার একজন তাবেঈ। উমর (রাঃ) থেকে তিনি নিয়তের হাদিসটি বর্ণনা করেছেন।']],
      books: [['সহীহ বুখারী', 3]] },
    { id: 'said', t: 'tabei', name: 'সাঈদ ইবনুল মুসাইয়্যিব (রহঃ)', aka: 'সাঈদ ইবনে মুসাইয়্যিব', full: 'সাঈদ ইবনুল মুসাইয়্যিব আল-মাখযুমী (রহঃ)',
      line: 'মদিনার প্রসিদ্ধ তাবেঈ ও ফকিহ',
      intro: 'মদিনার প্রসিদ্ধ তাবেঈ। আবু হুরায়রা (রাঃ) থেকে অনেক হাদিস বর্ণনা করেছেন।',
      bio: [['পরিচয়', 'তিনি মদিনার প্রসিদ্ধ তাবেঈ। উমর (রাঃ)-এর খিলাফতকালে তাঁর জন্ম। আবু হুরায়রা (রাঃ) ছিলেন তাঁর শ্বশুর, তাঁর থেকে তিনি অনেক হাদিস বর্ণনা করেছেন।']],
      books: [['সহীহ বুখারী', 74], ['সহীহ মুসলিম', 86]] },
    { id: 'urwa', t: 'tabei', name: 'উরওয়া ইবনুয যুবাইর (রহঃ)', aka: 'উরওয়া', full: 'উরওয়া ইবনুয যুবাইর ইবনুল আওয়াম (রহঃ)',
      line: 'আয়েশা (রাঃ)-এর ভাগ্নে, মদিনার তাবেঈ',
      intro: 'যুবাইর ইবনুল আওয়াম (রাঃ) আর আসমা বিনতে আবু বকর (রাঃ)-এর ছেলে। খালা আয়েশা (রাঃ) থেকে অনেক হাদিস বর্ণনা করেছেন।',
      bio: [['পরিচয়', 'তিনি যুবাইর ইবনুল আওয়াম (রাঃ) আর আসমা বিনতে আবু বকর (রাঃ)-এর ছেলে। খালা আয়েশা (রাঃ) থেকে তিনি অনেক হাদিস বর্ণনা করেছেন।']],
      books: [['সহীহ বুখারী', 160], ['সহীহ মুসলিম', 131]] },
    { id: 'hasan', t: 'tabei', name: 'হাসান আল-বাসরি (রহঃ)', aka: 'হাসান বসরি', full: 'হাসান ইবনে আবুল হাসান আল-বাসরি (রহঃ)',
      line: 'বসরার প্রসিদ্ধ তাবেঈ',
      intro: 'বসরার প্রসিদ্ধ তাবেঈ। দুনিয়াবিমুখতা আর উপদেশের জন্য পরিচিত।',
      bio: [['পরিচয়', 'তিনি বসরার প্রসিদ্ধ তাবেঈ। দুনিয়াবিমুখতা আর উপদেশের জন্য তিনি পরিচিত ছিলেন।']],
      books: [['সহীহ বুখারী', 31], ['সহীহ মুসলিম', 18]] },
    { id: 'nafi', t: 'tabei', name: 'নাফে (রহঃ)', aka: 'নাফি', full: 'নাফে, আবদুল্লাহ ইবনে উমর (রাঃ)-এর মুক্ত দাস (রহঃ)',
      line: 'আবদুল্লাহ ইবনে উমর (রাঃ)-এর মুক্ত দাস',
      intro: 'আবদুল্লাহ ইবনে উমর (রাঃ)-এর মুক্ত দাস। দীর্ঘদিন তাঁর সাথে থেকে অনেক হাদিস বর্ণনা করেছেন।',
      bio: [['পরিচয়', 'তিনি আবদুল্লাহ ইবনে উমর (রাঃ)-এর মুক্ত দাস। দীর্ঘদিন তাঁর সাথে থেকে তাঁর থেকে অনেক হাদিস বর্ণনা করেছেন।']],
      books: [['সহীহ বুখারী', 140], ['সহীহ মুসলিম', 122]] },
  ];
  const TYPE = { sahabi: 'সাহাবি', tabei: 'তাবেঈ' };
  const SRC = { sahabi: ['আল-ইসাবা ফী তাময়ীযিস সাহাবা', 7], tabei: ['সিয়ারু আলামিন নুবালা', 4] };
  const src = (p) => { const i = P.indexOf(p); const [b, v] = SRC[p.t]; return `${b}, খণ্ড ${bn(v)}, পৃষ্ঠা ${bn(112 + i * 23)}`; };
  const total = (p) => p.books.reduce((s, b) => s + b[1], 0);
  const initial = (p) => p.name.replace(/^আবু\s/, '').charAt(0);

  /* ---------- Hadiths (safe list only, Bangla only) ---------- */
  const H = {
    b6116: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 6116, kitab: 'আচার-ব্যবহার', p: 'abuhurayra', tr: 'এক ব্যক্তি নবী (সাঃ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বলল, নবী (সাঃ) প্রত্যেক বারেই বললেন: রাগ করো না।' },
    b6018: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 6018, kitab: 'আচার-ব্যবহার', p: 'abuhurayra', tr: 'যে আল্লাহ ও শেষ দিনের প্রতি ঈমান রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।' },
    b1894: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 1894, kitab: 'সাওম', p: 'abuhurayra', tr: 'রোজা ঢালস্বরূপ।' },
    b1: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 1, kitab: 'ওহীর সূচনা', p: 'umar', tr: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।' },
    m223: { book: 'সহীহ মুসলিম', ab: 'মুসলিম', no: 223, kitab: 'পবিত্রতা', p: 'abumalik', tr: 'পবিত্রতা ঈমানের অর্ধেক।' },
  };
  const CARD_LIST = ['b6018', 'b6116']; // the hadith list page (সহীহ বুখারী · আচার-ব্যবহার)
  const person = (id) => P.find((p) => p.id === id);

  /* ---------- State ---------- */
  const S = { f: 'all', q: '', pid: 'abuhurayra', bioFrom: 'list', hisFrom: 'bio', open: 0 };
  const norm = (s) => s.replace(/\((রাঃ|রহঃ)\)/g, '').replace(/[\s\-.]/g, '').replace(/ূ/g, 'ু').replace(/ই/g, 'য়');
  function results() {
    const q = norm(S.q);
    return P.filter((p) => (S.f === 'all' || p.t === S.f) && (!q || norm(`${p.name} ${p.aka} ${p.full}`).includes(q)));
  }

  /* ---------- Shared: the hadith list page with tappable narrator names ---------- */
  function narLine(k) {
    const p = person(H[k].p);
    return `<p class="narrator"><button class="nar" data-act="nar" data-p="${p.id}">${p.name}</button> থেকে বর্ণিত:</p>`;
  }
  function hadithCard(k, D) {
    const h = H[k];
    return `<article class="card hc"><div class="hadith-head"><span class="book-badge">${h.ab}</span><div class="hadith-meta"><b>${h.book}</b><span>হাদিস: ${bn(h.no)}</span></div><span class="grade">সহিহ হাদিস</span></div>
      ${D.narLine ? D.narLine(k) : narLine(k)}<p class="translation">${h.tr}</p>${D.cardFoot ? D.cardFoot(k) : ''}</article>`;
  }
  function cardPage(D) {
    return `<header class="appbar"><button class="icon-btn" aria-label="পেছনে" tabindex="-1">${icons.back}</button><h1>সহীহ বুখারী<small>আচার-ব্যবহার</small></h1></header>
      <div class="rb"><div class="scroll" style="padding-top:14px">${CARD_LIST.map((k) => hadithCard(k, D)).join('')}</div></div>`;
  }

  /* ---------- Engine ---------- */
  const SCREENS = [
    { id: 'list', label: 'নামের তালিকা' },
    { id: 'search', label: 'নাম দিয়ে সার্চ' },
    { id: 'bio', label: 'জীবনী পড়া' },
    { id: 'card', label: 'হাদিস কার্ডে নাম' },
    { id: 'sheet', label: 'ছোট পরিচিতি' },
    { id: 'hadiths', label: 'তাঁর বর্ণিত হাদিস' },
  ];
  const PAGE = { list: 'list', search: 'list', bio: 'bio', card: 'card', sheet: 'card', hadiths: 'hadiths' };

  function start(D, opts) {
    let internal = false;
    const go = (id) => { internal = true; Kit.show(id); internal = false; };
    const sec = () => $('.screen.on');
    const fillRes = () => { const r = $('.screen.on [data-res]'); if (r) r.innerHTML = D.results(results()); D.afterRes?.(); };
    const openPv = (id) => {
      S.pid = id;
      if (D.openPv) { D.openPv(person(id)); return; }
      const el = $('#pv'); el.innerHTML = D.sheet(person(id)); Kit.open(el.id);
    };
    function render(id) {
      const pg = PAGE[id], el = $(`.screen[data-screen="${id}"]`);
      el.innerHTML = pg === 'card' ? (D.card ? D.card() : cardPage(D)) : D[pg](person(S.pid));
      if (pg === 'list') fillRes();
      D.after?.(id, el);
    }
    Kit.onScreen((id) => {
      if (!internal) { // a toolbar chip: set up that step
        if (id === 'list') { S.q = ''; S.f = 'all'; }
        if (id === 'search') { S.q = 'আবু হুরায়রা'; S.f = 'all'; }
        if (id === 'bio') { S.pid = 'abuhurayra'; S.bioFrom = 'search'; }
        if (id === 'hadiths') { S.pid = 'abuhurayra'; S.hisFrom = 'bio'; S.bioFrom = 'search'; }
        S.open = 0;
      }
      render(id);
      if (!internal && id === 'sheet') openPv('abuhurayra');
    });
    const ACT = {
      f: (el) => { S.f = el.dataset.f; $$('.screen.on [data-act="f"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === S.f))); fillRes(); },
      clr: () => { S.q = ''; const i = $('.screen.on [data-q]'); if (i) { i.value = ''; i.focus(); } fillRes(); },
      person: (el) => { S.pid = el.dataset.p; S.bioFrom = ['card', 'sheet'].includes(Kit.current) ? 'card' : Kit.current; Kit.close('pv'); go('bio'); },
      bback: () => go(S.bioFrom),
      nar: (el) => openPv(el.dataset.p),
      more: () => { S.bioFrom = 'card'; go('bio'); },
      his: () => { S.hisFrom = ['card', 'sheet'].includes(Kit.current) ? 'card' : 'bio'; S.open = 0; go('hadiths'); },
      hback: () => go(S.hisFrom),
      bk: (el) => { const i = +el.dataset.i; S.open = S.open === i ? -1 : i; const s = sec(); const top = $('.scroll', s)?.scrollTop || 0; s.innerHTML = D.hadiths(person(S.pid)); const sc = $('.scroll', s); if (sc) sc.scrollTop = top; },
    };
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-act]');
      if (!el || !el.closest('.phone')) return;
      if (ACT[el.dataset.act]) ACT[el.dataset.act](el);
      else D.act?.[el.dataset.act]?.(el);
    });
    document.addEventListener('input', (e) => {
      if (!e.target.matches('[data-q]')) return;
      S.q = e.target.value; fillRes();
      $$('.screen.on [data-act="clr"]').forEach((b) => { b.hidden = !S.q; });
    });
    $$('[data-ic]').forEach((b) => { b.innerHTML = icons[b.dataset.ic]; });
    Kit.init({ demo: opts.demo, name: opts.name, screens: SCREENS });
  }

  /* ---------- Shared body of "তাঁর বর্ণিত হাদিস" (#৬০-এর পেজ): total, books, cards ----------
     Only safe-list hadiths have text, so only those books open. */
  const fmt = (n) => bn(n.toLocaleString('en-US'));
  function hisBody(p) {
    return `<div class="hs-top"><b>${p.name}</b><span>মোট ${fmt(total(p))}টি হাদিস · ${bn(p.books.length)}টি বই</span></div>
      ${p.books.map((b, i) => {
        const cards = b[2] || [], open = cards.length && S.open === i;
        return `<div class="hs-b${open ? ' on' : ''}">
          <button class="hs-r" ${cards.length ? `data-act="bk" data-i="${i}" aria-expanded="${!!open}"` : 'tabindex="-1"'}><span>${b[0]}</span><b>${fmt(b[1])}টি</b>${cards.length ? icons.down : ''}</button>
          ${open ? cards.map((k) => `<article class="hs-c"><div class="hadith-head"><span class="book-badge">${H[k].ab}</span><div class="hadith-meta"><b>${H[k].book}</b><span>হাদিস: ${bn(H[k].no)} · ${H[k].kitab}</span></div><span class="grade">সহিহ হাদিস</span></div><p class="translation">${H[k].tr}</p></article>`).join('') : ''}</div>`;
      }).join('')}`;
  }
  window.BioDemo = { start, P, H, S, TYPE, src, total, initial, person, results, hisBody, fmt };
})();
