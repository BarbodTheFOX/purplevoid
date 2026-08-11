/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid a Vinext production RSC prefetch crash. */
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <BrandMark />
          <p>ابزار مشاهده و تمرین رفتار معامله‌گر؛ محصولی از EVENTUM SPACE.</p>
        </div>
        <nav aria-label="پیوندهای پایین صفحه">
          <a href="/methodology">روش‌شناسی تست</a>
          <a href="/privacy">حریم خصوصی</a>
          <a href="/join">درخواست عضویت</a>
          <a href="/#boundaries">مرزهای Purple VOID</a>
        </nav>
        <p className="footer-version">نسخه آزمایشی ۱.۱</p>
      </div>
    </footer>
  );
}
