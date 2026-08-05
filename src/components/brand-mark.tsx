import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="Purple VOID - صفحه اصلی">
      <span className="brand-glyph" aria-hidden="true">
        <span />
      </span>
      <span className="brand-name" dir="ltr">PURPLE VOID</span>
    </Link>
  );
}
