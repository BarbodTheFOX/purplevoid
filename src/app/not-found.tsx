/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid a Vinext production RSC prefetch crash. */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد | Purple VOID",
  description: "مسیر درخواستی در Purple VOID پیدا نشد.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">404 · VOID</p>
          <h1>این مسیر در خلأ گم شده.</h1>
          <p>صفحه‌ای که دنبالش بودی پیدا نشد. می‌توانی به صفحه اصلی برگردی یا تست رفتاری را شروع کنی.</p>
          <div className="hero-actions">
            <a className="button" href="/">بازگشت به صفحه اصلی</a>
            <a className="button button-ghost" href="/test">شروع تست</a>
          </div>
        </div>
      </div>
    </section>
  );
}
