import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <nav aria-label="ناوبری اصلی" className="header-nav">
          <Link href="/methodology">روش‌شناسی</Link>
          <Link href="/privacy">حریم خصوصی</Link>
          <Link className="button button-small button-ghost" href="/test">شروع تست</Link>
        </nav>
      </div>
    </header>
  );
}
