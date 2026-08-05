import type { Metadata } from "next";
import { EraseDataButton } from "@/features/test/components/erase-data-button";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "نحوه ذخیره محلی پاسخ‌های آزمون Purple VOID.",
};

export default function PrivacyPage() {
  return (
    <section className="page-section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">PRIVACY · LOCAL FIRST</p>
          <h1>پاسخ‌ها روی دستگاه خودت می‌مانند.</h1>
          <p>نسخه فعلی حساب کاربری یا سرور پاسخ ندارد؛ داده آزمون فقط در فضای محلی همین مرورگر ذخیره می‌شود.</p>
        </div>
        <div className="content-stack">
          <article className="content-card">
            <h2>چه چیزی ذخیره می‌شود؟</h2>
            <ul>
              <li>پاسخ‌های خام ۳۵ سؤال و موقعیت فعلی آزمون</li>
              <li>زمان شروع، زمان پاسخ هر سؤال و بازه تعداد معامله</li>
              <li>نتیجه محاسبه‌شده و ترتیب ثابت شکستن تساوی</li>
            </ul>
          </article>
          <article className="content-card">
            <h2>چه چیزی درخواست نمی‌شود؟</h2>
            <p>نام، شماره تلفن، ایمیل، UID یا حساب شبکه اجتماعی درخواست نمی‌شود. تحلیل‌گر و ردیاب هم به‌صورت پیش‌فرض فعال نیست.</p>
          </article>
          <article className="content-card">
            <h2>کنترل در اختیار توست</h2>
            <p>با دکمه زیر می‌توانی پاسخ‌ها و نتیجه را از این مرورگر پاک کنی.</p>
            <EraseDataButton />
          </article>
        </div>
      </div>
    </section>
  );
}
