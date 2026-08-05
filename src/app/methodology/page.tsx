import type { Metadata } from "next";
import { AXES, AXIS_IDS } from "@/features/test/data/axes";

export const metadata: Metadata = {
  title: "روش‌شناسی",
  description: "توضیح ساده پنج بُعد و محدودیت‌های PV-BPI نسخه ۱.۱ بتا.",
};

export default function MethodologyPage() {
  return (
    <section className="page-section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">METHODOLOGY · PV-BPI 1.1</p>
          <h1>این آزمون چه چیزی را مشاهده می‌کند؟</h1>
          <p>PV-BPI پنج مهارت رفتاری خودگزارش‌شده را در رفتار معاملاتی اخیر کنار هم می‌گذارد. خروجی آموزشی است و اثبات رفتار واقعی یا رتبه در جامعه معامله‌گران نیست.</p>
        </div>
        <div className="content-stack">
          {AXIS_IDS.map((axisId) => (
            <article className="content-card" key={axisId}>
              <p className="eyebrow">{AXES[axisId].englishName}</p>
              <h2>{AXES[axisId].persianName}</h2>
              <p>{AXES[axisId].competency}؛ مهارتی قابل تمرین که از پاسخ به شش موقعیت رفتاری و یک سناریو مشاهده می‌شود.</p>
            </article>
          ))}
          <article className="content-card">
            <h2>نمره را چطور بخوانی؟</h2>
            <p>نمودار، نمره نمایشی پنج محور را همراه با عدم قطعیت تقریبی ±۱۰ امتیاز نشان می‌دهد. اختلاف‌های کوچک به‌تنهایی برای ادعای غلبه یک آرکتایپ کافی نیستند.</p>
          </article>
          <article className="content-card">
            <h2>محدودیت</h2>
            <p>این نتیجه یک برچسب ثابت شخصیتی نیست. پروفایل تو نشان می دهد در رفتار معاملاتی اخیرت کدام مهارت ها فعال تر بوده اند و کدام بخش ها به تمرین بیشتری نیاز دارند.</p>
            <p>PV-BPI یک ابزار آموزشی و خودبازتابی است؛ جایگزین ارزیابی روان شناختی، پیش بینی عملکرد مالی یا توصیه سرمایه گذاری نیست. نسخه اختصاصی Purple VOID هنوز روی جامعه معامله گران فارسی زبان اعتبارسنجی کامل نشده است.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
