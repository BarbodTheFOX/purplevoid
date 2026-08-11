/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid a Vinext production RSC prefetch crash. */
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <nav aria-label="ناوبری اصلی" className="header-nav">
          <a href="/#how-it-works">روش کار</a>
          <a href="/#archetypes">آرکیتایپ‌ها</a>
          <a href="/join">درخواست عضویت</a>
          <ThemeToggle />
          <a className="button button-small button-ghost" href="/test">شروع تست</a>
        </nav>
      </div>
    </header>
  );
}
