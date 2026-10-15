/* =====================================================================
   ছোট টেকঅ্যাওয়ে — shared part of demo1…demo5 (load after kit.js).
   Holds what is the same in every demo: the real hadith data, today's
   hadith card, details page, more-options sheet, mini settings drawer,
   loading and offline. Each demo passes hooks that place its own
   "মূল শিক্ষা" box. Real data: database_sources/hadith.db + the Bangla
   book databases. Only POINTS is a sample (নমুনা).
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
  "chapter": "ঈমান",
  "narrator": "ইয়াহ্‌ইয়া ইবনু ইয়া‘মার",
  "translation": "বাসরার অধিবাসী মা’বাদ জুহাইনি প্রথম ব্যক্তি যে তাকদীর অস্বীকার করে। আমি ও হুমায়দ ইবনু আবদুর রহমান উভয়ে হজ্জ অথবা উমরার উদ্দেশ্যে রওয়ানা করলাম। আমরা বললাম, যদি আমরা এ সফরে রাসূলুল্লাহ (ﷺ) এর যে কোন সাহাবীর সাক্ষাৎ পেয়ে যাই তাহলে ঐ সব লোক তাকদীর সম্বন্ধে যা কিছু বলে সে সম্পর্কে তাঁকে জিজ্ঞেস করব। সৌভাগ্যক্রমে আমরা আব্দুল্লাহ ইবনু উমর (রাঃ)-এর মসজিদে ঢোকার পথে পেয়ে গেলাম। আমি ও আমার সাথী তাঁকে এমনভাবে ঘিরে নিলাম যে, আমাদের একজন তাঁর ডানে এবং অপরজন তাঁর বামে থাকলাম। আমি মনে করলাম আমার সাথী আমাকেই কথা বলার সুযোগ দেবে। (কারণ আমি ছিলাম বাকপটু)।\n\nআমি বললাম : “হে আবু আব্দুর রহমান! আমাদের এলাকায় এমন কিছু লোকের আবির্ভাব ঘটেছে, তারা একদিকে কুরআন পাঠ করে অপরদিকে জ্ঞানের অন্বেষণও করে। ইয়াহিয়া তাদের কিছু গুণাবলীর কথাও উল্লেখ করলেন। তাদের ধারণা (বক্তব্য) হচ্ছে, তাকদীর বলতে কিছু নেই এবং প্রত্যেক কাজ অকস্মাৎ সংঘটিত হয়।” ইবনু উমর (রাঃ) বললেনঃ “যখন তুমি এদের সাথে সাক্ষাৎ করবে তখন তাদেরকে জানিয়ে দাও যে, তাদের সাথে আমার কোন সম্পর্ক নেই, আর আমার সাথেও তাদের কোন সম্পর্ক নেই। আব্দুল্লাহ ইবনু উমর (রাঃ) আল্লাহর নামে শপথ করে বললেন, এদের কারো কাছে যদি উহুদ পাহাড় পরিমাণ স্বর্ণ থাকে এবং তা দান-খয়রাত করে দেয় তবে আল্লাহ তাঁর এ দান গ্রহণ করবেন না যতক্ষণ পর্যন্ত সে তাকদীরের উপর ঈমান না আনবে। অতঃপর তিনি বললেন, আমার পিতা উমর ইবনুল খাত্তাব (রাঃ) আমার কাছে বর্ণনা করেছেন, তিনি বলেনঃ একদা আমরা রাসূলুল্লাহ (ﷺ)-এর নিকট উপস্থিত ছিলাম। এমন সময় এক ব্যক্তি আমাদের সামনে আবির্ভূত হলো। তার পরনের কাপড়-চোপড় ছিল ধবধবে সাদা এবং মাথার চুলগুলো ছিল মিশমিশে কালো। সফর করে আসার কোন চিহ্নও তাঁর মধ্যে দেখা যায়নি। আমাদের কেউই তাঁকে চিনেও না।\n\nঅবশেষে সে নবী (ﷺ)-এর সামনে বসলো। সে তাঁর হাঁটুদ্বয় নবী (ﷺ)-এর হাঁটুদ্বয়ের সাথে মিলিয়ে দিলো এবং দুই হাতের তালু তাঁর (অথবা নিজের) উরুর উপর রাখলো এবং বললো, হে মুহাম্মাদ (ﷺ)! আমাকে ইসলাম সম্বন্ধে বলুন। রাসূলুল্লাহ (ﷺ) বললেনঃ ইসলাম হচ্ছে এই- তুমি সাক্ষ্য দিবে যে, আল্লাহ ছাড়া প্রকৃতপক্ষে কোন ইলাহ (মাবুদ) নেই, এবং মুহাম্মাদ (ﷺ) আল্লাহর রাসূল, সালাত কায়েম করবে, যাকাত আদায় করবে, রমযানের সাওম পালন করবে এবং যদি পথ অতিক্রম করার সামর্থ্য হয় তখন বাইতুল্লাহর হজ্জ করবে। সে বললো, আপনি সত্যই বলেছেন। বর্ণনাকারী [উমর (রাঃ)] বলেন, আমরা তাঁর কথা শুনে আশ্চর্যান্বিত হলাম। কেননা সে (অজ্ঞের ন্যায়) প্রশ্ন করছে আর (বিজ্ঞের ন্যায়) সমর্থন করছে।\n\nএরপর সে বললো, আমাকে ঈমান সম্পর্কে বলুন। রাসূলুল্লাহ (ﷺ) বললেনঃ ঈমান এই যে, তুমি আল্লাহ, তাঁর ফেরেশতাকুল, তাঁর কিতাবসমূহ, তাঁর প্রেরিত নবীগণ ও শেষ দিনের উপর ঈমান রাখবে এবং তুমি তাকদীর ও এর ভালো ও মন্দের প্রতিও ঈমান রাখবে। সে বললো, আপনি সত্যই বলেছেন। এবার সে বললো, আমাকে ‘ইহসান’ সম্পর্কে বলুন। রাসূলুল্লাহ (ﷺ) বললেনঃ ‘ইহসান’ এই যে, তুমি এমনভাবে আল্লাহর ইবাদত করবে যেন তাঁকে দেখছো, যদি তাকে না দেখো তাহলে তিনি তোমাকে দেখছেন বলে অনুভব করবে।\n\nএবার সে জিজ্ঞেস করলো, আমাকে কেয়ামত সম্বন্ধে বলুন! রাসূলুল্লাহ (ﷺ) বললেনঃ এ ব্যাপারে জিজ্ঞাসাকারীর চেয়ে জিজ্ঞাসিত ব্যক্তি বেশি কিছু জানে না। অতঃপর সে বললো, তাহলে আমাকে এর কিছু নিদর্শন বলুন। তিনি বললেন, দাসী তাঁর মনিবকে প্রসব করবে এবং (এককালের) নগ্নপদ, বস্ত্রহীন, দরিদ্র, ছাগলের রাখালদের বড় দালান-কোঠা নির্মাণের প্রতিযোগিতায় গর্ব-অহংকারে মত্ত দেখতে পাবে।\n\nবর্ণনাকারী [উমর (রাঃ)] বলেন, এরপর লোকটি চলে গেলো। আমি বেশ কিছুক্ষণ অপেক্ষা করলাম। তারপর রাসূলুল্লাহ (ﷺ) আমাকে বললেন, হে উমর! তুমি জান, এ প্রশ্নকারী কে? আমি আরজ করলাম, আল্লাহ ও তাঁর রাসূলই অধিক জ্ঞাত আছেন। রাসূলুল্লাহ (ﷺ) বললেন, তিনি জিবরাইল। তোমাদের কাছে তিনি তোমাদের দ্বীন শিক্ষা দিতে এসেছিলেন।",
  "arabic": "حَدَّثَنِي أَبُو خَيْثَمَةَ، زُهَيْرُ بْنُ حَرْبٍ حَدَّثَنَا وَكِيعٌ، عَنْ كَهْمَسٍ، عَنْ عَبْدِ اللَّهِ بْنِ بُرَيْدَةَ، عَنْ يَحْيَى بْنِ يَعْمَرَ، ح وَحَدَّثَنَا عُبَيْدُ اللَّهِ بْنُ مُعَاذٍ الْعَنْبَرِيُّ، - وَهَذَا حَدِيثُهُ - حَدَّثَنَا أَبِي، حَدَّثَنَا كَهْمَسٌ، عَنِ ابْنِ بُرَيْدَةَ، عَنْ يَحْيَى بْنِ يَعْمَرَ، قَالَ كَانَ أَوَّلَ مَنْ قَالَ فِي الْقَدَرِ بِالْبَصْرَةِ مَعْبَدٌ الْجُهَنِيُّ فَانْطَلَقْتُ أَنَا وَحُمَيْدُ بْنُ عَبْدِ الرَّحْمَنِ الْحِمْيَرِيُّ حَاجَّيْنِ أَوْ مُعْتَمِرَيْنِ فَقُلْنَا لَوْ لَقِينَا أَحَدًا مِنْ أَصْحَابِ رَسُولِ اللَّهِ صلى الله عليه وسلم فَسَأَلْنَاهُ عَمَّا يَقُولُ هَؤُلاَءِ فِي الْقَدَرِ فَوُفِّقَ لَنَا عَبْدُ اللَّهِ بْنُ عُمَرَ بْنِ الْخَطَّابِ دَاخِلاً الْمَسْجِدَ فَاكْتَنَفْتُهُ أَنَا وَصَاحِبِي أَحَدُنَا عَنْ يَمِينِهِ وَالآخَرُ عَنْ شِمَالِهِ فَظَنَنْتُ أَنَّ صَاحِبِي سَيَكِلُ الْكَلاَمَ إِلَىَّ فَقُلْتُ أَبَا عَبْدِ الرَّحْمَنِ إِنَّهُ قَدْ ظَهَرَ قِبَلَنَا نَاسٌ يَقْرَءُونَ الْقُرْآنَ وَيَتَقَفَّرُونَ الْعِلْمَ - وَذَكَرَ مِنْ شَأْنِهِمْ - وَأَنَّهُمْ يَزْعُمُونَ أَنْ لاَ قَدَرَ وَأَنَّ الأَمْرَ أُنُفٌ ‏.‏ قَالَ فَإِذَا لَقِيتَ أُولَئِكَ فَأَخْبِرْهُمْ أَنِّي بَرِيءٌ مِنْهُمْ وَأَنَّهُمْ بُرَآءُ مِنِّي وَالَّذِي يَحْلِفُ بِهِ عَبْدُ اللَّهِ بْنُ عُمَرَ لَوْ أَنَّ لأَحَدِهِمْ مِثْلَ أُحُدٍ ذَهَبًا فَأَنْفَقَهُ مَا قَبِلَ اللَّهُ مِنْهُ حَتَّى يُؤْمِنَ بِالْقَدَرِ ثُمَّ قَالَ حَدَّثَنِي أَبِي عُمَرُ بْنُ الْخَطَّابِ قَالَ بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ صلى الله عليه وسلم ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعَرِ لاَ يُرَى عَلَيْهِ أَثَرُ السَّفَرِ وَلاَ يَعْرِفُهُ مِنَّا أَحَدٌ حَتَّى جَلَسَ إِلَى النَّبِيِّ صلى الله عليه وسلم فَأَسْنَدَ رُكْبَتَيْهِ إِلَى رُكْبَتَيْهِ وَوَضَعَ كَفَّيْهِ عَلَى فَخِذَيْهِ وَقَالَ يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الإِسْلاَمِ ‏.‏ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَتُقِيمَ الصَّلاَةَ وَتُؤْتِيَ الزَّكَاةَ وَتَصُومَ رَمَضَانَ وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً ‏.‏ قَالَ صَدَقْتَ ‏.‏ قَالَ فَعَجِبْنَا لَهُ يَسْأَلُهُ وَيُصَدِّقُهُ ‏.‏ قَالَ فَأَخْبِرْنِي عَنِ الإِيمَانِ ‏.‏ قَالَ ‏\"‏ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلاَئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ ‏\"‏ ‏.‏ قَالَ صَدَقْتَ ‏.‏ قَالَ فَأَخْبِرْنِي عَنِ الإِحْسَانِ ‏.‏ قَالَ ‏\"‏ أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ ‏\"‏ ‏.‏ قَالَ فَأَخْبِرْنِي عَنِ السَّاعَةِ ‏.‏ قَالَ ‏\"‏ مَا الْمَسْئُولُ عَنْهَا بِأَعْلَمَ مِنَ السَّائِلِ ‏\"‏ ‏.‏ قَالَ فَأَخْبِرْنِي عَنْ أَمَارَتِهَا ‏.‏ قَالَ ‏\"‏ أَنْ تَلِدَ الأَمَةُ رَبَّتَهَا وَأَنْ تَرَى الْحُفَاةَ الْعُرَاةَ الْعَالَةَ رِعَاءَ الشَّاءِ يَتَطَاوَلُونَ فِي الْبُنْيَانِ ‏\"‏ ‏.‏ قَالَ ثُمَّ انْطَلَقَ فَلَبِثْتُ مَلِيًّا ثُمَّ قَالَ لِي ‏\"‏ يَا عُمَرُ أَتَدْرِي مَنِ السَّائِلُ ‏\"‏ ‏.‏ قُلْتُ اللَّهُ وَرَسُولُهُ أَعْلَمُ ‏.‏ قَالَ ‏\"‏ فَإِنَّهُ جِبْرِيلُ أَتَاكُمْ يُعَلِّمُكُمْ دِينَكُمْ ‏\"‏ ‏.",
  "grade": "সহিহ হাদিস",
  "footnote": "ইসলামিক ফাউন্ডেশনঃ বাংলাদেশ ১ম খণ্ড, ১, বাংলাদেশ ইসলামিক সেন্টার ১ম খণ্ড, ১\n\n[১৫] বাঁদী মনিবকে প্রসব করবে। এর অর্থ হলো মনিব তাঁর বাঁদীর সাথে যেরূপ ব্যবহার করে, সন্তানগণ তাদের মাতাদের সাথে সেরূপ ব্যবহার করবে, তারা মাতাঁর বাধ্য থাকবে না। সন্তান মাতাঁর অবাধ্য হবে, স্ত্রীর অনুগত হবে। আরো উল্লেখ করা যেতে পারে যে, শারী’আত মোতাবেক বিয়ে শাদী করবে না। বাদশাহ ও ধনী ব্যক্তিগণ দাসী ইচ্ছামত রাখবে। বাঁদী দাসী অধিক কেনাবেচা হবে। সে সময় দাসীকে বিয়ে করবে অথচ সেটা যে তাঁর মা জানতে পারবে না।\n\n[১৬] তুচ্ছ লোক বড় হয়ে যাবে, দুনিয়ার অবস্থা ব্যবস্থা বদলে যাবে। বড় ছোট হয়ে যাবে, সম্মানী ব্যক্তি অপমানিত হবে। অসম্মানী ব্যক্তি মানের দাবী করবে। যারা এ কাজের উপযুক্ত নয়, তারা সে কাজের মালিক মুখতাঁর হয়ে বসবে।"
  },
  {
  "book": "সহীহ মুসলিম",
  "book_short": "মুসলিম",
  "id": "5",
  "number": "৫",
  "chapter": "ঈমান",
  "narrator": "আবূ হুরাইরাহ্ (রাঃ)",
  "translation": "একদা রসূলুল্লাহ (ﷺ) লোকেদের নিয়ে বসেছিলেন। এমন সময় একজন লোক এসে তাঁকে জিজ্ঞেস করলো, হে আল্লাহর রসূল! ঈমান কি? তিনি বললেন, ঈমান এই যে, তুমি আল্লাহ, তাঁর ফেরেশতাকুল, তাঁর (নাযিলকৃত) কিতাব, (আখিরাত) তাঁর সাথে সাক্ষাৎ ও তাঁর রসূলগণের প্রতি ঈমান রাখবে এবং পুনরুত্থান দিবসের উপরও ঈমান আনবে। লোকটি আবার জিজ্ঞেস করলো, হে আল্লাহর রসূল! ইসলাম কি? তিনি বললেন, ইসলাম এই যে, তুমি আল্লাহর ইবাদত করতে থাকবে, কিন্তু তাঁর সাথে কাউকে শরীক করবে না, ফরজকৃত সালাত কায়িম করবে, নির্ধারিত ফরজ যাকাত আদায় করবে এবং রমজানের সাওম পালন করবে। সে আবার জিজ্ঞেস করলো, হে আল্লাহর রসূল! ইহসান কি? তিনি বললেন, তুমি এমনভাবে আল্লাহর ইবাদত করবে যেন তাঁকে দেখছো; যদি তাঁকে না দেখো তা হলে তিনি তোমাকে দেখছেন (বলে অনুভব করবে)।\n\nসে পুনরায় জিজ্ঞেস করলো, হে আল্লাহর রসূল! কেয়ামত কখন হবে? তিনি বললেন, এ ব্যাপারে যাকে প্রশ্ন করা হয়েছে তিনি প্রশ্নকারীর চেয়ে বেশি কিছু জানেন না। তবে আমি তোমাকে তার (কেয়ামতের) কিছু নিদর্শন বলে দিচ্ছিঃ যখন দাসী তাঁর মনিবকে প্রসব করবে এটা তার নিদর্শনসমূহের মধ্যে একটি। আর যখন বস্ত্রহীন, জুতাহীন (ব্যক্তি) জনগণের নেতা হবে, এটাও তার একটি নিদর্শন। আর মেষ শাবক ও ছাগলের রাখালরা যখন সুউচ্চ দালান-কোঠা নিয়ে পরস্পর গর্ব করবে, এটাও তার একটি নিদর্শন। প্রকৃতপক্ষে যে পাঁচটি জিনিসের জ্ঞান একমাত্র আল্লাহ রাখেন, কেয়ামতের জ্ঞান তারই অন্তর্ভুক্ত।\n\nঅতঃপর নবী (ﷺ) নিম্নবর্ণিত আয়াত তিলাওয়াত করলেন, “আল্লাহর নিকটই কেয়ামতের জ্ঞান রয়েছে, আর তিনিই বৃষ্টি বর্ষণ করেন এবং মাতৃগর্ভে কি আছে তা তিনিই জানেন। কোন প্রাণীই আগামীকাল কী উপার্জন করবে তা জানে না এবং কোন জমিনে সে মৃত্যুবরণ করবে তাও জানে না। বস্তুতঃ আল্লাহই সব জানেন এবং তিনি সব বিষয়ই অবগত”—(সূরা লুকমান ৩১ : ৩৪)। বর্ণনাকারী বলেন, এরপর লোকটি চলে গেল। রসূলুল্লাহ (ﷺ) বললেন, লোকটিকে আমার নিকট ফিরিয়ে আনো। তাঁরা তাকে ফিরিয়ে আনার জন্য গেলেন। কিন্তু কাউকে পেলেন না। তারপর রসূলুল্লাহ (ﷺ) বললেন, ইনি জিবরীল (আঃ), লোকেদের দ্বীন শিক্ষা দেয়ার জন্য এসেছিলেন।",
  "arabic": "وَحَدَّثَنَا أَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ، وَزُهَيْرُ بْنُ حَرْبٍ، جَمِيعًا عَنِ ابْنِ عُلَيَّةَ، قَالَ زُهَيْرٌ حَدَّثَنَا إِسْمَاعِيلُ بْنُ إِبْرَاهِيمَ، عَنْ أَبِي حَيَّانَ، عَنْ أَبِي زُرْعَةَ بْنِ عَمْرِو بْنِ جَرِيرٍ، عَنْ أَبِي هُرَيْرَةَ، قَالَ كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يَوْمًا بَارِزًا لِلنَّاسِ فَأَتَاهُ رَجُلٌ فَقَالَ يَا رَسُولَ اللَّهِ مَا الإِيمَانُ قَالَ ‏\"‏ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلاَئِكَتِهِ وَكِتَابِهِ وَلِقَائِهِ وَرُسُلِهِ وَتُؤْمِنَ بِالْبَعْثِ الآخِرِ ‏\"‏ ‏.‏ قَالَ يَا رَسُولَ اللَّهِ مَا الإِسْلاَمُ قَالَ ‏\"‏ الإِسْلاَمُ أَنْ تَعْبُدَ اللَّهَ وَلاَ تُشْرِكَ بِهِ شَيْئًا وَتُقِيمَ الصَّلاَةَ الْمَكْتُوبَةَ وَتُؤَدِّيَ الزَّكَاةَ الْمَفْرُوضَةَ وَتَصُومَ رَمَضَانَ ‏\"‏ ‏.‏ قَالَ يَا رَسُولَ اللَّهِ مَا الإِحْسَانُ قَالَ ‏\"‏ أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنَّكَ إِنْ لاَ تَرَاهُ فَإِنَّهُ يَرَاكَ ‏\"‏ ‏.‏ قَالَ يَا رَسُولَ اللَّهِ مَتَى السَّاعَةُ قَالَ ‏\"‏ مَا الْمَسْئُولُ عَنْهَا بِأَعْلَمَ مِنَ السَّائِلِ وَلَكِنْ سَأُحَدِّثُكَ عَنْ أَشْرَاطِهَا إِذَا وَلَدَتِ الأَمَةُ رَبَّهَا فَذَاكَ مِنْ أَشْرَاطِهَا وَإِذَا كَانَتِ الْعُرَاةُ الْحُفَاةُ رُءُوسَ النَّاسِ فَذَاكَ مِنْ أَشْرَاطِهَا وَإِذَا تَطَاوَلَ رِعَاءُ الْبَهْمِ فِي الْبُنْيَانِ فَذَاكَ مِنْ أَشْرَاطِهَا فِي خَمْسٍ لاَ يَعْلَمُهُنَّ إِلاَّ اللَّهُ ‏\"‏ ‏.‏ ثُمَّ تَلاَ صلى الله عليه وسلم ‏{‏ إِنَّ اللَّهَ عِنْدَهُ عِلْمُ السَّاعَةِ وَيُنَزِّلُ الْغَيْثَ وَيَعْلَمُ مَا فِي الأَرْحَامِ وَمَا تَدْرِي نَفْسٌ مَاذَا تَكْسِبُ غَدًا وَمَا تَدْرِي نَفْسٌ بِأَىِّ أَرْضٍ تَمُوتُ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ‏}‏ ‏\"‏ ‏.‏ قَالَ ثُمَّ أَدْبَرَ الرَّجُلُ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ رُدُّوا عَلَىَّ الرَّجُلَ ‏\"‏ ‏.‏ فَأَخَذُوا لِيَرُدُّوهُ فَلَمْ يَرَوْا شَيْئًا ‏.‏ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏\"‏ هَذَا جِبْرِيلُ جَاءَ لِيُعَلِّمَ",
  "grade": "সহিহ হাদিস",
  "footnote": "ইসলামী ফাউন্ডেশনঃ ৫,ইসলামীক সেন্টারঃ ৫"
  },
  {
  "book": "সহীহ মুসলিম",
  "book_short": "মুসলিম",
  "id": "422",
  "number": "৪২২",
  "chapter": "তাহারাত (পবিত্রতা)",
  "narrator": "আবূ মালিক আল আশ’আরী (রাঃ)",
  "translation": "রাসূলুল্লাহ (ﷺ) বলেছেন: পবিত্রতা হল ঈমানের অর্ধেক অংশ। ‘আলহামদুলিল্লাহ’ মীজানের পরিমাপকে পরিপূর্ণ করে দিবে এবং “সুবহানাল্লাহ ওয়াল হামদুলিল্লাহ” আসমান ও জমীনের মধ্যবর্তী স্থানকে পরিপূর্ণ করে দিবে। ‘সালাত’ হচ্ছে একটি উজ্জ্বল জ্যোতি। ‘সাদাকা’ হচ্ছে দলিল। ‘ধৈর্য’ হচ্ছে জ্যোতির্ময়। আর ‘আল কুরআন’ হবে তোমার পক্ষে অথবা বিপক্ষে প্রমাণস্বরূপ। বস্তুতঃ সকল মানুষই প্রত্যেক ভোরে নিজেকে আমলের বিনিময়ে বিক্রি করে। তার আমল দ্বারা সে নিজেকে (আল্লাহর আজাব থেকে) মুক্ত করে অথবা সে তার নিজের ধ্বংস সাধন করে।",
  "arabic": "حَدَّثَنَا إِسْحَاقُ بْنُ مَنْصُورٍ، حَدَّثَنَا حَبَّانُ بْنُ هِلاَلٍ، حَدَّثَنَا أَبَانٌ، حَدَّثَنَا يَحْيَى، أَنَّ زَيْدًا، حَدَّثَهُ أَنَّ أَبَا سَلاَّمٍ حَدَّثَهُ عَنْ أَبِي مَالِكٍ الأَشْعَرِيِّ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏ \"‏ الطُّهُورُ شَطْرُ الإِيمَانِ وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ ‏.‏ وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ - أَوْ تَمْلأُ - مَا بَيْنَ السَّمَوَاتِ وَالأَرْضِ وَالصَّلاَةُ نُورٌ وَالصَّدَقَةُ بُرْهَانٌ وَالصَّبْرُ ضِيَاءٌ وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا ‏\"‏ ‏.",
  "grade": "সহিহ হাদিস",
  "footnote": "ইসলামী ফাউন্ডেশনঃ ২য় খন্ড, ৪২৫, ইসলামীক সেন্টারঃ ৪৪১"
  },
  {
  "book": "সহীহ বুখারী",
  "book_short": "বুখারী",
  "id": "1",
  "number": "১",
  "chapter": "ওহীর সূচনা অধ্যায়",
  "narrator": "‘আলক্বামাহ ইব্‌নু ওয়াক্কাস আল-লায়সী (রহঃ)",
  "translation": "আমি উমর ইবনুল খাত্তাব (রাঃ)-কে মিম্বরের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রসূল (ﷺ)-কে বলতে শুনেছিঃ আমল (এর প্রাপ্য হবে) নিয়ত অনুযায়ী। আর মানুষ তার নিয়ত অনুযায়ী প্রতিফল পাবে।\n\nতাই যার হিজরত হবে দুনিয়া লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশ্যে- তবে তার হিজরত সে উদ্দেশ্যেই হবে, যে জন্যে, সে হিজরত করেছে।",
  "arabic": "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ، قَالَ حَدَّثَنَا سُفْيَانُ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ، قَالَ أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ، يَقُولُ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ ـ رضى الله عنه ـ عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏ \"‏ إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
  "grade": "সহিহ হাদিস",
  "footnote": "(৫৪, ২৫২৯, ৩৮৯৮, ৫০৭০, ৬৬৮৯, ৬৯৫৩; মুসলিম ২৩/৪৫ হাঃ ১৯০৭, আহমাদ ১৬৮) ( আধুনিক প্রকাশনী- ১, ইসলামিক ফাউন্ডেশন ১)"
  },
  {
  "book": "সহীহ বুখারী",
  "book_short": "বুখারী",
  "id": "6116",
  "number": "৬১১৬",
  "chapter": "আচার-ব্যবহার",
  "narrator": "আবূ হুরায়রা (রাঃ)",
  "translation": "এক ব্যক্তি নবী (ﷺ)-এর নিকট বলল: আপনি আমাকে ওসিয়ত করুন। তিনি বললেন: তুমি রাগ করো না। লোকটি কয়েকবার তা বললেন, নবী (ﷺ) প্রত্যেক বারেই বললেন: রাগ করো না।",
  "arabic": "حَدَّثَنِي يَحْيَى بْنُ يُوسُفَ، أَخْبَرَنَا أَبُو بَكْرٍ ـ هُوَ ابْنُ عَيَّاشٍ ـ عَنْ أَبِي حَصِينٍ، عَنْ أَبِي صَالِحٍ، عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ أَنَّ رَجُلاً، قَالَ لِلنَّبِيِّ صلى الله عليه وسلم أَوْصِنِي‏.‏ قَالَ ‏\"‏ لاَ تَغْضَبْ ‏\"‏‏.‏ فَرَدَّدَ مِرَارًا، قَالَ ‏\"‏ لاَ تَغْضَبْ ‏\"‏‏.‏",
  "grade": "সহিহ হাদিস",
  "footnote": "আধুনিক প্রকাশনী- ৫৬৭৬, ইসলামিক ফাউন্ডেশন- ৫৫৭৩"
  }
  ];
  // Hexagon badge = the book's abvr_code + color_code from the books table
  const BOOKS = { 'সহীহ মুসলিম': { abbr: 'M', color: '#2d91c2' }, 'সহীহ বুখারী': { abbr: 'B', color: '#70bb65' } };
  const H = {};
  DATA.forEach((d) => {
    const key = (d.book_short === 'মুসলিম' ? 'm' : 'b') + d.id;
    H[key] = { id: key, book: d.book, no: d.number, sec: d.chapter, grade: d.grade, nar: d.narrator,
      tr: d.translation, ar: d.arabic, fn: d.footnote, ...BOOKS[d.book] };
  });
  // The only invented content: the md's own example for হাদিসে জিবরিল (সহীহ মুসলিম ১).
  // In the app these would come verified with the book data. Every other hadith has none.
  const POINTS = ['ইসলাম কী', 'ঈমান কী', 'ইহসান কী'];
  H.m1.points = POINTS;
  const GRADE_DESC = "যে হাদীসের সানাদ অবিচ্ছিন্ন হয়, বর্ণনাকারীরা ন্যায়পরায়ণ ও পূর্ণ আয়ত্বশক্তির অধিকারী হন এবং সানাদটি শা'জ ও মু''আল্লাল না হয় সে হাদীসকে সহীহ বা সহীহ লিযাতিহী। গ্রহণযোগ্য হাদীসগুলোর মধ্যে সহীহ লিযাতিহী'র মর্যাদা সবচেয়ে বেশী ।";

  // m1 = long + verified points (box). m5 = long but nothing verified (no box). m422 = short.
  const LISTS = { list: ['m1', 'm5', 'm422'], offline: ['m1', 'm5', 'm422'], nobox: ['b1', 'b6116'] };
  const TITLES = { list: 'সহীহ মুসলিম', offline: 'সহীহ মুসলিম', nobox: 'সহীহ বুখারী' };

  /* ---------- State ---------- */
  const st = { cur: 'm1', from: 'list', offline: false, inDetails: false, collapsed: new Set() };
  let hooks = {};

  /* ---------- Small helpers ---------- */
  const ic = (k, w) => (w ? icons[k].replace('width="24" height="24"', `width="${w}" height="${w}"`) : icons[k]);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const paras = (s) => s.split(/\n{2,}/).map((p) => `<p class="translation">${esc(p)}</p>`).join('');
  const sample = '<span class="tag" title="এই লেখা অ্যাপে এখনো নেই">নমুনা</span>';
  // Small icon next to "মূল শিক্ষা"
  const bulb = (w = 16) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>`;

  /* ---------- Hadith card: head → [top] → Arabic → [mid] → narrator → translation → footnote ---------- */
  function head(h) {
    return `<div class="hadith-head">
      <span class="book-badge" style="background:${h.color}" aria-label="${h.book}">${h.abbr}</span>
      <div class="hadith-meta"><b>${h.book}</b><span>হাদিস: ${h.no}</span></div>
      <button class="grade" data-open="dlg-grade">${h.grade}</button>
      <button class="icon-btn" data-more="${h.id}" aria-label="হাদিস নং ${h.no}-এর অপশন">${icons.more}</button>
    </div>`;
  }
  function card(id, ctx) {
    const h = H[id];
    const s = (hooks.slots && hooks.slots(h, ctx)) || {};
    const parts = {
      head: head(h), top: s.top || '', mid: s.mid || '',
      arabic: `<p class="arabic" lang="ar">${h.ar}</p>`,
      local: `<p class="narrator">${h.nar} থেকে বর্ণিত:</p>${paras(h.tr)}${h.fn ? `<div class="fnote">ফুটনোট:\n${esc(h.fn)}</div>` : ''}`,
    };
    const inner = hooks.card ? hooks.card(h, parts, ctx) : parts.head + parts.top + parts.arabic + parts.mid + parts.local;
    return `<article class="card hcard" data-id="${id}">${inner}</article>`;
  }

  /* ---------- Lists ---------- */
  function renderList(screen) {
    const body = $(`#${screen}-body`);
    if (!body) return;
    let html = screen === 'offline'
      ? `<div class="offline">${icons.info}<div><b>ইন্টারনেট সংযোগ নেই</b>ইন্টারনেট না থাকলেও ডাউনলোড করা ম্যাটেরিয়াল দেখা যাবে।</div></div>` : '';
    let last = null;
    LISTS[screen].forEach((id) => {
      if (H[id].sec !== last) { html += `<div class="sec"><b>অধ্যায়:</b> ${H[id].sec}</div>`; last = H[id].sec; }
      html += card(id, 'list');
    });
    body.innerHTML = html;
  }

  /* ---------- Details page: chapter → hadith card → শিক্ষণীয় বিষয় (online only) ---------- */
  function teachings(h) {
    if (!h.points) return '';
    if (st.offline) {
      return `<div class="dcard" id="d-teach"><div class="unavail">ব্যাখ্যা ও সম্পর্কিত হাদিস আনা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।
        <button class="btn tonal" data-retry>আবার চেষ্টা করুন</button></div></div>`;
    }
    return `<div class="dcard" id="d-teach"><h3>শিক্ষণীয় বিষয় ${sample}</h3>${tlist(h.points)}</div>`;
  }
  const tlist = (pts) => `<ol class="tlist">${pts.map((p, i) => `<li><b>${bn(i + 1)}</b><span>${p}</span></li>`).join('')}</ol>`;
  function renderDetails() {
    const h = H[st.cur];
    $('#d-title').innerHTML = `${h.book}<small>হাদিস: ${h.no}</small>`;
    const parts = {
      sec: `<div class="sec" style="margin-top:0"><b>অধ্যায়:</b> ${h.sec}</div>`,
      top: (hooks.detailsTop && hooks.detailsTop(h)) || '',
      card: card(st.cur, 'details'),
      teach: teachings(h),
    };
    $('#d-body').innerHTML = hooks.details ? hooks.details(h, parts) : parts.sec + parts.top + parts.card + parts.teach;
    hooks.afterDetails && hooks.afterDetails(h);
  }
  function openDetails(id) { st.cur = id; renderDetails(); Kit.show('details'); }

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
    hooks.onToggle && hooks.onToggle(id, st.collapsed.has(id));
  }

  /* ---------- More-options sheet ---------- */
  const MI = {
    details: '<path class="a" d="M3 7.5a2 2 0 0 1 2-2h7a4 4 0 0 1 4 4V28a2.5 2.5 0 0 0-2.5-2.5H5a2 2 0 0 1-2-2z"/><path class="b" d="M30 7.5a2 2 0 0 0-2-2h-7a4 4 0 0 0-4 4V28a2.5 2.5 0 0 1 2.5-2.5H28a2 2 0 0 0 2-2z"/><rect class="w" x="6.5" y="11" width="6" height="2.2" rx="1.1"/><rect class="w" x="6.5" y="15.5" width="6" height="2.2" rx="1.1"/><rect class="w" x="20.5" y="17" width="6" height="2.2" rx="1.1"/>',
    collection: '<path class="a" d="M5 5.5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3V29l-9-5.5L5 29z"/><path class="b" d="M5 5.5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3V9H5z"/><circle class="b" cx="24.5" cy="23.5" r="7"/><path class="sw" d="M24.5 20v7M21 23.5h7"/>',
    note: '<rect class="a" x="3.5" y="4" width="21" height="25" rx="4"/><path class="b" d="M3.5 8a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4v2h-21z"/><rect class="w" x="7.5" y="15" width="12" height="2.4" rx="1.2"/><rect class="w" x="7.5" y="20" width="8" height="2.4" rx="1.2"/><path class="b" d="M27.3 11.8a2 2 0 0 1 2.9 2.9L20.4 24.5l-4.2 1.3 1.3-4.2z"/>',
    copyTr: '<rect class="b" x="10" y="3" width="19" height="22" rx="4"/><rect class="a" x="4" y="8" width="19" height="22" rx="4"/><rect class="w" x="8" y="14" width="11" height="2.4" rx="1.2"/><rect class="w" x="8" y="19" width="7" height="2.4" rx="1.2"/>',
    copyAr: '<rect class="b" x="10" y="3" width="19" height="22" rx="4"/><rect class="a" x="4" y="8" width="19" height="22" rx="4"/><path class="sw" d="M18 15c-1-1-3.5-.8-3.5 1 0 1.4 1.8 1.8 3.6 1.3-2.5.7-4.3 1.9-3.9 3.6"/>',
    copyFull: '<path class="a" d="M4 17c0-6 3.5-10 9-11v4c-2.5.8-4 2.6-4.3 5H13v10H4z"/><path class="b" d="M18 17c0-6 3.5-10 9-11v4c-2.5.8-4 2.6-4.3 5H27v10h-9z"/>',
    shot: '<path class="so" d="M3 10V7a4 4 0 0 1 4-4h3M23 3h3a4 4 0 0 1 4 4v3M30 23v3a4 4 0 0 1-4 4h-3M10 30H7a4 4 0 0 1-4-4v-3"/><rect class="a" x="8" y="9" width="17" height="15" rx="2.5"/><circle class="w" cx="13" cy="13.5" r="2"/>',
    share: '<path class="sb" d="M10 16.5 23 9M10 16.5 23 24"/><circle class="a" cx="8" cy="16.5" r="5"/><circle class="b" cx="24.5" cy="8" r="5"/><circle class="a" cx="24.5" cy="25" r="5"/>',
    report: '<circle class="a" cx="16.5" cy="16.5" r="13.5"/><rect class="w" x="15" y="8.5" width="3" height="10.5" rx="1.5"/><circle class="w" cx="16.5" cy="23.5" r="2.1"/>',
  };
  const ACTIONS = [['details', 'বিস্তারিত'], ['collection', 'বুকমার্ক / পিন'], ['note', 'নোট'], ['copyTr', 'অনুবাদ কপি'],
    ['copyAr', 'আরবি কপি'], ['copyFull', 'হাদিস কপি'], ['shot', 'স্ক্রিনশট'], ['share', 'টেক্সট শেয়ার'], ['report', 'রিপোর্ট']];
  function openMenu(id) {
    st.cur = id; st.inDetails = Kit.current === 'details';
    $('#m-ref').textContent = `${H[id].book} · হাদিস: ${H[id].no}`;
    $('#m-grid').innerHTML = ACTIONS.filter(([k]) => !(st.inDetails && k === 'details')).map(([k, t]) =>
      `<button class="mtile" data-act="${k}"><svg class="mi" width="34" height="34" viewBox="0 0 33 33" fill="none">${MI[k]}</svg>${t}</button>`).join('');
    Kit.open('sheet-more');
  }
  function act(k) {
    Kit.close('sheet-more');
    if (k === 'details') return openDetails(st.cur);
    Kit.snack({ collection: 'বুকমার্ক / পিন শিট খুলবে — এই ফিচারের অংশ নয়', note: 'নোট লেখার শিট খুলবে — এই ফিচারের অংশ নয়', copyTr: 'কপি হয়েছে', copyAr: 'কপি হয়েছে', copyFull: 'কপি হয়েছে',
      shot: 'স্ক্রিনশট শেয়ার শিট খুলবে — এই ফিচারের অংশ নয়', share: 'শেয়ার শিট খুলবে — এই ফিচারের অংশ নয়', report: 'রিপোর্ট শিট খুলবে — এই ফিচারের অংশ নয়' }[k]);
  }

  /* ---------- Loading: the app's LoadingIndicator (InkDropLoading, 33px) ---------- */
  const loader = (inline) => `<div class="loading${inline ? ' inline' : ''}" role="status" aria-label="লোড হচ্ছে"><canvas class="inkdrop"></canvas></div>`;
  (function inkDrop() {
    const S = 33, PAD = 6, W = S + PAD * 2, HT = S * 2 + PAD * 2, PI = Math.PI;
    const iv = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const lerp = (a, b, k) => a + (b - a) * k;
    function frame(now) {
      document.querySelectorAll('canvas.inkdrop').forEach((c) => {
        if (!c.offsetParent) return;
        const dpr = window.devicePixelRatio || 1;
        if (c.width !== W * dpr) { c.width = W * dpr; c.height = HT * dpr; c.style.width = W + 'px'; c.style.height = HT + 'px'; }
        const g = c.getContext('2d'), cs = getComputedStyle(c);
        const color = cs.getPropertyValue('--primary-dark').trim(), ring = cs.getPropertyValue('--divider').trim();
        g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, HT);
        g.lineWidth = S / 5; g.lineCap = 'round';
        const cx = W / 2, cy = PAD + S * 1.5, r = S / 2;
        const arc = (start, sweep, col, dy = 0) => { g.strokeStyle = col; g.beginPath(); g.arc(cx, cy + dy, r, start, start + sweep, sweep < 0); g.stroke(); };
        const t = (now % 1400) / 1400;
        arc(PI / 2, 2 * PI, ring);
        if (t <= 0.9) {
          const dy = lerp(-S, 0, Math.pow(iv(t, 0.05, 0.4), 3)), k = iv(t, 0.38, 0.9);
          arc(-3 * PI / 2, lerp(PI / (S * S), PI / 1.13, k), color, dy);
          arc(-3 * PI / 2, lerp(PI / (S * S), -PI / 1.13, k), color, dy);
        } else {
          const k1 = iv(t, 0.9, 0.96), k2 = iv(t, 0.9, 1);
          arc(-PI / 4, lerp(-PI / 7.4, -PI / 4, k1), color);
          arc(-3 * PI / 4, lerp(PI / 7.4, PI / 4, k1), color);
          arc(-PI / 3.5, lerp(PI / 1.273, PI / 28, k2), color);
          arc(PI / 0.778, lerp(-PI / 1.273, -PI / 27, k2), color);
        }
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- Shell markup: screens, sheet, drawer, dialog ---------- */
  const bar = (title, back) => `<header class="appbar"><button class="icon-btn" aria-label="পেছনে" ${back}>${icons.back}</button><h1>${title}</h1>
    <button class="icon-btn" aria-label="সার্চ" data-snack="সার্চ খুলবে — এই ফিচারের অংশ নয়">${icons.search}</button>
    <button class="icon-btn" aria-label="সেটিংস" data-open="drawer-settings">${icons.filter}</button></header>`;
  function shell() {
    const vp = $('.phone .viewport');
    vp.insertAdjacentHTML('afterbegin', `
      <section class="screen" data-screen="list">${bar(TITLES.list, 'data-snack="বইয়ের অধ্যায় তালিকায় ফিরে যাবে"')}<div class="scroll" id="list-body"></div></section>
      <section class="screen" data-screen="details"><header class="appbar"><button class="icon-btn" aria-label="পেছনে" id="d-back">${icons.back}</button><h1 id="d-title"></h1>
        <button class="icon-btn" aria-label="সেটিংস" data-open="drawer-settings">${icons.filter}</button></header><div class="rbody"><div class="scroll" id="d-body"></div></div></section>
      <section class="screen" data-screen="nobox">${bar(TITLES.nobox, 'data-go="list"')}<div class="scroll" id="nobox-body"></div></section>
      <section class="screen" data-screen="loading">${bar(TITLES.list, 'data-go="list"')}<div class="scroll">${loader()}</div></section>
      <section class="screen" data-screen="offline">${bar(TITLES.offline, 'data-go="list"')}<div class="scroll" id="offline-body"></div></section>`);
    vp.insertAdjacentHTML('beforeend', `
      <div class="sheet" id="sheet-more" role="dialog" aria-label="অন্যান্য অপশন">
        <div class="mhead"><div><h2>অন্যান্য অপশন</h2><p id="m-ref"></p></div><button class="xbtn" data-close aria-label="বন্ধ করুন">${icons.close}</button></div>
        <div class="mgrid" id="m-grid"></div></div>
      <div class="sheet drawer" id="drawer-settings" role="dialog" aria-label="সেটিংস">
        <div class="sheet-head"><h2>সেটিংস</h2><button class="icon-btn" data-close aria-label="বন্ধ করুন">${icons.close}</button></div>
        <div class="scard"><div class="srow"><span>আরবি দেখান</span><button class="switch" role="switch" aria-checked="true" id="s-ar" aria-label="আরবি দেখান"></button></div></div>
        <div class="scard"><div class="srow"><span>অনুবাদ ফন্ট সাইজ</span><output id="s-fs-v">১৬</output></div>
          <input class="srange" type="range" id="s-fs" min="12" max="26" value="16" aria-label="অনুবাদ ফন্ট সাইজ">
          <div class="srow"><span>আরবি ফন্ট সাইজ</span><output id="s-ar-v">২২</output></div>
          <input class="srange" type="range" id="s-arfs" min="16" max="34" value="22" aria-label="আরবি ফন্ট সাইজ"></div></div>
      <div class="dialog" id="dlg-grade" role="dialog" aria-label="হাদিসের মান"><h2>সহিহ হাদিস</h2><p>${GRADE_DESC}</p>
        <div class="actions"><button class="btn" data-close>ঠিক আছে</button></div></div>`);
  }

  function refresh() { ['list', 'offline', 'nobox'].forEach(renderList); if (Kit.current === 'details') renderDetails(); applyCollapse(); hooks.afterRender && hooks.afterRender(); }

  /* ---------- Wiring ---------- */
  function wire() {
    const phone = $('.phone');
    $('#s-ar').addEventListener('click', (e) => {
      const on = e.currentTarget.getAttribute('aria-checked') !== 'true';
      e.currentTarget.setAttribute('aria-checked', String(on)); phone.classList.toggle('no-ar', !on);
    });
    $('#s-fs').addEventListener('input', (e) => { phone.style.setProperty('--fs', e.target.value + 'px'); $('#s-fs-v').textContent = bn(e.target.value); });
    $('#s-arfs').addEventListener('input', (e) => { phone.style.setProperty('--ar', e.target.value + 'px'); $('#s-ar-v').textContent = bn(e.target.value); });

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-more],[data-act],[data-toggle],[data-details],[data-retry],#d-back');
      if (!t) return;
      if (t.dataset.more) openMenu(t.dataset.more);
      else if (t.dataset.act) act(t.dataset.act);
      else if (t.dataset.toggle) toggle(t.dataset.toggle);
      else if (t.dataset.details) openDetails(t.dataset.details);
      else if (t.dataset.retry !== undefined) {
        const box = $('#d-teach'); box.innerHTML = loader(true);
        setTimeout(() => { if (Kit.current === 'details') renderDetails(); applyCollapse(); }, 900);
      } else if (t.id === 'd-back') Kit.show(st.from);
    });
    Kit.onScreen((id) => {
      if (LISTS[id]) { st.from = id; st.offline = id === 'offline'; }
      if (id === 'details') { if (!LISTS[st.from].includes(st.cur)) st.cur = LISTS[st.from][0]; renderDetails(); applyCollapse(); }
    });
  }

  /* ---------- Init: kit shell + toolbar chips that set a state instead of a screen ---------- */
  function init(o) {
    hooks = o.hooks || {};
    if (o.phoneClass) $('.phone').classList.add(o.phoneClass);
    shell();
    const VIRTUAL = Object.assign({
      collapsed: () => { Kit.show('list'); st.collapsed.add('m1'); applyCollapse(); },
      menu: () => { Kit.show('list'); openMenu('m1'); },
      settings: () => { Kit.show('list'); Kit.open('drawer-settings'); },
      details: () => { st.from = 'list'; st.offline = false; st.cur = 'm1'; renderDetails(); applyCollapse(); },
    }, o.virtual || {});
    const press = (id) => $$('.kit-chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.go === id)));
    // Each chip shows its own state, so every chip but "গোটানো" starts with the box open
    const run = (id) => {
      if (!id || !$(`.kit-chip[data-go="${id}"]`)) return;
      if (id !== 'collapsed') { st.collapsed.clear(); applyCollapse(); }
      if (VIRTUAL[id]) { VIRTUAL[id](); press(id); }
    };
    wire();
    refresh();
    Kit.init({ demo: o.demo, name: o.name, screens: o.screens });
    document.addEventListener('click', (e) => { const c = e.target.closest('.kit-chip'); if (c) run(c.dataset.go); });
    window.addEventListener('message', (e) => { const m = e.data || {}; if (m.type === 'screen') run(m.id); });
    run(new URLSearchParams(location.search).get('screen'));
    if (!Kit.current) Kit.show('list');
  }

  return { init, H, POINTS, st, bn, bulb, sample, tlist, ic, refresh, applyCollapse, renderDetails, openDetails, loader };
})();
