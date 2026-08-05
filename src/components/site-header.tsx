import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <nav aria-label="ناوبری اصلی" className="header-nav">
          <a href="/methodology">روش‌شناسی</a>
          <a href="/privacy">حریم خصوصی</a>
          <a className="button button-small button-ghost" href="/test">شروع تست</a>
        </nav>
      </div>
    </header>
  );
}
