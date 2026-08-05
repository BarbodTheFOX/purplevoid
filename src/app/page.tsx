import { AXES, AXIS_IDS } from "@/features/test/data/axes";

const dimensionDescriptions = {
  architect: "پایبندی به فرایند، شرایط ورود و خروج و ثبت اجرای واقعی.",
  oracle: "جدا کردن شواهد از برداشت و سنجیدن کیفیت تصمیم مستقل از نتیجه.",
  alchemist: "یادگیری از داده، تغییر کنترل‌شده و سازگاری بدون شتاب‌زدگی.",
  phantom: "مشاهده هیجان و ایجاد فاصله پیش از واکنش معاملاتی.",
  sovereign: "حفظ قوانین ریسک و خودتنظیمی، حتی زیر فشار و وسوسه.",
} as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">PV-BPI · BEHAVIORAL PROFILE</p>
            <h1>
              الگوی رفتاری‌ات را
              <span>وسط تصمیم ببین.</span>
            </h1>
            <p>
              یک آزمون ۳۵ سؤالی برای مشاهده پنج مهارت رفتاری در معامله‌گری؛
              نه برای ساختن یک هویت ثابت، بلکه برای پیدا کردن مسیر تمرین فعلی.
            </p>
            <div className="hero-actions">
              <a className="button" href="/test" data-testid="start-test">شروع تست</a>
              <a className="button button-subtle" href="/methodology">این تست چه چیزی می‌سنجد؟</a>
              <span className="hero-note">حدود ۸ تا ۱۲ دقیقه · بدون نیاز به ثبت‌نام</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="نمایش پنج محور رفتاری Purple VOID">
            {AXIS_IDS.map((axisId) => (
              <span className="visual-axis" key={axisId}>{AXES[axisId].englishName}</span>
            ))}
            <div className="orbit" aria-hidden="true" />
            <div className="visual-center" aria-hidden="true"><span>PURPLE<br />VOID</span></div>
            <div className="stat-strip">
              <div><strong>۳۵</strong><span>سؤال</span></div>
              <div><strong>۵</strong><span>محور</span></div>
              <div><strong>۱</strong><span>مسیر تمرین</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIVE BEHAVIORAL DIMENSIONS</p>
              <h2>پنج زاویه برای دیدن یک تصمیم</h2>
            </div>
            <p>هر محور یک مهارت قابل تمرین را نشان می‌دهد؛ نمره هیچ‌کدام تعریف دائمی تو نیست.</p>
          </div>
          <div className="dimension-grid">
            {AXIS_IDS.map((axisId, index) => (
              <article className="dimension-card" key={axisId}>
                <span className="dimension-index">0{index + 1}</span>
                <h3>{AXES[axisId].englishName}</h3>
                <strong>{AXES[axisId].persianName}</strong>
                <p>{dimensionDescriptions[axisId]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">READ THE RESULT CORRECTLY</p>
              <h2>برای مشاهده؛ نه برای برچسب‌زدن</h2>
            </div>
          </div>
          <div className="trust-grid">
            <article className="trust-card trust-card-featured">
              <span className="trust-icon">REFLECT</span>
              <h3>آموزشی و خودبازتابی</h3>
              <p>نتیجه نقطه شروعی برای دیدن رفتار اخیر و انتخاب تمرین بعدی است.</p>
            </article>
            <article className="trust-card">
              <span className="trust-icon">NOT CLINICAL</span>
              <h3>نه تشخیص روان‌شناختی</h3>
              <p>این ابزار جایگزین ارزیابی حرفه‌ای یا ادعای شخصیت دائمی نیست.</p>
            </article>
            <article className="trust-card">
              <span className="trust-icon">NOT ADVICE</span>
              <h3>نه توصیه مالی</h3>
              <p>پروفایل، سودآوری یا مناسب‌بودن هیچ سرمایه‌گذاری را پیش‌بینی نمی‌کند.</p>
            </article>
            <article className="trust-card">
              <span className="trust-icon">REPEATABLE</span>
              <h3>قابل تغییر در زمان</h3>
              <p>با تجربه و تمرین، پاسخ‌ها و نتیجه می‌توانند در بازآزمایی بعدی تغییر کنند.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
