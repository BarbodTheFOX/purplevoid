import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <BrandMark />
          <p>Purple VOID یک تجربه آموزشی برای مشاهده و تمرین رفتار معامله‌گره؛ محصولی از EVENTUM SPACE.</p>
        </div>
        <nav aria-label="پیوندهای پایین صفحه">
          <a href="/methodology">روش‌شناسی تست</a>
          <a href="/privacy">حریم خصوصی</a>
          <a href="/#boundaries">مرزهای Purple VOID</a>
        </nav>
        <p className="footer-version">نسخه آزمایشی ۱.۱</p>
      </div>
    </footer>
  );
}
