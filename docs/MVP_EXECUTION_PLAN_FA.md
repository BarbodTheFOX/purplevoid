# سند اجرایی MVP — Purple VOID

> وضعیت: برنامه اجرایی پس از بررسی پروژه موجود و دو فایل مرجع پیوست‌شده  
> مسیر پروژه: `F:\PURPLE-VOID`  
> اصل حاکم: متن سؤال‌ها و منطق `PV-BPI 1.1` تا رفع تعارض منابع، Freeze است.

---

## 1) برداشت محصول

Purple VOID محصول VIP مستقل Eventum Space برای تمرین رفتار معامله‌گر است؛ نه کانال سیگنال، نه دوره سود تضمینی و نه درمان روان‌شناختی. نقطه ورود محصول، تست ۳۵ سؤالی `PV-BPI` است که پنج مهارت رفتاری اخیر کاربر را می‌سنجد و آن‌ها را با زبان آرکیتایپ‌ها توضیح می‌دهد:

- `ARCHITECT`: انضباط فرایندی
- `ORACLE`: کالیبراسیون شواهد
- `ALCHEMIST`: یادگیری انعطاف‌پذیر
- `PHANTOM`: فاصله‌گیری شناختی
- `SOVEREIGN`: خودتنظیمی

آرکیتایپ در Purple VOID هویت ثابت یا تشخیص نیست؛ یک زبان مشاهده و مسیر تمرینی فعلی است. تجربه باید کاربر را از «شناخت الگوی غالب» به «انجام تمرین، ثبت رفتار و مقایسه تغییر در زمان» منتقل کند.

## 2) ارزش اصلی

ارزش اصلی Purple VOID تبدیل روان‌شناسی معامله‌گری از محتوای عمومی و انتزاعی به چرخه قابل اجراست:

`مشاهده → نام‌گذاری الگو → تمرین متناسب → ثبت رفتار → بازآزمایی`

تفاوت محصول با VIPهای رایج بازار این است که درباره معامله بعدی تصمیم نمی‌گیرد؛ کیفیت تصمیم‌گیری خود کاربر را قابل مشاهده و قابل تمرین می‌کند.

## 3) مخاطب اصلی

### مخاطب اصلی MVP

تریدر فارسی‌زبان با تجربه واقعی بازار که دانش تکنیکال اولیه دارد، اما زیر فشار بین پلن و اجرای واقعی فاصله می‌بیند؛ برای نمونه:

- بعد از ضرر عجله می‌کند؛
- با FOMO شرط ورود را کنار می‌گذارد؛
- بعد از چند برد ریسک را بالا می‌برد؛
- نتیجه مالی را با کیفیت تصمیم اشتباه می‌گیرد؛
- سیستم را زود یا هم‌زمان در چند بخش تغییر می‌دهد؛
- رفتار خود را منظم ثبت و بازبینی نمی‌کند.

### مخاطب ثانویه

کاربر کم‌تجربه یا بدون معامله واقعی که می‌تواند تست را انجام دهد، اما نتیجه او باید صریحاً «فرضیه‌ای» و با اطمینان پایین نمایش داده شود.

### ضدپرسونا

- فردی که دنبال سیگنال یا تضمین سود است؛
- فردی که نتیجه را تشخیص پزشکی یا شخصیت دائمی می‌خواهد؛
- فردی که هنوز انتظار دارد محصول به‌جای او تصمیم معاملاتی بگیرد.

---

## 4) گزارش وضعیت فعلی پروژه

### Stack فعلی

- Next.js `15.5.9` با App Router
- React `19.2.6`
- TypeScript `5.9.3` با typecheck مستقل
- Tailwind CSS `3.4.17` + CSS سراسری سفارشی
- `vinext 1.0.0-beta.2` و Vite برای build/dev و استقرار Cloudflare-compatible
- Zod `4.1.12` برای اعتبارسنجی LocalStorage
- Vitest برای unit test
- Playwright برای E2E
- LocalStorage؛ بدون API، دیتابیس، حساب کاربری یا analytics فعال

### Routeهای موجود

- `/`
- `/test`
- `/test/questions`
- `/results`
- `/methodology`
- `/privacy`

### بخش‌های تکمیل‌شده

- موتور تست ۳۵ سؤال با Back/Next و progress bar
- ذخیره پاسخ، زمان هر آیتم، زمان شروع، seed و ترتیب tie-break در LocalStorage
- بازیابی تست پس از refresh
- امتیازدهی پنج محور، reverse scoring، سناریوها و RawIndex
- نوع نتیجه: balanced / blended / primary_support / dominant
- مسیر رشد یک یا دو محوری
- کنترل کیفیت پاسخ و سطح اطمینان
- منطق سایه و حذف سایه در اطمینان پایین
- نتیجه پنج‌محوری، نمودار Radar، سطح مهارت و محدودیت‌ها
- metadata، OG ثابت، noindex پیش‌فرض
- RTL، fieldset/radio واقعی، focus state، reduced motion و touch target
- unit test و E2E مسیر کامل تست

### بخش‌های ناقص نسبت به Master Context

- لندینگ فعلی فقط Hero، معرفی پنج محور و محدودیت‌های تست را دارد؛ Problem، تعریف Purple VOID، امکانات VIP، How It Works، Boundaries کامل و Final CTA وجود ندارد.
- تجربه فعلی عمدتاً «وب‌اپ تست» است و هنوز Purple VOID را به‌عنوان محصول VIP و فضای تمرین معرفی نمی‌کند.
- Routeهای `/join`، `/terms`، `/disclaimer` و صفحات اختیاری آرکیتایپ وجود ندارند.
- CTA عضویت/Waitlist/Telegram در نتیجه وجود ندارد.
- Share Result و Share Card اختصاصی وجود ندارد.
- analytics adapter و eventهای موردنیاز وجود ندارند.
- Strength، واکنش هنگام ضرر، واکنش هنگام سود، ریسک رفتاری و Purple Quest نتیجه به ساختار کامل موردنظر نرسیده‌اند.
- جلوگیری یا هشدار خروج تصادفی از تست پیاده نشده است.
- تست موبایل E2E فقط اسکرین‌شات نتیجه می‌گیرد؛ تست تعاملی مستقل در viewport موبایل و آزمون keyboard navigation لازم است.
- فونت فارسی به‌صورت asset یا `next/font` بارگذاری نشده و صرفاً به font stack دستگاه تکیه دارد.
- OG فعلی ثابت است؛ کارت اشتراک نتیجه‌محور وجود ندارد.

### مشکلات فنی مشاهده‌شده

- `npm run lint` ناموفق است: `brand-mark.tsx` برای ناوبری داخلی از `<a>` به‌جای `next/link` استفاده می‌کند.
- `next lint` deprecated است و باید به ESLint CLI مهاجرت کند.
- هنگام lint هشدار باینری SWC ویندوز دیده شد؛ build با vinext موفق است، اما مسیر Next-native باید جداگانه تثبیت شود.
- `README` حداقل Node را 20.11 نوشته، ولی `package.json` مقدار `>=22.13.0` دارد.
- `ARCHITECTURE.md` از Tailwind 4 نام می‌برد، ولی dependency واقعی Tailwind 3.4.17 است.
- schema نتیجه در `storage.ts` بسیار شل است (`unknown` و `passthrough`)؛ payload دست‌کاری‌شده LocalStorage می‌تواند از parse اولیه عبور کند و در UI خطا بسازد. نتیجه قابل جعل از Query نیست، ولی مرز LocalStorage باید کامل اعتبارسنجی شود.
- نام route در Master Context به‌صورت `/result` پیشنهاد شده، اما پروژه `/results` دارد؛ یک canonical route و redirect لازم است.
- شناسه نسخه تست در سند مرجع `PV-BPI-1.1-beta` است، اما کد `beta-1.1-BPI-PV` ذخیره می‌کند.

### خروجی واقعی بررسی کیفیت

- `npm test`: موفق — ۴۰ تست از ۴۰ تست
- `npm run typecheck`: موفق
- `npm run build`: موفق — ۶ route ساخته شد
- `npm run test:e2e`: موفق — مسیر کامل ۳۵ سؤال و refresh نتیجه؛ ۱ تست hosted به‌دلیل نبود متغیر محیطی skip شد
- `npm run lint`: ناموفق — ۱ خطای ESLint در `brand-mark.tsx`

---

## 5) ابهام‌ها و تعارض‌های واقعی

این موارد باید پیش از تغییر داده تست بسته شوند:

1. **متن مقیاس لیکرت در دو فایل مرجع یکسان نیست.** فایل سؤال‌ها از «اصلاً / به ندرت / بعضی وقتا / بیشتر وقتا / تقریباً همیشه» استفاده می‌کند؛ فایل امتیازدهی از «تقریباً هیچ‌وقت / به ندرت / گاهی / اغلب / تقریباً همیشه» نام می‌برد. کد فعلی نسخه سومی با «بعضی وقت‌ها / بیشتر وقت‌ها» دارد. عدد ۱ تا ۵ روشن است، اما متن نمایشی Source of Truth واحد ندارد.
2. **متن سؤال‌های کد فعلی از نظر فاصله، نیم‌فاصله، نشانه‌گذاری و بعضی واژه‌ها با Markdown پیوست‌شده یکسان نیست.** پروژه به PDFهای `*_FIXED.pdf` ارجاع می‌دهد، در حالی که کاربر Markdownهای جدید را Source of Truth معرفی کرده است. بدون تأیید نباید متن‌ها همسان‌سازی شوند.
3. **شناسه نسخه تست متعارض است:** سند امتیازدهی `PV-BPI-1.1-beta`؛ کد و اسناد پروژه `beta-1.1-BPI-PV`.
4. **مقصد CTA عضویت هنوز تعیین نشده است:** Waitlist، Telegram، درخواست عضویت یا پرداخت. معماری باید config-driven باشد، اما انتشار CTA نهایی بدون مقصد ممکن نیست.
5. **محتوای تفسیری کامل نتیجه مرجع رسمی مستقل ندارد.** کد فعلی summary/pressure/practice دارد، اما Strength، Shadow copy، رفتار هنگام سود/ضرر، risk و Quest باید از نظر محتوایی تأیید شوند؛ این متن‌ها نباید ادعای بالینی یا مالی بسازند.
6. **حریم خصوصی analytics:** MVP فعلی هیچ داده‌ای ارسال نمی‌کند. فعال‌کردن analytics، گزاره «هیچ داده‌ای به سرور ارسال نمی‌شود» را تغییر می‌دهد و نیازمند به‌روزرسانی Privacy و رضایت/حداقل‌سازی داده است.

---

## 6) User Journey پیشنهادی

### مسیر اصلی

1. **ورود به Landing** — در چند ثانیه می‌فهمد مسئله «فاصله پلن و رفتار زیر فشار» است.
2. **شناخت Purple VOID** — می‌فهمد محصول فضای تمرین است، نه سیگنال یا درمان.
3. **ایجاد کنجکاوی نسبت به پنج الگو** — فقط teaser؛ جزئیات نتیجه لو نمی‌رود.
4. **CTA تست** — مشاهده ۳۵ سؤال، زمان تقریبی، عدم وجود پاسخ درست/غلط و ذخیره محلی.
5. **Test Intro** — انتخاب بازه تعداد معاملات و بازه یادآوری.
6. **Question Flow** — یک سؤال در هر صفحه، ذخیره خودکار، Back/Next، پیشرفت و بازگشت پس از refresh.
7. **Result** — نوع پروفایل، اطمینان، محورهای اصلی/پشتیبان، مسیر رشد و سایه احتمالی.
8. **Actionable Insight** — یک تمرین اولیه و Purple Quest متناسب با نتیجه.
9. **Conversion CTA** — ورود به `/join` با مقصد config-driven.
10. **بازگشت** — پیشنهاد retest پس از ۳۰ روز یا ۲۰ معامله جدید.

### مسیرهای فرعی

- تست نیمه‌تمام → Resume banner → ادامه از آخرین سؤال
- نتیجه موجود → دیدن مجدد نتیجه یا Restart با تأیید
- نتیجه Low confidence → زبان محتاطانه، بدون Shadow، CTA تمرین/ثبت رفتار پیش از بازآزمایی
- نبود نتیجه معتبر در `/results` → انتقال به `/test`
- CTA Join غیرفعال → Waitlist به‌جای لینک مرده

---

## 7) Sitemap نهایی MVP

```text
/
├─ /test
│  └─ /test/questions
├─ /results                  canonical result route
├─ /join                     config-driven conversion
├─ /methodology
├─ /privacy
├─ /terms
└─ /disclaimer
```

### پس از MVP

```text
/archetypes/[slug]
/share/[result-token-or-archetype]
```

اگر `/result` حفظ شود، فقط redirect دائمی به `/results` باشد تا دو منبع canonical ساخته نشود.

---

## 8) ساختار نهایی Landing و Wireframe متنی

### 1. Header

`[Eventum/Purple VOID mark] [چیست؟] [داخل VOID] [مرزها] [شروع تست]`

- دسکتاپ: ناوبری کم‌حجم و sticky
- موبایل: لوگو + CTA تست؛ لینک‌های فرعی در menu یا footer

### 2. Hero — مسئله و وعده تجربه

`Eyebrow: Eventum Space presents`  
`Headline: اشاره مستقیم به فاصله پلن و رفتار زیر فشار`  
`Body: تست و فضای تمرین؛ بدون ادعای شخصیت ثابت`  
`Primary CTA: آرکیتایپ فعلی‌ات را پیدا کن`  
`Secondary CTA: Purple VOID چیست؟`  
`Trust row: ۳۵ سؤال / ۸–۱۲ دقیقه / ذخیره محلی`

Visual: یک فرم انتزاعی مرکزی/void با پنج نشانه پیرامونی؛ نه پنج کارت یکسان.

### 3. Problem — مشکل کمبود اطلاعات نیست

- یک statement اصلی
- سه رفتار واقعی: کنارگذاشتن پلن زیر فشار، دنبال‌کردن قیمت، افزایش ریسک بعد از برد
- پایان بخش با این ایده که «الگوی تکرارشونده باید دیده شود»

### 4. What Is Purple VOID

دو ستون:

- **هست:** فضای تمرین، مأموریت رفتاری، Reflection، پیگیری و بازآزمایی
- **نیست:** سیگنال، تضمین سود، درمان، برچسب شخصیت

این بخش باید محصول VIP را مستقل از تست تعریف کند.

### 5. Archetype Field

یک composition واحد با پنج node یا پنج برش تصویری متفاوت:

- نام انگلیسی
- نام فارسی/شایستگی
- یک خط teaser

جزئیات Strength/Shadow کامل فقط بعد از تست.

### 6. Test Entry

`[۳۵ سؤال] [۸–۱۲ دقیقه] [بدون پاسخ درست/غلط] [نتیجه رفتاری، نه تشخیص]`

CTA اصلی به `/test` و یک preview کوچک از progress/question UI.

### 7. Inside Purple VOID

به‌جای grid بزرگ کارت‌های مشابه، سه فصل:

1. **Practice:** Missions، Reflection، Archetype Practices
2. **Continuity:** Streak، XP، Purple Quest، Leaderboard معنادار
3. **Depth:** محتوای اختصاصی، Voice Note، Q&A، Live محدود

### 8. How It Works

Timeline شش مرحله‌ای مطابق مسیر:

`Test → Profile → Join → Mission → Reflection → Compare`

در موبایل vertical؛ در دسکتاپ horizontal یا editorial sequence.

### 9. Baseline & Progress

نمایش نمونه پنج معیار ۰ تا ۵ و مقایسه روز صفر/روز سی؛ بدون ادعای اثر قطعی.

### 10. Boundaries

یک manifesto کوتاه و شفاف:

- سیگنال نیست؛ سود تضمین نمی‌شود.
- درمان یا تشخیص نیست.
- مسئولیت معامله با کاربر است.
- اطلاعات خصوصی، اسپم و تبلیغات شخصی ممنوع است.
- احترام و مشارکت معنادار الزامی است.

### 11. Final CTA

`Headline: قدم بعدی، دیدن الگوی فعلی است.`  
`CTA اصلی: شروع تست`  
`CTA ثانویه: ورود/Waitlist` — فقط اگر مقصد فعال باشد.

### 12. Footer

Eventum Space، شبکه‌ها، Privacy، Terms، Disclaimer، Support و نسخه تست.

---

## 9) Visual Direction پیشنهادی

### تصمیم

**Editorial Void + Behavioral Instrument**

ترکیب پیشنهادی: دقت و سلسله‌مراتب Linear، فضای تاریک و سینمایی SpaceX، اما با هویت مستقل Purple VOID. نتیجه نباید dashboard شلوغ یا مجموعه کارت‌های generic باشد.

### قواعد

- زمینه نزدیک به مشکی با ته‌رنگ بنفش، نه بنفش اشباع سراسری
- Accent بنفش فقط برای CTA، focus، داده فعال و نقاط کلیدی
- سطح‌ها بیشتر با luminance و border ظریف جدا شوند، نه glass/blur سنگین
- تایپوگرافی فارسی editorial و خوانا؛ labelهای انگلیسی کوچک و کنترل‌شده
- یک visual hero قوی و art-directed؛ تصاویر آرکیتایپ‌ها نیمه‌انسانی/معماری/سنگ/فلز و عضو یک سیستم
- Motion کوتاه 160–280ms؛ reveal آرام، بدون parallax سنگین و بدون loopهای پرمصرف
- نتایج شبیه instrument panel بالغ باشند، نه badge/score بازی‌گونه

### ارزیابی UI فعلی

UI فعلی تمیز، RTL و responsive است و کنتراست و سلسله‌مراتب قابل قبول دارد. در موبایل overflow آشکار دیده نشد. با این حال:

- استفاده زیاد از containerهای بزرگ با border و گوشه گرد، صفحه را به مجموعه cardهای مشابه نزدیک کرده است.
- صفحه نتیجه بسیار طولانی است و CTA عضویت/اشتراک ندارد.
- بعضی متون توضیحی و نمودار روی موبایل کوچک‌اند.
- Hero نتیجه در موبایل فشرده اما قابل استفاده است؛ اولویت اطلاعات باید برای اسکن سریع‌تر ساده‌تر شود.
- هویت فعلی بیشتر «ابزار ارزیابی» است تا «ورودی سینمایی به Purple VOID».

---

## 10) Design Tokens اولیه

```css
:root {
  --void-950: #06050a;
  --void-900: #0a0811;
  --void-850: #100c18;
  --surface-1: rgba(255, 255, 255, 0.025);
  --surface-2: rgba(255, 255, 255, 0.045);
  --line-subtle: rgba(236, 228, 248, 0.08);
  --line-active: rgba(174, 112, 255, 0.42);

  --ink-100: #f4eff8;
  --ink-300: #cfc6d8;
  --ink-500: #93899f;

  --purple-500: #9b5cf6;
  --purple-400: #b77bff;
  --purple-300: #d5b5ff;

  --success: #78c9aa;
  --warning: #d7bb77;
  --danger: #d8899d;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-20: 80px;

  --radius-control: 10px;
  --radius-card: 16px;
  --radius-panel: 24px;
  --content-max: 1180px;

  --motion-fast: 160ms;
  --motion-base: 240ms;
  --ease-out: cubic-bezier(.2,.8,.2,1);
}
```

### تایپوگرافی

- فارسی: یک فونت webfont مجاز و self-hosted با وزن‌های محدود 400/500/700؛ fallback فعلی حفظ شود.
- انگلیسی/اعداد فنی: Inter یا Geist با `dir=ltr`.
- حداقل متن body موبایل: 16px؛ metadata مهم کمتر از 12px نشود.
- تیتر Hero: `clamp(2.4rem, 7vw, 5.4rem)` با line-height فشرده اما خوانا.

---

## 11) Component List

### Shared

- `SiteHeader`
- `MobileNav`
- `BrandMark`
- `SectionHeader`
- `PrimaryCTA`
- `SecondaryCTA`
- `BoundaryNotice`
- `SiteFooter`
- `AnalyticsLink/Button`

### Landing

- `HeroVoidVisual`
- `BehaviorProblemSequence`
- `WhatIsVoidSplit`
- `ArchetypeField`
- `TestEntryPanel`
- `InsideVoidChapters`
- `HowItWorksTimeline`
- `BaselineComparisonPreview`
- `BoundariesManifesto`
- `FinalCTA`

### Test

- `TestIntroForm` موجود، با refactor محدود
- `ExperienceRangeField`
- `QuestionFlow` موجود
- `LikertOptions`
- `ScenarioOptions`
- `TestProgress`
- `ResumeBanner`
- `ExitGuard`

### Result

- `ResultHero`
- `ProfileTypeBadge`
- `ConfidencePanel`
- `AxisRadar`
- `AxisScoreList`
- `StrengthPanel`
- `PressureBehaviorPanel`
- `ProfitLossResponsePanel`
- `GrowthPathPanel`
- `PossibleShadowPanel`
- `PurpleQuestPanel`
- `ShareResult`
- `JoinCTA`
- `RetestPanel`
- `ResultDisclaimer`

### Join/Legal

- `JoinModeRenderer`
- `WaitlistForm` (فقط در صورت backend)
- `TelegramRedirect`
- `LegalDocumentLayout`

---

## 12) Data Structure تست

داده سؤال و داده امتیازدهی جدا و immutable باقی بمانند.

```ts
type TestDefinition = {
  testVersion: string;
  algorithmVersion: "1.1";
  locale: "fa-IR";
  likertScale: readonly LikertOption[];
  questions: readonly TestQuestion[]; // exactly 35
};

type AxisDefinition = {
  id: AxisId;
  competency: string;
  directItems: readonly LikertQuestionId[];
  reverseItems: readonly LikertQuestionId[];
  scenarioId: ScenarioQuestionId;
};

type ScenarioScoreMap = Record<
  ScenarioQuestionId,
  Record<ScenarioOptionId, 0 | 1 | 2 | 3 | 4>
>;

type StoredProgress = {
  schemaVersion: 1;
  testVersion: string;
  algorithmVersion: "1.1";
  answers: TestAnswers;
  currentQuestionIndex: number;
  startTime: number;
  questionShownAt: number;
  responseTimestamps: Partial<Record<QuestionId, number>>;
  responseDurationsMs: Partial<Record<QuestionId, number>>;
  tradeCountRange: TradeCountRange;
  tieBreakSeed: string;
  tieBreakOrder: AxisId[];
};
```

### قواعد داده

- متن‌ها فقط از Source of Truth تأییدشده وارد شوند.
- option ID سناریو ثابت است؛ ترتیب UI مبنای نمره نیست.
- کل payload نسخه‌بندی و با Zod کامل validate شود.
- migration بین نسخه 1.0 و 1.1 انجام نشود.
- هیچ داده خام تست در analytics ارسال نشود.

---

## 13) معماری سیستم امتیازدهی

فرمول رسمی بدون تغییر:

```text
LikertSum = sum(6 scored items)          [6..30]
ScenarioScore = mapped A..E score        [0..4]
RawAxis = LikertSum + ScenarioScore      [6..34]
RawIndex = RawAxis - 6                   [0..28]
AxisScore = (RawIndex / 28) * 100        [0..100]
```

### Pipeline

1. اعتبارسنجی کامل ۳۰ پاسخ لیکرت، ۵ پاسخ سناریو و ۳۵ زمان پاسخ
2. معکوس‌سازی ۱۰ آیتم منفی با `6 - answer`
3. محاسبه پنج محور با عدد صحیح RawIndex
4. نگاشت سناریو با شناسه A–E
5. مرتب‌سازی با RawIndex و tie-break پایدار نشست
6. اعمال اولویت نوع نتیجه: balanced → blended → primary_support → dominant
7. انتخاب یک/دو مسیر رشد
8. محاسبه quality flags
9. تعیین confidence
10. محاسبه حداکثر یک shadow فقط در medium/usual
11. گردکردن AxisScore فقط در presentation
12. ذخیره ورودی خام، داده مشتق، نسخه‌ها و rule IDs

### مرزبندی ماژول‌ها

- `data/`: فقط سؤال، محورها، score maps و copy تأییدشده
- `logic/`: توابع pure و deterministic
- `lib/storage.ts`: validation/migration boundary
- `components/`: بدون فرمول یا threshold
- `analytics/`: فقط event metadata غیرحساس

---

## 14) Edge Caseهای نتیجه

- پاسخ ناقص یا ID ناشناخته → نتیجه ساخته نشود.
- LocalStorage خراب/دست‌کاری‌شده → پاک‌سازی امن و بازگشت به شروع، نه crash.
- اختلاف max/min ≤ 4 → Balanced، حتی اگر top gap نیز کوچک باشد.
- top gap ≤ 2 پس از رد Balanced → Blended با دو وزن برابر.
- top gap = 3 یا 4 → Primary + Support.
- top gap ≥ 5 → Dominant.
- tie کامل → ترتیب تصادفی اما پایدار در همان نتیجه؛ refresh نباید تغییر دهد.
- دو محور پایین با فاصله ≤ 2 → هر دو growth path.
- confidence پایین → shadow همیشه مخفی.
- چند shadow فعال → بیشترین gap؛ tie در gap → هیچ shadow.
- تکمیل کمتر از ۱۵۰ ثانیه، fast items، straight-line، ideal، inconsistency و divergence → flag مطابق سند.
- صفر معامله → تست اجرا شود، نتیجه فرضی و confidence پایین.
- تغییر نسخه الگوریتم → نتیجه قدیمی با نسخه جدید نمایش/ادغام نشود.
- دسترسی مستقیم `/results` بدون نتیجه معتبر → `/test`.
- refresh هنگام سؤال → پاسخ‌های قبلی حفظ شود؛ زمان سؤال فعلی از زمان resume دوباره شروع شود.
- Back و تغییر پاسخ → پاسخ نهایی ذخیره شود، ولی زمان پاسخ اول طبق قاعده فعلی ثابت بماند؛ این رفتار باید در documentation صریح بماند.
- Share بدون Web Share API → fallback کپی لینک/دانلود card.
- result type Balanced → هیچ primary جعلی ساخته نشود؛ تفسیر باید پنج‌محوری/دو محور بالاتر را با زبان غیرغالب ارائه کند.
- عدم اتصال/آفلاین → تست و نتیجه محلی همچنان کار کند؛ فقط Join/Share آنلاین محدود شود.

---

## 15) معماری فنی MVP

### تصمیم

حفظ codebase و App Router فعلی؛ بازنویسی پروژه یا ساخت پروژه جدا ممنوع. موتور امتیازدهی pure فعلی asset اصلی است و باید با تست‌های regression محافظت شود.

### Client/Server

- Landing و صفحات قانونی: Server Components تا حد ممکن
- Test/Result: Client Components فقط در مرز LocalStorage و interaction
- Scoring: pure TypeScript، بدون dependency روی React/browser
- Join destination: env/config adapter
- Analytics: interface no-op پیش‌فرض؛ provider بعداً قابل تعویض
- Share card: در MVP کارت ثابت هر archetype یا client-generated image؛ بدون PII

### Analytics Contract

```ts
type AnalyticsEvent =
  | "landing_viewed"
  | "test_cta_clicked"
  | "test_started"
  | "question_answered"
  | "test_abandoned"
  | "test_completed"
  | "result_viewed"
  | "share_result_clicked"
  | "join_cta_clicked"
  | "waitlist_submitted"
  | "telegram_redirect_clicked";
```

Payload مجاز: نسخه تست، شماره سؤال، kind سؤال، result type، confidence، archetype ID و route. پاسخ خام، زمان دقیق فردی، داده معاملاتی حساس و شناسه شخصی ارسال نشود.

### SEO

- canonical metadata برای landing و صفحات عمومی
- `/test/questions` و `/results` بهتر است noindex بمانند
- OG عمومی برای landing
- Share card آرکیتایپ فاقد نام و داده خصوصی
- indexing عمومی فقط پس از فعال‌شدن env و تأیید محتوا

---

## 16) Folder Structure پیشنهادی

```text
src/
  app/
    page.tsx
    test/
      page.tsx
      questions/page.tsx
    results/page.tsx
    join/page.tsx
    methodology/page.tsx
    privacy/page.tsx
    terms/page.tsx
    disclaimer/page.tsx
  components/
    brand/
    layout/
    ui/
  features/
    landing/
      components/
      content.ts
    test/
      components/
      data/
      logic/
      lib/
      types.ts
    result/
      components/
      share/
    conversion/
      config.ts
      components/
    analytics/
      events.ts
      client.ts
  lib/
    format.ts
    env.ts
public/
  brand/
  archetypes/
  share/
docs/
  sources/
  decisions/
  QA/
```

مهاجرت باید تدریجی باشد؛ مسیرهای فعلی test logic حفظ شوند و فقط پس از سبز ماندن تست‌ها جابه‌جا شوند.

---

## 17) برنامه اجرایی مرحله‌به‌مرحله

### Gate 0 — Freeze و تصمیم منابع

- تعیین Source of Truth نهایی برای متن سؤال/گزینه‌ها: Markdown پیوست یا PDFهای FIXED
- تعیین متن نهایی مقیاس لیکرت
- تعیین canonical testVersion
- تعیین مقصد اولیه Join
- تأیید/اصلاح copy نتیجه و Purple Questها

**خروجی:** Decision record؛ هیچ تغییر test data پیش از آن.

### Phase 1 — Baseline و Technical Hygiene

1. ثبت snapshot/hashes منابع نهایی در `docs/sources`.
2. اصلاح lint و مهاجرت script به ESLint CLI.
3. همسان‌سازی Node/Tailwind/version docs با package واقعی.
4. تقویت Zod schema کامل result/progress.
5. افزودن regression test برای payload خراب و version mismatch.
6. تثبیت canonical route `/results` و redirect اختیاری `/result`.

**Gate:** lint + typecheck + 40+ unit + E2E + build همگی سبز.

### Phase 2 — Landing MVP

1. refactor صفحه `/` به ۱۲ section مصوب.
2. معرفی Purple VOID به‌عنوان محصول مستقل VIP.
3. اضافه‌کردن Problem، Inside VOID، How It Works، Baseline، Boundaries و Final CTA.
4. پیاده‌سازی visual مرکزی art-directed و responsive.
5. اضافه‌کردن `/terms` و `/disclaimer`.
6. metadata/canonical/structured content.

**Gate:** کاربر در 5 ثانیه موضوع، تفاوت و CTA تست را تشخیص دهد؛ Lighthouse و mobile QA.

### Phase 3 — Test UX Hardening

1. حفظ متن و scoring frozen.
2. افزودن exit guard فقط هنگام progress نیمه‌تمام.
3. بهبود mobile typography و sticky action area در صورت نیاز.
4. تست keyboard-only و screen-reader labels.
5. تست reload، Back/Next، تغییر پاسخ، storage failure و reduced motion.

**Gate:** هر ۳۵ پاسخ اجباری؛ refresh-safe؛ بدون scoring regression.

### Phase 4 — Result Experience

1. جداکردن ResultView به componentهای کوچک.
2. افزودن Strength، behavior under pressure، loss/profit response، behavioral risk و initial practice با copy تأییدشده.
3. نمایش Quest متناظر بدون ادعای درمان/سود.
4. افزودن share action و share card بدون PII.
5. افزودن Join CTA config-driven.
6. کوتاه‌سازی hierarchy موبایل و progressive disclosure برای جزئیات فنی.

**Gate:** نتیجه در اسکرین اول نوع پروفایل، confidence و قدم بعدی را روشن کند.

### Phase 5 — Conversion

1. ساخت `/join` با modeهای `waitlist | telegram | external | disabled`.
2. در صورت نبود backend، Telegram/external redirect یا فرم خارجی؛ از فرم نمایشی بدون ذخیره اجتناب شود.
3. اضافه‌کردن analytics no-op interface و provider انتخابی.
4. به‌روزرسانی Privacy با رفتار واقعی analytics.

**Gate:** CTA مقصد معتبر و قابل تغییر با config؛ eventها بدون داده حساس.

### Phase 6 — QA و Release

1. unit test همه آستانه‌ها و edgeها.
2. E2E دسکتاپ و موبایل برای landing → test → result → join.
3. keyboard, focus, contrast, reduced-motion و RTL audit.
4. viewportهای 360، 390، 768، 1024، 1440.
5. Chromium، Firefox و WebKit در CI.
6. Performance budget: تصاویر responsive، font subset، حداقل client JS و بدون layout shift.
7. بازبینی نهایی تمام claims و disclaimers.
8. فعال‌کردن indexing فقط پس از تأیید دامنه و محتوای نهایی.

**Release command gate:**

```text
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

---

## 18) Definition of Done

MVP زمانی آماده است که:

- Purple VOID در چند ثانیه به‌عنوان فضای تمرین رفتار معرفی شود.
- متن ۳۵ سؤال و scoring با منبع نهایی hash-verified باشد.
- تست mobile-first، RTL، keyboard-accessible و refresh-safe باشد.
- هیچ نتیجه ناقص یا payload نامعتبر نمایش داده نشود.
- تمام قواعد RawIndex، confidence، growth و shadow تست خودکار داشته باشند.
- Result یک insight مشخص، تمرین اولیه، disclaimer، share و CTA معتبر ارائه دهد.
- Landing همه مرزبندی‌های سیگنال/سود/درمان/مسئولیت را روشن کند.
- analytics در صورت فعال‌شدن پاسخ خام یا داده حساس نفرستد.
- lint، typecheck، unit، E2E و build همگی موفق باشند.
- نسخه موبایل overflow، target کوچک، متن فشرده یا motion اجباری نداشته باشد.

---

## 19) ترتیب پیشنهادی ادامه

بهترین ادامه، بازطراحی فوری scoring نیست. ابتدا Gate 0 بسته شود؛ سپس Technical Hygiene و Landing MVP اجرا شود. موتور امتیازدهی فعلی از نظر تست و build پایه خوبی دارد و باید حفظ شود. بیشترین شکاف محصول اکنون در معرفی Purple VOID، مسیر conversion، عمق نتیجه و انسجام منابع است، نه در فرمول اصلی محاسبه.
