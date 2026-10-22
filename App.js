import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  BookOpen, Award, Sparkles, CheckCircle2, XCircle, Clock,
  ArrowRight, ArrowLeft, RotateCcw, Volume2, VolumeX, Lock,
  Globe, GraduationCap, Phone, Search, Zap, Layers, AlertTriangle, X
} from 'lucide-react';

/**
 * ==============================================================================
 * El-Baseet (البسيط) | English Tenses for Sudanese Students 🇸🇩
 * ==============================================================================
 * Author / Credit: إعداد: أ. قريب الله عمر
 * Contact: +966508386758
 * 100% Free Educational Application
 * ==============================================================================
 */

// --- Speech Synthesis Service ---
class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.isSpeaking = false;
  }
  speak(text, onEnd) {
    if (!this.synth) { if (onEnd) onEnd(); return; }
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[❌✔️]/g, '').trim());
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => { this.isSpeaking = false; if (onEnd) onEnd(); };
      utterance.onerror = () => { this.isSpeaking = false; if (onEnd) onEnd(); };
      this.isSpeaking = true;
      this.synth.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }
  stop() {
    if (this.synth) { this.synth.cancel(); this.isSpeaking = false; }
  }
}
const speech = new SpeechService();

// --- Curriculum Phases ---
const PHASES = [
  {
    id: 'phase1',
    level: 'Basic',
    titleEn: 'Phase 1: Basic Foundation',
    titleAr: 'المرحلة الأولى: الأساسيات الضرورية',
    descEn: 'Everyday routines, current actions, and simple past & future.',
    descAr: 'العادات اليومية، الأحداث الحالية، والماضي والمستقبل البسيط.',
    tenseIds: ['present-simple', 'present-continuous', 'past-simple', 'future-simple']
  },
  {
    id: 'phase2',
    level: 'Intermediate',
    titleEn: 'Phase 2: Intermediate Mastery',
    titleAr: 'المرحلة الثانية: المستوى المتوسط',
    descEn: 'Connecting past experiences to now, ongoing past events, and continuous futures.',
    descAr: 'ربط تجارب الماضي بالحاضر، أحداث الماضي المستمرة، والمستقبل المستمر.',
    tenseIds: ['present-perfect', 'past-continuous', 'future-continuous', 'present-perfect-continuous']
  },
  {
    id: 'phase3',
    level: 'Advanced',
    titleEn: 'Phase 3: Advanced Fluency',
    titleAr: 'المرحلة الثالثة: الإتقان المتقدم',
    descEn: 'Complex timeline relations, completed past milestones, and future deadlines.',
    descAr: 'أحداث وقعت قبل أحداث ماضية أخرى، والإنجازات المكتملة في وقت مستقبلي.',
    tenseIds: ['past-perfect', 'past-perfect-continuous', 'future-perfect', 'future-perfect-continuous']
  }
];

// --- 12 Tenses Data (With Sudanese Context & Worksheets) ---
const TENSES = [
  // 1. Present Simple
  {
    id: 'present-simple',
    phaseId: 'phase1',
    titleEn: 'Present Simple',
    titleAr: 'المضارع البسيط',
    rulePos: 'Subject + Verb (s/es with he/she/it)',
    ruleNeg: 'Subject + do not / does not + Base Verb',
    ruleQues: 'Do / Does + Subject + Base Verb?',
    exampleEn: 'Ahmed drinks tea with mint every afternoon in Khartoum.',
    exampleAr: 'أحمد يشرب الشاي بالنعناع كل عصر في الخرطوم.',
    usageEn: 'Used for daily routines, permanent truths, and scientific facts.',
    usageAr: 'يُستخدم للعادات المتكررة، الروتين اليومي، والحقائق الثابتة.',
    signalWords: 'always, usually, often, every day, sometimes, never',
    mistakeWrong: 'He student in Khartoum University. ❌',
    mistakeRight: 'He is a student at Khartoum University. ✔️',
    mistakeWhyAr: 'في الإنجليزية لا توجد جملة اسمية بدون فعل! لا تنسَ (am / is / are).',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'Fatima _____ fresh falafel every morning from the local market.',
        questionAr: 'فاطمة _____ طعمية طازجة كل صباح من السوق المحلي.',
        options: ['buy', 'buys', 'buying', 'is buy'],
        answer: 'buys',
        explainAr: 'مع الفاعل المفرد (Fatima = She) نضيف s للفعل في المضارع البسيط.'
      },
      {
        type: 'fill',
        questionEn: 'The Blue and White Nile _____ (meet) at Al-Mogran in Khartoum.',
        questionAr: 'النيل الأزرق والأبيض _____ (يلتقيان) عند المقرن في الخرطوم.',
        answer: 'meet',
        explainAr: 'الفاعل جمع (The Blue and White Nile = They) لذا نضع الفعل بصيغة المصدر meet بدون s.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange into a correct sentence:',
        questionAr: 'رتب الكلمات لتكوين جملة صحيحة:',
        words: ['Omer', 'studies', 'English', 'every', 'evening'],
        answer: 'Omer studies English every evening',
        explainAr: 'الترتيب الصحيح: فاعل (Omer) + فعل (studies) + مفعول (English) + دلالة زمنية (every evening).'
      }
    ]
  },
  // 2. Present Continuous
  {
    id: 'present-continuous',
    phaseId: 'phase1',
    titleEn: 'Present Continuous',
    titleAr: 'المضارع المستمر',
    rulePos: 'Subject + am/is/are + Verb-ing',
    ruleNeg: 'Subject + am/is/are not + Verb-ing',
    ruleQues: 'Am/Is/Are + Subject + Verb-ing?',
    exampleEn: 'The farmers in Gezira are harvesting cotton right now.',
    exampleAr: 'المزارعون في مشروع الجزيرة يحصدون القطن الآن.',
    usageEn: 'Actions happening right now at the moment of speaking.',
    usageAr: 'أفعال تحدث الآن في هذه اللحظة، أو أحداث مؤقتة مستمرة حالياً.',
    signalWords: 'now, right now, at the moment, currently, Listen!, Look!',
    mistakeWrong: 'I listening to the teacher now. ❌',
    mistakeRight: 'I am listening to the teacher now. ✔️',
    mistakeWhyAr: 'لا يمكن استخدام verb-ing مباشرة بدون فعل مساعد (am / is / are).',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'Look! The students _____ across the Nile bridge.',
        questionAr: 'انظر! الطلاب _____ فوق كوبري النيل.',
        options: ['is walking', 'are walking', 'walks', 'walked'],
        answer: 'are walking',
        explainAr: 'الطلاب (The students) جمع، لذا نستخدم are + walking.'
      },
      {
        type: 'fill',
        questionEn: 'Listen! Mother _____ (make) traditional Sudanese Jebena coffee right now.',
        questionAr: 'اسمع! أمي _____ (تصنع) قهوة الجبنة السودانية الآن.',
        answer: 'is making',
        explainAr: 'Mother مفرد، والموقف يحدث الآن: is making.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the sentence:',
        questionAr: 'رتب الكلمات:',
        words: ['We', 'are', 'drinking', 'Karkadeh', 'now'],
        answer: 'We are drinking Karkadeh now',
        explainAr: 'الترتيب: فاعل (We) + فعل مساعد (are) + فعل مستمر (drinking) + مفعول (Karkadeh) + ظرف (now).'
      }
    ]
  },
  // 3. Past Simple
  {
    id: 'past-simple',
    phaseId: 'phase1',
    titleEn: 'Past Simple',
    titleAr: 'الماضي البسيط',
    rulePos: 'Subject + Verb 2 (regular -ed / irregular)',
    ruleNeg: 'Subject + did not + Base Verb',
    ruleQues: 'Did + Subject + Base Verb?',
    exampleEn: 'My uncle traveled to Port Sudan last week.',
    exampleAr: 'سافر عمي إلى بورتسودان الأسبوع الماضي.',
    usageEn: 'Completed actions at a specific time in the past.',
    usageAr: 'أفعال انتهت تماماً في وقت محدد في الماضي.',
    signalWords: 'yesterday, last night/week/year, ago, in 2020',
    mistakeWrong: 'He did not went to Omdurman yesterday. ❌',
    mistakeRight: 'He did not go to Omdurman yesterday. ✔️',
    mistakeWhyAr: 'بعد did not يعود الفعل دائماً إلى أصله ومصدره (Base Form) بدون تصريف!',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'Tariq _____ a delicious plate of ful for breakfast yesterday.',
        questionAr: 'طارق _____ صحن فول لذيذ في إفطار الأمس.',
        options: ['eats', 'ate', 'is eating', 'eaten'],
        answer: 'ate',
        explainAr: 'الأمس (yesterday) ماضي، والتصريف الثاني للفعل eat هو ate.'
      },
      {
        type: 'fill',
        questionEn: 'We did not _____ (visit) the National Museum last Friday.',
        questionAr: 'لم _____ (نزور) المتحف القومي الجمعة الماضية.',
        answer: 'visit',
        explainAr: 'بعد did not نضع الفعل في المصدر المجرد (visit).'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the past sentence:',
        questionAr: 'رتب الجملة في الماضي:',
        words: ['They', 'visited', 'Kassala', 'last', 'winter'],
        answer: 'They visited Kassala last winter',
        explainAr: 'فاعل (They) + ماضي (visited) + مكان (Kassala) + زمن (last winter).'
      }
    ]
  },
  // 4. Future Simple
  {
    id: 'future-simple',
    phaseId: 'phase1',
    titleEn: 'Future Simple',
    titleAr: 'المستقبل البسيط',
    rulePos: 'Subject + will + Base Verb',
    ruleNeg: 'Subject + will not (won\'t) + Base Verb',
    ruleQues: 'Will + Subject + Base Verb?',
    exampleEn: 'InshaAllah, our team will win the football match tomorrow.',
    exampleAr: 'إن شاء الله، سيفوز فريقنا بمباراة كرة القدم غداً.',
    usageEn: 'Predictions, instant promises, offers, and future plans.',
    usageAr: 'التوقعات، الوعود، القرارات الفورية، وأحداث مستقبلية عامة.',
    signalWords: 'tomorrow, next week/month, soon, in the future, maybe',
    mistakeWrong: 'I will going to Atbara tomorrow. ❌',
    mistakeRight: 'I will go to Atbara tomorrow. ✔️',
    mistakeWhyAr: 'بعد will يأتي الفعل في المصدر المجرد تماماً بدون ing أو s.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'The train to Wad Madani _____ arrive at 4:00 PM.',
        questionAr: 'قطار ود مدني _____ في الرابعة عصراً.',
        options: ['will', 'is', 'did', 'was'],
        answer: 'will',
        explainAr: 'للتعبير عن المستقبل البسيط نستخدم will + Base Verb.'
      },
      {
        type: 'fill',
        questionEn: 'I _____ (call) you when the bus reaches Shendi.',
        questionAr: 'سوف _____ (أتصل) بك عندما يصل الباص شندي.',
        answer: 'will call',
        explainAr: 'قرار أو وعد مستقبلي: will + call.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the future sentence:',
        questionAr: 'رتب الجملة:',
        words: ['We', 'will', 'pass', 'the', 'exams'],
        answer: 'We will pass the exams',
        explainAr: 'الترتيب: فاعل (We) + will + فعل (pass) + مفعول (the exams).'
      }
    ]
  },
  // 5. Present Perfect
  {
    id: 'present-perfect',
    phaseId: 'phase2',
    titleEn: 'Present Perfect',
    titleAr: 'المضارع التام',
    rulePos: 'Subject + have / has + Past Participle (V3)',
    ruleNeg: 'Subject + have not / has not + V3',
    ruleQues: 'Have / Has + Subject + V3?',
    exampleEn: 'Muna has lived in Omdurman for ten years.',
    exampleAr: 'منى تعيش في أم درمان منذ عشر سنوات (وما زالت).',
    usageEn: 'Past experiences with relevance now, or actions from the past continuing until now.',
    usageAr: 'تجارب سابقة لها أثر في الحاضر، أو أحداث بدأت في الماضي ومستمرة حتى الآن.',
    signalWords: 'already, yet, just, ever, never, since, for, recently',
    mistakeWrong: 'I have see the Pyramids of Meroë. ❌',
    mistakeRight: 'I have seen the Pyramids of Meroë. ✔️',
    mistakeWhyAr: 'مع have/has نستخدم التصريف الثالث (Past Participle - seen) وليس المصدر.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'Salih has _____ finished his high school exams.',
        questionAr: 'صالح قد أنهى امتحانات الشهادة الثانوية _____ (للتو).',
        options: ['just', 'yesterday', 'ago', 'last'],
        answer: 'just',
        explainAr: 'just تأتي بين has والتصريف الثالث لتدل على حدث انتهى للتو.'
      },
      {
        type: 'fill',
        questionEn: 'We have _____ (live) in Gedaref since 2015.',
        questionAr: 'نحن نعيش في القضارف منذ 2015.',
        answer: 'lived',
        explainAr: 'بعد have نضع التصريف الثالث للفعل: lived.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the sentence:',
        questionAr: 'رتب الكلمات:',
        words: ['She', 'has', 'already', 'cooked', 'lunch'],
        answer: 'She has already cooked lunch',
        explainAr: 'فاعل (She) + has + already + تصريف ثالث (cooked) + مفعول (lunch).'
      }
    ]
  },
  // 6. Past Continuous
  {
    id: 'past-continuous',
    phaseId: 'phase2',
    titleEn: 'Past Continuous',
    titleAr: 'الماضي المستمر',
    rulePos: 'Subject + was / were + Verb-ing',
    ruleNeg: 'Subject + was not / were not + Verb-ing',
    ruleQues: 'Was / Were + Subject + Verb-ing?',
    exampleEn: 'I was drinking tea when the rain started falling over Khartoum.',
    exampleAr: 'كنت أشرب الشاي عندما بدأ المطر يهطل على الخرطوم.',
    usageEn: 'Actions that were continuing in the past when another action interrupted them.',
    usageAr: 'حدث كان مستمراً في الماضي عند لحظة معينة أو قاطعه حدث ماضٍ آخر.',
    signalWords: 'while, as, when, at 8 PM yesterday, all morning',
    mistakeWrong: 'We was walking near the Nile yesterday. ❌',
    mistakeRight: 'We were walking near the Nile yesterday. ✔️',
    mistakeWhyAr: 'مع الضمائر الجمع (We, They, You) نستخدم were وليس was.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'While Osman was driving, he _____ a phone call.',
        questionAr: 'بينما كان عثمان يقود سيارته، _____ مكالمة هاتفية.',
        options: ['received', 'was receiving', 'is receiving', 'receives'],
        answer: 'received',
        explainAr: 'الحدث القاطع المفاجئ يأتي في الماضي البسيط (received).'
      },
      {
        type: 'fill',
        questionEn: 'At 9 PM last night, Ali _____ (study) for his biology test.',
        questionAr: 'في التاسعة مساء البارحة، كان علي _____ (يدرس) للاختبار.',
        answer: 'was studying',
        explainAr: 'حدث مستمر في وقت محدد في الماضي: was studying.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the past continuous sentence:',
        questionAr: 'رتب الجملة:',
        words: ['They', 'were', 'playing', 'football', 'yesterday'],
        answer: 'They were playing football yesterday',
        explainAr: 'فاعل (They) + were + فعل مستمر (playing) + مفعول (football) + زمن (yesterday).'
      }
    ]
  },
  // 7. Future Continuous
  {
    id: 'future-continuous',
    phaseId: 'phase2',
    titleEn: 'Future Continuous',
    titleAr: 'المستقبل المستمر',
    rulePos: 'Subject + will be + Verb-ing',
    ruleNeg: 'Subject + will not be + Verb-ing',
    ruleQues: 'Will + Subject + be + Verb-ing?',
    exampleEn: 'This time tomorrow, we will be flying to Port Sudan.',
    exampleAr: 'في مثل هذا الوقت غداً، سنكون على متن الطائرة مسافرين إلى بورتسودان.',
    usageEn: 'Actions that will be actively ongoing at a specific time in the future.',
    usageAr: 'حدث سيكون في حالة استمرار في نقطة زمنية محددة في المستقبل.',
    signalWords: 'this time tomorrow, at 10 AM tomorrow, this evening',
    mistakeWrong: 'Tomorrow at 5 PM, I will study. (Lacks ongoing aspect) ⚠️',
    mistakeRight: 'Tomorrow at 5 PM, I will be studying. ✔️',
    mistakeWhyAr: 'عند تحديد ساعة معينة في المستقبل يكون الحدث في قمة استمراره: will be studying.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'At 10:00 AM tomorrow, Dr. El-Hadi _____ surgery at the hospital.',
        questionAr: 'غداً عند العاشرة صباحاً، سيكون الدكتور الهادي _____ العملية الجراحية.',
        options: ['will be performing', 'performs', 'performed', 'was performing'],
        answer: 'will be performing',
        explainAr: 'حدث مستمر في وقت محدد مستقبلاً: will be + Verb-ing.'
      },
      {
        type: 'fill',
        questionEn: 'Do not call me at 2 PM; I will be _____ (sleep) after lunch.',
        questionAr: 'لا تتصل بي في الثانية ظهراً؛ سأكون نائماً بعد الغداء.',
        answer: 'sleeping',
        explainAr: 'بعد will be نضع الفعل مضافاً إليه ing: sleeping.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the sentence:',
        questionAr: 'رتب الجملة:',
        words: ['She', 'will', 'be', 'traveling', 'tomorrow'],
        answer: 'She will be traveling tomorrow',
        explainAr: 'فاعل (She) + will be + verb-ing (traveling) + زمن (tomorrow).'
      }
    ]
  },
  // 8. Present Perfect Continuous
  {
    id: 'present-perfect-continuous',
    phaseId: 'phase2',
    titleEn: 'Present Perfect Continuous',
    titleAr: 'المضارع التام المستمر',
    rulePos: 'Subject + have / has been + Verb-ing',
    ruleNeg: 'Subject + have / has not been + Verb-ing',
    ruleQues: 'Have / Has + Subject + been + Verb-ing?',
    exampleEn: 'Uncle Babiker has been farming this land for thirty years.',
    exampleAr: 'عمنا بابكر ظل يزرع هذه الأرض طوال ثلاثين عاماً (وما زال يزرعها).',
    usageEn: 'Emphasizing the duration of an ongoing action that started in the past.',
    usageAr: 'التركيز على المدة الزمنية واستمرار الفعل منذ الماضي وحتى الحاضر.',
    signalWords: 'for, since, all day, lately, how long',
    mistakeWrong: 'He is studying since 3 hours. ❌',
    mistakeRight: 'He has been studying for 3 hours. ✔️',
    mistakeWhyAr: 'مع المدد الزمنية (since/for) للحديث عن الاستمرار نستخدم has been studying وليس is studying.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'How long _____ you been learning English?',
        questionAr: 'كم من الوقت وأنت تتعلم اللغة الإنجليزية؟',
        options: ['have', 'has', 'are', 'did'],
        answer: 'have',
        explainAr: 'مع الضمير you نستخدم have وليس has.'
      },
      {
        type: 'fill',
        questionEn: 'The students have been _____ (prepare) for the exams all month.',
        questionAr: 'الطلاب يستعدون للامتحانات طوال الشهر.',
        answer: 'preparing',
        explainAr: 'بعد have been نضع الفعل مع ing: preparing.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the sentence:',
        questionAr: 'رتب الجملة:',
        words: ['I', 'have', 'been', 'waiting', 'here'],
        answer: 'I have been waiting here',
        explainAr: 'فاعل (I) + have been + فعل مستمر (waiting) + ظرف (here).'
      }
    ]
  },
  // 9. Past Perfect
  {
    id: 'past-perfect',
    phaseId: 'phase3',
    titleEn: 'Past Perfect',
    titleAr: 'الماضي التام',
    rulePos: 'Subject + had + Past Participle (V3)',
    ruleNeg: 'Subject + had not + V3',
    ruleQues: 'Had + Subject + V3?',
    exampleEn: 'When we reached the bus station, the bus had already left.',
    exampleAr: 'عندما وصلنا محطة الحافلات، كان الباص قد غادر بالفعل (الحدث الأسبق).',
    usageEn: 'The older past: An action that finished BEFORE another past event.',
    usageAr: 'الحدث الأسبق في الماضي (حدث وقع وانتهى قبل حدث ماضٍ آخر).',
    signalWords: 'before, after, by the time, already, as soon as',
    mistakeWrong: 'After I ate dinner, I slept. (Needs past perfect for clarity) ⚠️',
    mistakeRight: 'After I had eaten dinner, I went to sleep. ✔️',
    mistakeWhyAr: 'الحدث الذي وقع أولاً في الماضي يأخذ had + Past Participle.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'By the time the electricity came back, the family _____ fallen asleep.',
        questionAr: 'بحلول الوقت الذي عادت فيه الكهرباء، كانت الأسرة قد استغرقت في النوم.',
        options: ['had', 'has', 'have', 'was'],
        answer: 'had',
        explainAr: 'الحدث الأسبق في الماضي يأخذ had + V3.'
      },
      {
        type: 'fill',
        questionEn: 'Before he traveled to Dongola, he had _____ (sell) his old car.',
        questionAr: 'قبل أن يسافر إلى دنقلا، كان قد باع سيارته القديمة.',
        answer: 'sold',
        explainAr: 'التصريف الثالث للفعل sell هو sold.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the past perfect sentence:',
        questionAr: 'رتب الجملة:',
        words: ['The', 'train', 'had', 'already', 'left'],
        answer: 'The train had already left',
        explainAr: 'فاعل (The train) + had + already + تصريف ثالث (left).'
      }
    ]
  },
  // 10. Past Perfect Continuous
  {
    id: 'past-perfect-continuous',
    phaseId: 'phase3',
    titleEn: 'Past Perfect Continuous',
    titleAr: 'الماضي التام المستمر',
    rulePos: 'Subject + had been + Verb-ing',
    ruleNeg: 'Subject + had not been + Verb-ing',
    ruleQues: 'Had + Subject + been + Verb-ing?',
    exampleEn: 'I had been reviewing English for two hours before the power cut.',
    exampleAr: 'كنت أراجع الإنجليزية لمدة ساعتين متواصلتين قبل انقطاع الكهرباء.',
    usageEn: 'An action that had been ongoing for a duration before another past event.',
    usageAr: 'حدث استمر لفترة زمنية في الماضي حتى نقطة ماضية أخرى.',
    signalWords: 'had been ... for / since / before',
    mistakeWrong: 'He had been study English. ❌',
    mistakeRight: 'He had been studying English. ✔️',
    mistakeWhyAr: 'مع had been نضيف دائماً ing للفعل للدلالة على الاستمرارية.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'They had been _____ for over an hour before the bus finally arrived.',
        questionAr: 'كانوا ينتظرون لأكثر من ساعة قبل وصول الباص أخيراً.',
        options: ['waiting', 'waited', 'wait', 'waits'],
        answer: 'waiting',
        explainAr: 'في صيغة الماضي التام المستمر: had been + waiting.'
      },
      {
        type: 'fill',
        questionEn: 'Osman had been _____ (work) in the factory for five years before he moved.',
        questionAr: 'كان عثمان يعمل في المصنع لمدة خمس سنوات قبل أن ينتقل.',
        answer: 'working',
        explainAr: 'بعد had been يأتي الفعل بصيغة ing: working.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the sentence:',
        questionAr: 'رتب الجملة:',
        words: ['We', 'had', 'been', 'walking', 'hours'],
        answer: 'We had been walking hours',
        explainAr: 'فاعل (We) + had been + verb-ing (walking) + مدة (hours).'
      }
    ]
  },
  // 11. Future Perfect
  {
    id: 'future-perfect',
    phaseId: 'phase3',
    titleEn: 'Future Perfect',
    titleAr: 'المستقبل التام',
    rulePos: 'Subject + will have + Past Participle (V3)',
    ruleNeg: 'Subject + will not have + V3',
    ruleQues: 'Will + Subject + have + V3?',
    exampleEn: 'By December, thousands of students will have graduated from Khartoum universities.',
    exampleAr: 'بحلول شهر ديسمبر، سيكون آلاف الطلاب قد تخرجوا من جامعات الخرطوم.',
    usageEn: 'An action that will be completed BEFORE a specific deadline in the future.',
    usageAr: 'حدث سيكون قد اكتمل وانتهى تماماً قبل حلول موعد مستقبلي معين.',
    signalWords: 'by tomorrow, by next year, by the time, by 2030',
    mistakeWrong: 'By 2026, I will finish my university. ⚠️',
    mistakeRight: 'By 2026, I will have finished my university. ✔️',
    mistakeWhyAr: 'عند وجود كلمة By + موعد مستقبلي يجب استخدام المستقبل التام (will have + V3).',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'By next Friday, the engineer will _____ completed the water station.',
        questionAr: 'بحلول الجمعة القادمة، سيكون المهندس قد أكمل محطة المياه.',
        options: ['have', 'has', 'had', 'having'],
        answer: 'have',
        explainAr: 'في المستقبل التام نستخدم will have دائماً بغض النظر عن الفاعل.'
      },
      {
        type: 'fill',
        questionEn: 'By 9:00 PM tonight, Fatima will have _____ (cook) the celebratory dinner.',
        questionAr: 'بحلول التاسعة مساءً، ستكون فاطمة قد طبخت عشاء الاحتفال.',
        answer: 'cooked',
        explainAr: 'بعد will have نضع التصريف الثالث (cooked).'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the future perfect sentence:',
        questionAr: 'رتب الجملة:',
        words: ['I', 'will', 'have', 'graduated', 'soon'],
        answer: 'I will have graduated soon',
        explainAr: 'فاعل (I) + will have + تصريف ثالث (graduated) + ظرف (soon).'
      }
    ]
  },
  // 12. Future Perfect Continuous
  {
    id: 'future-perfect-continuous',
    phaseId: 'phase3',
    titleEn: 'Future Perfect Continuous',
    titleAr: 'المستقبل التام المستمر',
    rulePos: 'Subject + will have been + Verb-ing',
    ruleNeg: 'Subject + will not have been + Verb-ing',
    ruleQues: 'Will + Subject + have been + Verb-ing?',
    exampleEn: 'By next year, teacher Omer will have been teaching English for twenty years.',
    exampleAr: 'بحلول العام القادم، سيكون الأستاذ عمر قد قضى عشرين عاماً مستمراً في تدريس الإنجليزية.',
    usageEn: 'Emphasizing the ongoing duration of an event reaching a future benchmark.',
    usageAr: 'التركيز على مدة استمرار عمل معين حتى الوصول لنقطة زمنية مستقبلية.',
    signalWords: 'by ... for (duration)',
    mistakeWrong: 'He will have been teach for 10 years. ❌',
    mistakeRight: 'He will have been teaching for 10 years. ✔️',
    mistakeWhyAr: 'الصيغة الصحيحة دائماً هي will have been + Verb-ing.',
    worksheet: [
      {
        type: 'mcq',
        questionEn: 'By next month, she will have been _____ at the clinic for 5 years.',
        questionAr: 'بحلول الشهر القادم، ستكون قد أتمت 5 سنوات مستمرة في العمل بالعيادة.',
        options: ['working', 'worked', 'work', 'works'],
        answer: 'working',
        explainAr: 'الصيغة تتطلب will have been + working.'
      },
      {
        type: 'fill',
        questionEn: 'By midnight, we will have been _____ (drive) for eight hours.',
        questionAr: 'بحلول منتصف الليل، سنكون قد قضينا ثماني ساعات متواصلة في القيادة.',
        answer: 'driving',
        explainAr: 'الفعل drive يصبح driving مع حذف حرف e.'
      },
      {
        type: 'reorder',
        questionEn: 'Arrange the sentence:',
        questionAr: 'رتب الجملة:',
        words: ['He', 'will', 'have', 'been', 'studying'],
        answer: 'He will have been studying',
        explainAr: 'فاعل (He) + will have been + verb-ing (studying).'
      }
    ]
  }
];

// --- Common Irregular Verbs ---
const IRREGULAR_VERBS = [
  { v1: 'be (am/is/are)', v2: 'was / were', v3: 'been', ar: 'يكون' },
  { v1: 'go', v2: 'went', v3: 'gone', ar: 'يذهب' },
  { v1: 'see', v2: 'saw', v3: 'seen', ar: 'يرى' },
  { v1: 'drink', v2: 'drank', v3: 'drunk', ar: 'يشرب' },
  { v1: 'eat', v2: 'ate', v3: 'eaten', ar: 'يأكل' },
  { v1: 'write', v2: 'wrote', v3: 'written', ar: 'يكتب' },
  { v1: 'speak', v2: 'spoke', v3: 'spoken', ar: 'يتحدث' },
  { v1: 'take', v2: 'took', v3: 'taken', ar: 'يأخذ' },
  { v1: 'make', v2: 'made', v3: 'made', ar: 'يصنع' },
  { v1: 'give', v2: 'gave', v3: 'given', ar: 'يعطي' },
  { v1: 'come', v2: 'came', v3: 'come', ar: 'يأتي' },
  { v1: 'buy', v2: 'bought', v3: 'bought', ar: 'يشتري' }
];

// --- Context & State Management ---
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('ar'); // 'ar' or 'en'
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'verbs' | 'progress'
  const [activeTenseId, setActiveTenseId] = useState(null);
  const [activeQuizTenseId, setActiveQuizTenseId] = useState(null);

  // Unlocked Tenses: Starts with the 1st tense ('present-simple')
  const [unlockedIds, setUnlockedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('el_baseet_unlocked');
      return saved ? JSON.parse(saved) : ['present-simple'];
    } catch {
      return ['present-simple'];
    }
  });

  // Quiz scores: { 'present-simple': 100, ... }
  const [quizScores, setQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem('el_baseet_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_baseet_unlocked', JSON.stringify(unlockedIds));
      localStorage.setItem('el_baseet_scores', JSON.stringify(quizScores));
    } catch (e) {
      console.error(e);
    }
  }, [unlockedIds, quizScores]);

  // Complete a quiz: if score >= 50%, unlock next tense!
  const recordQuizResult = (tenseId, score) => {
    setQuizScores(prev => ({ ...prev, [tenseId]: Math.max(prev[tenseId] || 0, score) }));
    if (score >= 50) {
      const currentIdx = TENSES.findIndex(t => t.id === tenseId);
      if (currentIdx >= 0 && currentIdx < TENSES.length - 1) {
        const nextId = TENSES[currentIdx + 1].id;
        setUnlockedIds(prev => prev.includes(nextId) ? prev : [...prev, nextId]);
      }
    }
  };

  const isUnlocked = (tenseId) => unlockedIds.includes(tenseId);
  const getScore = (tenseId) => quizScores[tenseId] || null;

  const totalProgress = Math.round((Object.keys(quizScores).length / TENSES.length) * 100);

  return (
    <AppContext.Provider value={{
      lang, setLang,
      activeTab, setActiveTab,
      activeTenseId, setActiveTenseId,
      activeQuizTenseId, setActiveQuizTenseId,
      unlockedIds, isUnlocked,
      quizScores, getScore, recordQuizResult,
      totalProgress
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// --- Audio Speak Button Component ---
function AudioBtn({ text, className = '' }) {
  const [playing, setPlaying] = useState(false);
  const handleSpeak = (e) => {
    e.stopPropagation();
    if (playing) {
      speech.stop();
      setPlaying(false);
    } else {
      setPlaying(true);
      speech.speak(text, () => setPlaying(false));
    }
  };
  return (
    <button
      onClick={handleSpeak}
      title="استمع للنطق الإنجليزي"
      className={`inline-flex items-center justify-center p-1.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors text-emerald-600 ${className}`}
    >
      {playing ? <VolumeX className="w-4 h-4 animate-pulse text-amber-500" /> : <Volume2 className="w-4 h-4" />}
    </button>
  );
}

// --- Top Teacher Branding Header ---
function Header() {
  const { lang, setLang, totalProgress, activeTenseId, setActiveTenseId } = useApp();
  const isAr = lang === 'ar';

  return (
    <header className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activeTenseId ? (
            <button
              onClick={() => setActiveTenseId(null)}
              className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition flex items-center gap-1 text-xs font-bold"
            >
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{isAr ? 'الرئيسية' : 'Back'}</span>
            </button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-wide text-white">
                {isAr ? 'البسيط' : 'El-Baseet'}
              </h1>
              <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full shadow-sm">
                100% {isAr ? 'مجاني' : 'FREE'}
              </span>
            </div>
            <p className="text-xs text-emerald-100 flex items-center gap-2">
              <span>إعداد: أ. قريب الله عمر</span>
              <span className="opacity-40">•</span>
              <a href="tel:+966508386758" className="inline-flex items-center gap-1 hover:text-amber-200 text-[11px] underline ltr font-mono">
                <Phone className="w-3 h-3 inline" /> +966508386758
              </a>
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition text-xs font-bold border border-white/20"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Strip */}
      <div className="w-full bg-emerald-950/60 h-1.5">
        <div
          className="bg-gradient-to-r from-amber-400 to-emerald-400 h-1.5 transition-all duration-500"
          style={{ width: `${totalProgress}%` }}
        />
      </div>
    </header>
  );
}

// --- Interactive Worksheet Modal ---
function WorksheetModal({ tense, onClose }) {
  const { lang, recordQuizResult, setActiveTenseId } = useApp();
  const isAr = lang === 'ar';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [fillInput, setFillInput] = useState('');
  const [reorderedWords, setReorderedWords] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = tense.worksheet[currentIdx];

  useEffect(() => {
    if (q && q.type === 'reorder') {
      // Scramble words for the student
      const shuffled = [...q.words].sort(() => Math.random() - 0.5);
      setReorderedWords(shuffled);
    }
    setSelectedAnswer('');
    setFillInput('');
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [currentIdx, q]);

  const handleCheck = () => {
    let correct = false;
    if (q.type === 'mcq') {
      correct = selectedAnswer === q.answer;
    } else if (q.type === 'fill') {
      correct = fillInput.trim().toLowerCase() === q.answer.trim().toLowerCase();
    } else if (q.type === 'reorder') {
      correct = reorderedWords.join(' ').trim().toLowerCase() === q.answer.trim().toLowerCase();
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < tense.worksheet.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      const finalPercent = Math.round(((score + (isCorrect ? 1 : 0)) / tense.worksheet.length) * 100);
      recordQuizResult(tense.id, finalPercent);
      setFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isAr ? `تمرين: ${tense.titleAr}` : `Worksheet: ${tense.titleEn}`}</span>
            </h3>
            <span className="text-xs text-emerald-200">
              {isAr ? `السؤال ${currentIdx + 1} من ${tense.worksheet.length}` : `Question ${currentIdx + 1} of ${tense.worksheet.length}`}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-emerald-700">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {!finished ? (
            <div>
              {/* Question Prompts */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-semibold text-slate-800 dark:text-slate-100 ltr">
                    {q.questionEn}
                  </p>
                  <AudioBtn text={q.questionEn} />
                </div>
                {q.questionAr && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 rtl text-right">
                    {q.questionAr}
                  </p>
                )}
              </div>

              {/* MCQ Options */}
              {q.type === 'mcq' && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={isSubmitted}
                      onClick={() => setSelectedAnswer(opt)}
                      className={`w-full p-3 text-left ltr font-medium rounded-xl border transition-all ${
                        selectedAnswer === opt
                          ? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Fill-in-the-blank */}
              {q.type === 'fill' && (
                <div className="pt-3">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    placeholder={isAr ? 'اكتب الإجابة هنا بالإنجليزية...' : 'Type your answer here...'}
                    value={fillInput}
                    onChange={(e) => setFillInput(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 ltr font-mono text-center text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              {/* Sentence Reordering */}
              {q.type === 'reorder' && (
                <div className="pt-3 space-y-3">
                  <p className="text-xs text-slate-500">
                    {isAr ? 'انقر على الكلمات لإعادة ترتيبها:' : 'Click words to reorder:'}
                  </p>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl min-h-[55px] items-center">
                    {reorderedWords.map((word, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm font-medium ltr cursor-pointer text-sm"
                        onClick={() => {
                          if (isSubmitted) return;
                          // Swap with adjacent word on click for simplicity
                          if (idx > 0) {
                            const copy = [...reorderedWords];
                            [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                            setReorderedWords(copy);
                          }
                        }}
                      >
                        {word} ⇄
                      </span>
                    ))}
                  </div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg text-center text-xs font-mono text-emerald-700 dark:text-emerald-300">
                    "{reorderedWords.join(' ')}"
                  </div>
                </div>
              )}

              {/* Feedback Alert */}
              {isSubmitted && (
                <div className={`p-4 rounded-xl border mt-4 ${isCorrect ? 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/40 dark:text-green-300' : 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300'}`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
                    <span>{isCorrect ? (isAr ? 'أحسنت! إجابة صحيحة ✔️' : 'Excellent! Correct!') : (isAr ? 'إجابة غير صحيحة ❌' : 'Incorrect!')}</span>
                  </div>
                  <p className="text-xs rtl text-right">
                    {q.explainAr}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs font-mono font-bold mt-1 text-emerald-700 dark:text-emerald-400 ltr">
                      Correct Answer: {q.answer}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Quiz Completed Result Screen
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {isAr ? 'اكتمل الاختبار بنجاح!' : 'Worksheet Finished!'}
              </h4>
              <p className="text-3xl font-black text-emerald-600">
                {Math.round((score / tense.worksheet.length) * 100)}%
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {score >= 2
                  ? (isAr ? 'تهانينا! لقد حققت نسبة النجاح وتم فتح الدرس التالي تلقائياً 🔓' : 'Congratulations! You unlocked the next lesson!')
                  : (isAr ? 'حاول مرة أخرى لتحقيق نسبة 50% أو أعلى لفتح الدرس القادم.' : 'Try again to score 50% or more to unlock the next lesson.')}
              </p>
              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => {
                    setCurrentIdx(0);
                    setScore(0);
                    setFinished(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 font-bold text-xs"
                >
                  {isAr ? 'إعادة المحاولة' : 'Retry'}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  {isAr ? 'متابعة' : 'Continue'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!finished && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
            {!isSubmitted ? (
              <button
                onClick={handleCheck}
                disabled={q.type === 'mcq' ? !selectedAnswer : q.type === 'fill' ? !fillInput.trim() : false}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition"
              >
                {isAr ? 'تحقق من الإجابة' : 'Check Answer'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-1"
              >
                <span>{currentIdx < tense.worksheet.length - 1 ? (isAr ? 'السؤال التالي' : 'Next Question') : (isAr ? 'عرض النتيجة' : 'View Results')}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Lesson Detail View ---
function LessonDetail({ tense, onBack }) {
  const { lang, setActiveQuizTenseId, getScore } = useApp();
  const isAr = lang === 'ar';
  const score = getScore(tense.id);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Lesson Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              {tense.phaseId.toUpperCase()}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                {isAr ? tense.titleAr : tense.titleEn}
              </h2>
              <AudioBtn text={tense.titleEn} />
            </div>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {isAr ? tense.titleEn : tense.titleAr}
            </p>
          </div>
          {score !== null && (
            <div className="text-right">
              <span className="text-xs text-slate-400 block">{isAr ? 'الدرجة' : 'Score'}</span>
              <span className="text-lg font-black text-emerald-600">{score}%</span>
            </div>
          )}
        </div>

        {/* Quick Rule Formula Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
            <Zap className="w-4 h-4" />
            <span>{isAr ? 'القواعد والصيغ التركيبية:' : 'Formulas & Rules:'}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-green-600 font-bold block mb-1">Affirmative (+)</span>
              <span className="text-slate-700 dark:text-slate-300">{tense.rulePos}</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-rose-500 font-bold block mb-1">Negative (-)</span>
              <span className="text-slate-700 dark:text-slate-300">{tense.ruleNeg}</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-sky-500 font-bold block mb-1">Question (?)</span>
              <span className="text-slate-700 dark:text-slate-300">{tense.ruleQues}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage & Real Sudanese Example */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{isAr ? 'الاستخدام وأمثلة من واقع السودان' : 'Usage & Sudanese Context'}</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {isAr ? tense.usageAr : tense.usageEn}
        </p>

        {/* Real Example Card */}
        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 ltr">
                "{tense.exampleEn}"
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 rtl text-right">
                {tense.exampleAr}
              </p>
            </div>
            <AudioBtn text={tense.exampleEn} />
          </div>
        </div>

        {/* Signal Words */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <strong className="text-slate-700 dark:text-slate-200">{isAr ? 'الكلمات الدالة:' : 'Key Signal Words:'} </strong>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{tense.signalWords}</span>
          </div>
        </div>
      </div>

      {/* Common Sudanese Speaker Mistakes */}
      <div className="bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl p-5 border border-rose-200 dark:border-rose-900 space-y-3">
        <h3 className="text-sm font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>{isAr ? 'أخطاء شائعة يقع فيها الطلاب في السودان' : 'Common Sudanese Mistakes'}</span>
        </h3>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 flex items-center justify-between">
            <span className="text-rose-600 font-mono font-medium ltr">{tense.mistakeWrong}</span>
            <span className="text-[10px] text-rose-400 font-bold uppercase">Wrong</span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-green-200 dark:border-green-800 flex items-center justify-between">
            <span className="text-green-700 font-mono font-medium ltr">{tense.mistakeRight}</span>
            <span className="text-[10px] text-green-500 font-bold uppercase">Right</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 rtl text-right pt-1">
            💡 {tense.mistakeWhyAr}
          </p>
        </div>
      </div>

      {/* Practice Button */}
      <div className="pt-2">
        <button
          onClick={() => setActiveQuizTenseId(tense.id)}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform active:scale-98"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{isAr ? 'ابدأ التمرين وورقة العمل (3 أسئلة)' : 'Start Interactive Worksheet (3 Questions)'}</span>
        </button>
      </div>
    </div>
  );
}

// --- Home / Learn Catalog ---
function LearnView() {
  const { lang, setActiveTenseId, isUnlocked, getScore } = useApp();
  const isAr = lang === 'ar';

  return (
    <div className="space-y-6 pb-20">
      {PHASES.map((phase) => {
        const phaseTenses = TENSES.filter(t => phase.tenseIds.includes(t.id));
        return (
          <div key={phase.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? phase.titleAr : phase.titleEn}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr ? phase.descAr : phase.descEn}
                </p>
              </div>
            </div>

            {/* Tenses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phaseTenses.map((tense) => {
                const unlocked = isUnlocked(tense.id);
                const score = getScore(tense.id);

                return (
                  <div
                    key={tense.id}
                    onClick={() => {
                      if (unlocked) setActiveTenseId(tense.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all relative ${
                      unlocked
                        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md cursor-pointer'
                        : 'bg-slate-100/70 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                          {isAr ? tense.titleAr : tense.titleEn}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {isAr ? tense.titleEn : tense.titleAr}
                        </p>
                      </div>

                      {unlocked ? (
                        score !== null ? (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                            {score}%
                          </span>
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        )
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-1 font-mono">
                      {tense.rulePos}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{unlocked ? (isAr ? 'متاح للدراسة' : 'Ready') : (isAr ? 'مغلق (أكمل السابق)' : 'Locked')}</span>
                      {unlocked && (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          {isAr ? 'ابدأ' : 'Open'}
                          {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Irregular Verbs View ---
function VerbsView() {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const [query, setQuery] = useState('');

  const filtered = IRREGULAR_VERBS.filter(
    v => v.v1.toLowerCase().includes(query.toLowerCase()) ||
         v.v2.toLowerCase().includes(query.toLowerCase()) ||
         v.ar.includes(query)
  );

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
          {isAr ? 'جدول الأفعال الشاذة الأكثر استخداماً' : 'Common Irregular Verbs'}
        </h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute top-3 left-3 text-slate-400" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن فعل...' : 'Search verb...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 bg-slate-100 dark:bg-slate-800 p-3 text-xs font-bold text-slate-600 dark:text-slate-300 text-center">
          <span>Base (V1)</span>
          <span>Past (V2)</span>
          <span>Participle (V3)</span>
          <span>{isAr ? 'المعنى' : 'Meaning'}</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((v, i) => (
            <div key={i} className="grid grid-cols-4 p-3 text-xs text-center items-center font-mono hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span className="font-bold text-emerald-600 flex items-center justify-center gap-1">
                {v.v1} <AudioBtn text={v.v1} className="p-0.5" />
              </span>
              <span className="text-slate-700 dark:text-slate-300">{v.v2}</span>
              <span className="text-amber-600">{v.v3}</span>
              <span className="font-sans text-slate-500 dark:text-slate-400">{v.ar}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Progress & Profile View ---
function ProgressView() {
  const { lang, totalProgress, unlockedIds, quizScores } = useApp();
  const isAr = lang === 'ar';

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white rounded-3xl p-6 shadow-xl text-center space-y-3">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto border border-white/20">
          <Award className="w-8 h-8 text-amber-300" />
        </div>
        <h2 className="text-xl font-black">
          {isAr ? 'مستوى التقدم الدراسي' : 'Your Learning Journey'}
        </h2>
        <p className="text-4xl font-black text-amber-300">{totalProgress}%</p>
        <p className="text-xs text-emerald-100">
          {isAr ? `أكملت بنجاح ${Object.keys(quizScores).length} من أصل 12 زمناً باللغة الإنجليزية` : `Completed ${Object.keys(quizScores).length} of 12 English Tenses`}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
          {isAr ? 'معلومات التطبيق والمؤلف' : 'Application & Author Info'}
        </h3>
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <p><strong>{isAr ? 'اسم التطبيق:' : 'App:'}</strong> El-Baseet (البسيط)</p>
          <p><strong>{isAr ? 'إعداد ومراجعة:' : 'Author:'}</strong> أ. قريب الله عمر</p>
          <p><strong>{isAr ? 'رقم التواصل:' : 'Phone:'}</strong> +966508386758</p>
          <p><strong>{isAr ? 'الترخيص:' : 'Access:'}</strong> 100% {isAr ? 'مجاني للطلاب السودانيين' : 'Free for all Sudanese students'}</p>
        </div>
      </div>
    </div>
  );
}

// --- Main App Root ---
export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

function MainLayout() {
  const { lang, activeTab, setActiveTab, activeTenseId, setActiveTenseId, activeQuizTenseId, setActiveQuizTenseId } = useApp();
  const isAr = lang === 'ar';

  const selectedTense = activeTenseId ? TENSES.find(t => t.id === activeTenseId) : null;
  const quizTense = activeQuizTenseId ? TENSES.find(t => t.id === activeQuizTenseId) : null;

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${isAr ? 'font-sans' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTenseId && selectedTense ? (
          <LessonDetail tense={selectedTense} onBack={() => setActiveTenseId(null)} />
        ) : (
          <>
            {activeTab === 'learn' && <LearnView />}
            {activeTab === 'verbs' && <VerbsView />}
            {activeTab === 'progress' && <ProgressView />}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      {!activeTenseId && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30">
          <div className="max-w-md mx-auto grid grid-cols-3 py-2">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex flex-col items-center gap-1 py-1 text-xs font-bold transition ${activeTab === 'learn' ? 'text-emerald-600' : 'text-slate-400'}`}
            >
              <BookOpen className="w-5 h-5" />
              <span>{isAr ? 'الدروس' : 'Lessons'}</span>
            </button>
            <button
              onClick={() => setActiveTab('verbs')}
              className={`flex flex-col items-center gap-1 py-1 text-xs font-bold transition ${activeTab === 'verbs' ? 'text-emerald-600' : 'text-slate-400'}`}
            >
              <Zap className="w-5 h-5" />
              <span>{isAr ? 'الأفعال الشاذة' : 'Verbs'}</span>
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex flex-col items-center gap-1 py-1 text-xs font-bold transition ${activeTab === 'progress' ? 'text-emerald-600' : 'text-slate-400'}`}
            >
              <Award className="w-5 h-5" />
              <span>{isAr ? 'الإنجاز' : 'Progress'}</span>
            </button>
          </div>
        </nav>
      )}

      {/* Worksheet Modal */}
      {quizTense && (
        <WorksheetModal
          tense={quizTense}
          onClose={() => setActiveQuizTenseId(null)}
        />
      )}
    </div>
  );
}
