import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <BrandMark />
          <p>ابزاری آموزشی برای مشاهده الگوهای رفتاری اخیر در معامله‌گری.</p>
        </div>
        <nav aria-label="پیوندهای پایین صفحه">
          <Link href="/methodology">روش‌شناسی</Link>
          <Link href="/privacy">حریم خصوصی</Link>
        </nav>
        <p className="footer-version" dir="ltr">PV-BPI · BETA 1.1</p>
      </div>
    </footer>
  );
}
