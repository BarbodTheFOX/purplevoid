import type { Metadata } from "next";
import { MEMBERSHIP_CONFIG, isMembershipPaymentReady } from "@/config/membership";
import { MembershipFlow } from "@/features/membership/components/membership-flow";
import styles from "@/features/membership/components/membership-flow.module.css";

export const metadata: Metadata = {
  title: "عضویت در Purple VOID",
  description: "اطلاعات پرداخت و مسیر تکمیل عضویت خصوصی Purple VOID از طریق ادمین تلگرام.",
  robots: { index: false, follow: false },
};

export default function JoinPage() {
  if (!isMembershipPaymentReady(MEMBERSHIP_CONFIG)) {
    return (
      <main className={styles.joinPage}>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <span className={styles.eyebrow}>PURPLE VOID · PRIVATE MEMBERSHIP</span>
            <h1>
              عضویت در <span className={styles.brandName} dir="ltr">Purple VOID</span>
            </h1>
            <p>
              Purple VOID یک فضای خصوصی برای تمرین، شناخت و اصلاح رفتار معاملاتی است.
              پس از پرداخت، عضویت توسط ادمین بررسی و نهایی می‌شود.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.shell}>
            <div className={styles.unavailablePanel}>
              <span className={styles.eyebrow}>وضعیت عضویت</span>
              <h2>ثبت عضویت به‌زودی فعال می‌شود.</h2>
              <p>
                اطلاعات رسمی پرداخت هنوز کامل نشده است. به‌محض آماده‌شدن قیمت، شبکه، Wallet و راه ارتباطی ادمین،
                همین صفحه با مسیر کوتاه پرداخت و تکمیل عضویت در تلگرام فعال می‌شود.
              </p>
              <a className={styles.primaryButton} href="/test">انجام تست ۳۵ سؤالی</a>
              <small>تا زمان فعال‌شدن پرداخت، هیچ اطلاعات تماس یا مالی از تو دریافت نمی‌شود.</small>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <MembershipFlow />;
}
