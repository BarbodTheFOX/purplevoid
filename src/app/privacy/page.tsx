import { EraseDataButton } from "@/features/test/components/erase-data-button";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "حریم خصوصی | Purple VOID",
  description: "نحوه ذخیره محلی پاسخ‌های آزمون Purple VOID.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="page-section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">PRIVACY · LOCAL FIRST</p>
          <h1>پاسخ‌ها روی دستگاه خودت می‌مانند.</h1>
          <p>نسخه فعلی حساب کاربری یا Backend ندارد. داده آزمون فقط در فضای محلی همین مرورگر ذخیره می‌شود و فرم عضویت تا زمان اتصال Backend، اطلاعات را فقط در حافظه همان صفحه نگه می‌دارد.</p>
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
            <h2>تفاوت تست و درخواست عضویت</h2>
            <p>برای انجام تست، نام، شماره تلفن یا حساب شبکه اجتماعی لازم نیست. در مسیر عضویت، نام یا نام مستعار و آیدی تلگرام برای تماس درخواست می‌شود؛ شماره تلفن اختیاری است. در نسخه فعلی این فرم هنوز به Backend متصل نیست و اطلاعات آن در LocalStorage ذخیره نمی‌شود.</p>
          </article>
          <article className="content-card">
            <h2>اطلاعات پرداخت</h2>
            <p>در مسیر پرداخت فقط TxID عمومی بلاک‌چین، مبلغ، شبکه، ارز و در صورت تمایل آدرس کیف پول مبدأ دریافت می‌شود. Purple VOID هیچ‌وقت Seed Phrase، Private Key یا کد دسترسی کیف پول را درخواست نمی‌کند.</p>
          </article>
          <article className="content-card">
            <h2>ماندگاری روی این مرورگر</h2>
            <p>داده آزمون تا وقتی خودت آن را پاک نکنی، داده‌های سایت را از تنظیمات مرورگر حذف نکنی یا مرورگر فضای ذخیره‌سازی را پاک نکند، روی همین مرورگر می‌ماند. اگر از دستگاه یا پروفایل مرورگر مشترک استفاده می‌کنی، افراد دیگری که به آن دسترسی دارند ممکن است نتیجه را ببینند؛ بعد از پایان کار داده‌ها را پاک کن.</p>
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
