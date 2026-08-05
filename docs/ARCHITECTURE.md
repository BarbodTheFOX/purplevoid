# معماری Purple VOID PV-BPI

## نمای کلی

برنامه با Next.js App Router، React 19، TypeScript strict و Tailwind CSS 4 ساخته شده است. هیچ API، دیتابیس، حساب کاربری یا tracker در نسخه MVP وجود ندارد. تمام محاسبات داخل مرورگر و تمام داده‌های کاربر در LocalStorage همان مرورگر باقی می‌ماند.

## مرزبندی لایه‌ها

```text
src/
  app/                         routes, metadata, shared layout
  components/                  shared brand/header/footer
  features/test/
    data/                      immutable questions, axes, scenarios, copy
    logic/                     pure deterministic scoring functions
    lib/storage.ts             versioned LocalStorage boundary
    components/                client test and result experiences
    types.ts                   strict domain and stored-payload types
  lib/format.ts                Persian number formatting
```

داده محتوایی از منطق امتیازدهی جداست. کامپوننت React هیچ وزن یا آستانه‌ای را محاسبه نمی‌کند؛ `scoreTest` تنها نقطه orchestration موتور است.

## جریان آزمون

1. `/test` بازه تعداد معامله را می‌گیرد و یک seed تصادفی و ترتیب tie-break سطح نشست می‌سازد.
2. payload پیشرفت با نسخه آزمون و الگوریتم در LocalStorage ذخیره می‌شود.
3. `/test/questions` یک سؤال را در هر صفحه نشان می‌دهد. انتخاب هر پاسخ فوراً پاسخ خام، timestamp و مدت پاسخ اول را ذخیره می‌کند.
4. Back/Next فقط اندیس فعلی و زمان نمایش سؤال بعدی را تغییر می‌دهد.
5. بعد از سؤال ۳۵، `scoreTest` کامل‌بودن هر ۳۵ پاسخ و زمان را اعتبارسنجی می‌کند.
6. نتیجه مشتق‌شده همراه ورودی خام، نسخه‌ها و tie-break ذخیره می‌شود.
7. `/results` نتیجه ذخیره‌شده را می‌خواند؛ refresh هیچ محاسبه یا tie جدیدی ایجاد نمی‌کند.

## پایداری و نسخه‌بندی

کلیدهای LocalStorage شامل نسخه بتا هستند. schema خواندن، payload با نسخه یا ساختار ناسازگار را رد می‌کند. نتیجه تمام فیلدهای لازم برای بازپردازش و ممیزی را دارد: پاسخ خام، زمان‌ها، RawIndex، LikertIndex، ScenarioScore، AxisScore غیرگرد، نشانه‌های کیفیت، اطمینان، نوع نتیجه، مسیر رشد، سایه و tie-break.

## دسترس‌پذیری

- سند `lang="fa"` و `dir="rtl"` دارد و labelهای انگلیسی با `dir="ltr"` جدا شده‌اند.
- سؤال‌ها با `fieldset/legend` و گزینه‌ها با radio واقعی پیاده شده‌اند.
- focus قابل مشاهده، skip link، progressbar معنایی و هدف لمسی حداقل ۴۴px وجود دارد.
- اطلاعات نمودار در `aria-label` متنی و کارت‌های عددی تکرار می‌شود؛ رنگ تنها حامل اطلاعات نیست.
- CSS حرکت را در `prefers-reduced-motion` غیرفعال می‌کند.

## امنیت و حریم خصوصی

هیچ PII درخواست نمی‌شود. LocalStorage مرز داده است؛ کاربر می‌تواند از `/privacy` یا شروع دوباره کل داده آزمون را حذف کند. metadata پیش‌فرض previewها را noindex می‌کند.
