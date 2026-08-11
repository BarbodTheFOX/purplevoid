/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native anchors avoid a Vinext RSC prefetch crash, and its image optimizer does not serve this local brand asset. */
export function BrandMark() {
  return (
    <a className="brand-mark" href="/" aria-label="Purple VOID، محصولی از ایونتوم اسپیس">
      <img
        className="brand-symbol"
        src="/brand/eventum-symbol-purple.png"
        alt=""
        width={536}
        height={640}
        aria-hidden="true"
      />
      <span className="brand-lockup">
        <strong dir="ltr">PURPLE VOID</strong>
        <span>از ایونتوم اسپیس</span>
      </span>
    </a>
  );
}
