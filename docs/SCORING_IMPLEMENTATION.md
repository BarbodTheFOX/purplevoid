# نگاشت قواعد PV-BPI 1.1 به کد

مرجع این سند `Purple_VOID_PV-BPI_v1.1_Scoring_System_FA_FIXED.pdf` است. تمام مقایسه‌ها با RawIndex صحیح انجام می‌شود و AxisScore فقط در UI گرد می‌شود.

| قاعده PDF | فایل / تابع |
|---|---|
| نگاشت مستقیم، معکوس و سناریوی هر محور | `src/features/test/data/axes.ts` / `AXES` |
| امتیاز ثابت A–E سناریوهای ۳۱ تا ۳۵ | `src/features/test/data/scenarios.ts` / `SCENARIO_SCORES` |
| اعتبارسنجی ۳۰ لیکرت، ۵ سناریو، زمان‌ها و seed | `logic/validation.ts` / `validateScoringInput` |
| معکوس‌سازی `6 - rawAnswer` | `logic/scoring-utils.ts` / `reverseScore` |
| LikertSum، ScenarioScore، RawAxis، RawIndex، AxisScore | `logic/scoring.ts` / `calculateAxis` |
| سطح مهارت چهارگانه | `logic/scoring-utils.ts` / `selectSkillLevel` |
| ترتیب تصادفی و پایدار تساوی | `logic/tie-break.ts` / `createTieBreakOrder`, `sortAxesByRawIndex` |
| BALANCED، BLENDED، PRIMARY_SUPPORT، DOMINANT با اولویت | `logic/result-type.ts` / `selectResultType` |
| یک یا دو مسیر رشد | `logic/result-type.ts` / `selectGrowthAxes` |
| زمان کل کمتر از ۱۵۰ ثانیه | `logic/quality.ts` / `calculateQualityFlags` (`fast_completion`) |
| بیش از ۲۰٪ آیتم زیر ۲ ثانیه | همان تابع (`fast_items`) |
| توالی ۸ پاسخ یا تکرار حداقل ۷۰٪ | همان تابع (`straight_lining`) |
| الگوی کاملاً ایدئال | همان تابع (`fully_ideal`) |
| پنج جفت کنترل و دست‌کم دو ناسازگاری | همان تابع (`internal_inconsistency`) |
| واگرایی سه محور | همان تابع (`self_report_scenario_divergence`) |
| کمتر از ۸ معامله | همان تابع (`low_experience`) |
| اطمینان معمول، متوسط و پایین | `logic/confidence.ts` / `selectConfidenceLevel` |
| متن استاندارد اطمینان پایین | `logic/confidence.ts` / `LOW_CONFIDENCE_MESSAGE` |
| پنج قاعده سایه، بیشترین gap، تساوی و LOW | `logic/shadow.ts` / `selectShadow` |
| ترتیب کامل اجرای الگوریتم و payload نهایی | `logic/scoring.ts` / `scoreTest` |

## تضمین‌های محاسباتی

- مقدار سناریو از شناسه A–E خوانده می‌شود و جای دیداری گزینه هیچ نقشی ندارد.
- داده ناقص یا شناسه ناشناخته `ScoringValidationError` می‌دهد و نتیجه ساخته نمی‌شود.
- AxisScore در payload غیرگرد باقی می‌ماند؛ `Math.round` فقط در `results-view.tsx` استفاده می‌شود.
- سایه بعد از تعیین اطمینان محاسبه می‌شود و در LOW همیشه `null` است.
- tie order هم در progress و هم در result ذخیره می‌شود و refresh آن را تغییر نمی‌دهد.

## پوشش تست

`scoring.test.ts` نگاشت‌ها، معکوس‌سازی، مینیمم/ماکزیمم، فرمول بدون گردکردن، داده ناقص و tie را پوشش می‌دهد. `rules.test.ts` هر چهار نوع نتیجه، یک/دو رشد، تک‌تک نشانه‌های کیفیت، سه سطح اطمینان، هر پنج سایه، انتخاب بیشترین gap، حذف تساوی و حذف LOW را پوشش می‌دهد. Playwright مسیر واقعی ۳۵ سؤال و پایداری نتیجه پس از refresh را بررسی می‌کند.
