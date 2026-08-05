import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <nav aria-label="ناوبری اصلی" className="header-nav">
          <a href="/#what-is-void">Purple VOID چیست؟</a>
          <a href="/#archetypes">آرکیتایپ‌ها</a>
          <a href="/#inside-void">داخل وُید</a>
          <ThemeToggle />
          <a className="button button-small button-ghost" href="/test">شروع تست</a>
        </nav>
      </div>
    </header>
  );
}
