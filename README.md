# Purple VOID PV-BPI 1.1

وب‌اپلیکیشن فارسی RTL برای آزمون ۳۵ سؤالی پروفایل رفتاری معامله‌گر Purple VOID. نسخه فعلی بدون حساب کاربری یا بک‌اند کار می‌کند و پیشرفت و نتیجه را فقط در LocalStorage مرورگر نگه می‌دارد.

## پیش‌نیاز

- Node.js 20.11 یا جدیدتر
- npm 10 یا جدیدتر

## نصب و اجرا

```bash
npm install
cp .env.example .env.local
npm run dev
```

برنامه به‌صورت پیش‌فرض روی `http://localhost:3000` اجرا می‌شود.

## فرمان‌ها

```bash
npm run dev       # توسعه
npm run lint      # ESLint / Next.js
npm run typecheck # TypeScript strict
npm test          # Vitest unit suite
npm run test:e2e  # Playwright end-to-end
npm run build     # production build
npm run start     # اجرای build تولید
```

برای اولین اجرای Playwright ممکن است لازم باشد مرورگر Chromium نصب شود:

```bash
npx playwright install chromium
```

## مسیرها

- `/` صفحه معرفی
- `/test` انتخاب حجم تجربه و راهنمای پاسخ
- `/test/questions` جریان ۳۵ سؤال
- `/results` نتیجه ذخیره‌شده
- `/methodology` توضیح پنج محور و محدودیت‌ها
- `/privacy` سیاست ذخیره محلی و پاک‌کردن داده
- `/join` درخواست عضویت، مرور اطلاعات و پرداخت دستی کریپتو

## حریم خصوصی و ایندکس

هیچ داده‌ای به سرور ارسال نمی‌شود. کلیدهای نسخه‌بندی‌شده LocalStorage پاسخ‌ها، زمان‌ها، seed شکستن تساوی و نتیجه را نگه می‌دارند. صفحه حریم خصوصی امکان حذف هر دو کلید را دارد.

تا وقتی `NEXT_PUBLIC_ALLOW_INDEXING=true` تنظیم نشده باشد، metadata همه deploymentها را `noindex, nofollow` اعلام می‌کند. تحلیل‌گر و tracker نیز در MVP وجود ندارد؛ متغیر `NEXT_PUBLIC_ANALYTICS_ENABLED` صرفاً رزرو شده و پیش‌فرض آن `false` است.

## استقرار

هر میزبان سازگار با Next.js Node runtime قابل استفاده است:

1. `npm ci`
2. `npm run build`
3. `npm run start`

برای انتشار نهایی عمومی، پس از تکمیل بازبینی محصول، `NEXT_PUBLIC_ALLOW_INDEXING=true` را در محیط تولید تنظیم کنید.

## تنظیمات عضویت و پرداخت

قیمت، ارز، شبکه، آدرس کیف پول، آیدی ادمین و سیاست بازپرداخت فقط در فایل زیر تنظیم می‌شوند:

```text
src/config/membership.ts
```

تا قبل از جایگزینی Placeholderها و فعال‌کردن `enabled`، رابط پرداخت عمداً غیرفعال می‌ماند و از کاربر می‌خواهد واریزی انجام ندهد. ثبت دائمی درخواست و وضعیت بررسی نیز به Backend یا Supabase نیاز دارد.

## منابع و اسناد

- `docs/Purple_VOID_35_Question_Test_FA_FIXED.pdf` — متن تغییرناپذیر سؤال‌ها و گزینه‌ها
- `docs/Purple_VOID_PV-BPI_v1.1_Scoring_System_FA_FIXED.pdf` — قواعد تغییرناپذیر امتیازدهی
- `docs/IMPLEMENTATION_CHECKLIST.md` — چک‌لیست پذیرش
- `docs/ARCHITECTURE.md` — معماری و جریان داده
- `docs/SCORING_IMPLEMENTATION.md` — نگاشت قواعد PDF به توابع

نسخه آزمون: `beta-1.1-BPI-PV`  
نسخه الگوریتم: `1.1`
