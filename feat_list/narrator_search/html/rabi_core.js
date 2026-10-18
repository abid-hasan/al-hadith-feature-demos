/* =====================================================================
   রাবির নাম দিয়ে সার্চ — shared demo data and flow engine
   (used by demo1..demo5). Each demo supplies its look as a `D` object
   and calls RabiDemo.start(D, { demo, name }). Screens and chip labels
   are the same in all five demos.
   Scholars will tag who narrated each hadith; counts here are demo
   numbers. Hadith text: safe list only, Bangla only. The flow uses
   আবু হুরায়রা (রাঃ) because the safe hadith list has his hadiths.
   ===================================================================== */
(function () {
  'use strict';
  const { bn, icons, $, $$ } = Kit;

  /* ---------- Narrators (sahabis). intro: from #৩৯; null = no intro yet, show name only.
     books: [name, badge, count, safe hadith keys with text] ---------- */
  const N = [
    { id: 'abuhurayra', name: 'আবু হুরায়রা (রাঃ)', aka: 'আবূ হুরায়রা আবু হুরাইরা',
      intro: 'ইয়েমেনের দাওস গোত্রের সাহাবি। সপ্তম হিজরিতে খায়বার যুদ্ধের সময় মদিনায় আসেন। সাহাবিদের মধ্যে তাঁর বর্ণিত হাদিসই সবচেয়ে বেশি।',
      more: 'তিনি আসহাবে সুফফার সাথে মসজিদে নববীতে থাকতেন এবং সবসময় নবীজির (সাঃ) সাথে থাকার চেষ্টা করতেন। তাই অল্প কয়েক বছরে তিনি অনেক হাদিস শোনেন ও মুখস্থ করেন। তিনি মদিনায় ইন্তেকাল করেন।',
      books: [['সহীহ বুখারী', 'বুখারী', 446, ['b6116', 'b6018', 'b1894']], ['সহীহ মুসলিম', 'মুসলিম', 609], ['সুনানে আবু দাউদ', 'আবু দাউদ', 712], ['জামে তিরমিজি', 'তিরমিজি', 588], ['সুনানে নাসাঈ', 'নাসাঈ', 590], ['সুনানে ইবনে মাজাহ', 'ইবনে মাজাহ', 512]] },
    { id: 'aisha', name: 'আয়েশা (রাঃ)', aka: 'আয়িশা উম্মুল মুমিনীন',
      intro: 'নবীজির (সাঃ) স্ত্রী এবং আবু বকর (রাঃ)-এর কন্যা। নবীজির (সাঃ) ঘরের জীবন আর ইবাদতের অনেক হাদিস তাঁর মাধ্যমে এসেছে।',
      more: 'বড় বড় সাহাবিরাও দ্বীনের অনেক বিষয়ে তাঁর কাছে জানতে চাইতেন। তিনি মদিনায় ইন্তেকাল করেন।',
      books: [['সহীহ বুখারী', 'বুখারী', 242], ['সহীহ মুসলিম', 'মুসলিম', 297], ['সুনানে আবু দাউদ', 'আবু দাউদ', 301], ['জামে তিরমিজি', 'তিরমিজি', 214]] },
    { id: 'umar', name: 'উমর ইবনুল খাত্তাব (রাঃ)', aka: 'ওমর আল-ফারুক',
      intro: 'ইসলামের দ্বিতীয় খলিফা, ন্যায়বিচারের জন্য প্রসিদ্ধ। নিয়তের হাদিসটি তাঁর বর্ণনায় এসেছে।',
      more: 'তিনি কুরাইশ বংশের লোক এবং মক্কি জীবনেই ইসলাম গ্রহণ করেন। তাঁর খিলাফতের সময় হিজরি সন গণনা শুরু হয়।',
      books: [['সহীহ বুখারী', 'বুখারী', 60, ['b1']], ['সহীহ মুসলিম', 'মুসলিম', 41], ['জামে তিরমিজি', 'তিরমিজি', 38]] },
    { id: 'ibnumar', name: 'আবদুল্লাহ ইবনে উমর (রাঃ)', aka: 'ইবনে উমর',
      intro: 'উমর (রাঃ)-এর ছেলে। নবীজির (সাঃ) সুন্নাহ খুঁটিনাটি মেনে চলার জন্য পরিচিত।',
      more: 'অল্প বয়সে বাবার সাথে ইসলাম গ্রহণ করেন এবং মদিনায় হিজরত করেন।',
      books: [['সহীহ বুখারী', 'বুখারী', 270], ['সহীহ মুসলিম', 'মুসলিম', 280]] },
    { id: 'ibnabbas', name: 'আবদুল্লাহ ইবনে আব্বাস (রাঃ)', aka: 'ইবনে আব্বাস',
      intro: 'নবীজির (সাঃ) চাচা আব্বাস (রাঃ)-এর ছেলে। কুরআনের ব্যাখ্যায় বিশেষভাবে পরিচিত।',
      more: 'নবীজির (সাঃ) ইন্তেকালের সময় তিনি কিশোর ছিলেন।',
      books: [['সহীহ বুখারী', 'বুখারী', 217], ['সহীহ মুসলিম', 'মুসলিম', 190]] },
    { id: 'anas', name: 'আনাস ইবনে মালিক (রাঃ)', aka: 'আনাস',
      intro: 'মদিনার আনসারি সাহাবি। দশ বছর নবীজির (সাঃ) খেদমত করেছেন।',
      more: 'শিশু বয়সে তাঁর মা তাঁকে নবীজির (সাঃ) খেদমতে দেন।',
      books: [['সহীহ বুখারী', 'বুখারী', 268], ['সহীহ মুসলিম', 'মুসলিম', 225]] },
    { id: 'jabir', name: 'জাবির ইবনে আবদুল্লাহ (রাঃ)', aka: 'জাবের',
      intro: 'মদিনার আনসারি সাহাবি। অনেক অভিযানে নবীজির (সাঃ) সাথে ছিলেন।', more: '',
      books: [['সহীহ বুখারী', 'বুখারী', 212], ['সহীহ মুসলিম', 'মুসলিম', 245]] },
    { id: 'abumalik', name: 'আবু মালিক আল-আশআরী (রাঃ)', aka: 'আবূ মালিক',
      intro: 'ইয়েমেনের আশআরী গোত্রের সাহাবি।', more: '',
      books: [['সহীহ মুসলিম', 'মুসলিম', 4, ['m223']]] },
    { id: 'abusaid', name: 'আবু সাঈদ আল-খুদরী (রাঃ)', aka: 'আবূ সাঈদ খুদরি', intro: null, more: '',
      books: [['সহীহ বুখারী', 'বুখারী', 111], ['সহীহ মুসলিম', 'মুসলিম', 94]] },
  ];

  /* ---------- Hadiths with text (safe list only) ---------- */
  const H = {
    b6116: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 6116, kitab: 'আচার-ব্যবহার', tr: 'এক ব্যক্তি নবী (সাঃ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বলল, নবী (সাঃ) প্রত্যেক বারেই বললেন: রাগ করো না।' },
    b6018: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 6018, kitab: 'আচার-ব্যবহার', tr: 'যে আল্লাহ ও শেষ দিনের প্রতি ঈমান রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।' },
    b1894: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 1894, kitab: 'সাওম', tr: 'রোজা ঢালস্বরূপ।' },
    b1: { book: 'সহীহ বুখারী', ab: 'বুখারী', no: 1, kitab: 'ওহীর সূচনা', tr: 'সকল কাজ নিয়তের ওপর নির্ভরশীল। প্রত্যেক ব্যক্তি তা-ই পাবে, যার সে নিয়ত করে।' },
    m223: { book: 'সহীহ মুসলিম', ab: 'মুসলিম', no: 223, kitab: 'পবিত্রতা', tr: 'পবিত্রতা ঈমানের অর্ধেক।' },
  };
  const narOf = (k) => N.find((n) => n.books.some((b) => (b[3] || []).includes(k)));
  const total = (n) => n.books.reduce((s, b) => s + b[2], 0);
  const fmt = (v) => bn(v.toLocaleString('en-US'));
  const initial = (n) => n.name.replace(/^আবু\s/, '').charAt(0);
  const nar = (id) => N.find((n) => n.id === id);

  /* ---------- State ---------- */
  const S = { q: '', nid: 'abuhurayra', bk: 0, hk: 'b6116', more: false, resultFrom: 'pick', hFrom: 'book' };
  const norm = (s) => s.replace(/\((রাঃ|রহঃ)\)/g, '').replace(/[\s\-.]/g, '').replace(/ূ/g, 'ু').replace(/ই/g, 'য়');
  const results = () => { const q = norm(S.q); return N.filter((n) => !q || norm(`${n.name} ${n.aka}`).includes(q)); };
  const cur = () => nar(S.nid);
  const book = () => cur().books[S.bk];
  const bookKeys = () => book()[3] || [];

  /* ---------- Shared: hadith page and the #৩৯ intro sheet on the narrator's name ---------- */
  function hadithHTML(D) {
    const h = H[S.hk], n = narOf(S.hk);
    return `<header class="appbar"><button class="icon-btn" data-act="hback" aria-label="পেছনে">${icons.back}</button><h1>${h.book}<small>হাদিস: ${bn(h.no)}</small></h1></header>
      <div class="rb"><div class="scroll" style="padding-top:14px"><article class="card hc">
        <div class="hadith-head"><span class="book-badge">${h.ab}</span><div class="hadith-meta"><b>${h.book}</b><span>হাদিস: ${bn(h.no)} · ${h.kitab}</span></div><span class="grade">সহিহ হাদিস</span></div>
        <p class="narrator"><button class="nar" data-act="nar">${n.name}</button> থেকে বর্ণিত:</p><p class="translation">${h.tr}</p>${D.hFoot ? D.hFoot(h) : ''}</article></div></div>`;
  }
  let nsMore = false;
  function nsHTML() {
    const n = narOf(S.hk);
    return `<div class="sheet-head"><h2>${n.name}<small class="ns-s">সাহাবি</small></h2><button class="icon-btn" data-close aria-label="বন্ধ করুন">${icons.close}</button></div>
      <div class="sheet-body"><p class="ns-p">${n.intro}${nsMore && n.more ? ` ${n.more}` : ''}</p></div>
      <div class="sheet-foot">${n.more && !nsMore ? '<button class="btn text" data-act="nsmore">আরো পড়ুন</button>' : ''}<button class="btn" data-act="his">তাঁর বর্ণিত হাদিস</button></div>`;
  }

  /* ---------- Engine ---------- */
  const SCREENS = [
    { id: 'search', label: 'সার্চ পেজ' },
    { id: 'pick', label: 'রাবি বাছা' },
    { id: 'result', label: 'রাবির হাদিস' },
    { id: 'book', label: 'বইয়ের হাদিস' },
    { id: 'hadith', label: 'হাদিস পড়া' },
    { id: 'namesheet', label: 'নামে ট্যাপ' },
  ];
  function start(D, opts) {
    let internal = false;
    const go = (id) => { internal = true; Kit.show(id); internal = false; };
    const fillRes = () => { const r = $('.sheet.on [data-res]') || $('.screen.on [data-res]'); if (r) r.innerHTML = D.results(results()); };
    const openNs = () => { nsMore = false; const el = $('#ns'); el.innerHTML = nsHTML(); Kit.open(el.id); };
    function render(id) {
      const el = $(`.screen[data-screen="${id}"]`);
      el.innerHTML = id === 'hadith' || id === 'namesheet' ? hadithHTML(D) : D[id]();
      fillRes();
      D.after?.(id, el);
    }
    const rerender = () => { const s = $('.screen.on'), sc = $('.scroll', s), top = sc ? sc.scrollTop : 0; render(Kit.current); const sc2 = $('.scroll', s); if (sc2) sc2.scrollTop = top; };
    Kit.onScreen((id) => {
      if (!internal) { // a toolbar chip: set up that step
        if (id === 'search') S.q = '';
        if (id === 'pick') S.q = 'আবু';
        if (id !== 'search' && id !== 'pick') { S.nid = 'abuhurayra'; S.q = 'আবু'; S.resultFrom = 'pick'; S.more = false; S.bk = 0; }
        if (id === 'hadith' || id === 'namesheet') { S.hk = 'b6116'; S.hFrom = 'book'; }
      }
      render(id);
      if (!internal && id === 'namesheet') openNs();
    });
    const ACT = {
      rabi: () => go('pick'),
      pback: () => go('search'),
      n: (el) => { S.nid = el.dataset.n; S.more = false; S.resultFrom = 'pick'; Kit.closeAll(); go('result'); },
      rback: () => go(S.resultFrom),
      more: () => { S.more = !S.more; rerender(); },
      bk: (el) => { S.bk = +el.dataset.b; go('book'); },
      bback: () => go('result'),
      hd: (el) => { S.hk = el.dataset.k; S.hFrom = Kit.current; go('hadith'); },
      hback: () => go(S.hFrom),
      nar: () => openNs(),
      nsmore: () => { nsMore = true; $('#ns').innerHTML = nsHTML(); },
      his: () => { S.nid = narOf(S.hk).id; S.more = false; S.resultFrom = 'hadith'; S.hFrom = 'book'; S.bk = 0; go('result'); },
      clr: () => { S.q = ''; const i = $('.sheet.on [data-q]') || $('.screen.on [data-q]'); if (i) { i.value = ''; i.focus(); } fillRes(); $$('[data-act="clr"]').forEach((b) => { b.hidden = true; }); },
    };
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-act]');
      if (!el || !el.closest('.phone')) return;
      if (D.act?.[el.dataset.act]) D.act[el.dataset.act](el, { go, rerender });
      else ACT[el.dataset.act]?.(el);
    });
    document.addEventListener('input', (e) => {
      if (!e.target.matches('[data-q]')) return;
      S.q = e.target.value; fillRes();
      $$('[data-act="clr"]').forEach((b) => { b.hidden = !S.q; });
      D.onInput?.();
    });
    $$('[data-ic]').forEach((b) => { b.innerHTML = icons[b.dataset.ic]; });
    Kit.init({ demo: opts.demo, name: opts.name, screens: SCREENS });
  }

  window.RabiDemo = { start, N, H, S, cur, book, bookKeys, total, fmt, initial, results, narOf };
})();
