import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <nav aria-label="ناوبری اصلی" className="header-nav">
          <Link href="/#how-it-works">روش کار</Link>
          <Link href="/#archetypes">آرکیتایپ‌ها</Link>
          <a href="/join">درخواست عضویت</a>
          <ThemeToggle />
          <a className="button button-small button-ghost" href="/test">شروع تست</a>
        </nav>
      </div>
    </header>
  );
}
