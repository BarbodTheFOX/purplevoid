import type { Metadata } from "next";
import { MEMBERSHIP_CONFIG, isMembershipPaymentReady } from "@/config/membership";
import { MembershipFlow } from "@/features/membership/components/membership-flow";
import styles from "@/features/membership/components/membership-flow.module.css";

export const metadata: Metadata = {
  title: "درخواست عضویت",
  description: "وضعیت ثبت عضویت Purple VOID و مسیر آماده‌سازی پیش از ورود.",
  robots: { index: false, follow: false },
};

export default function JoinPage() {
  if (!isMembershipPaymentReady(MEMBERSHIP_CONFIG)) {
    return (
      <main className={styles.joinPage}>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <span className={styles.eyebrow}>قبل از ثبت درخواست</span>
            <h1>
              درخواست عضویت <span className={styles.brandName} dir="ltr">Purple VOID</span>
            </h1>
            <p>
              مسیر عضویت در حال آماده‌سازی نهایی است. تا وقتی قیمت، شرایط و راه ارتباطی رسمی کامل نشده باشند،
              از تو اطلاعات شخصی یا پرداخت دریافت نمی‌کنیم.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.shell}>
            <div className={`${styles.formPanel} ${styles.unavailablePanel}`}>
              <span className={styles.eyebrow}>وضعیت فعلی</span>
              <h2>ثبت عضویت هنوز فعال نشده</h2>
              <p>
                بعد از نهایی‌شدن شرایط عضویت، همین صفحه با اطلاعات شفاف و مسیر پرداخت امن فعال می‌شود.
                فعلاً می‌توانی تست رفتاری را انجام بدهی و نتیجه‌ات را روی همین مرورگر نگه داری.
              </p>
              <a className={styles.primaryButton} href="/test">انجام تست ۳۵ سؤالی</a>
              <small>در این مرحله هیچ اطلاعات تماس یا مالی از تو دریافت نمی‌شود.</small>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <MembershipFlow />;
}
