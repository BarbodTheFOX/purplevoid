import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="Purple VOID، محصولی از ایونتوم اسپیس">
      <Image
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
    </Link>
  );
}
