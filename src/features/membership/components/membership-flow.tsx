"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MEMBERSHIP_CONFIG,
  isConfigPlaceholder,
  isMembershipPaymentReady,
  membershipPriceLabel,
} from "@/config/membership";
import { readResult } from "@/features/test/lib/storage";
import type { MembershipStatus } from "../types";
import {
  buildAdminPaymentMessage,
  membershipApplicationSchema,
  normalizeTelegramUsername,
  paymentEvidenceSchema,
} from "../validation";
import styles from "./membership-flow.module.css";

type Step = "application" | "review" | "payment" | "handoff";
type FieldErrors = Record<string, string>;

type ApplicationForm = {
  displayName: string;
  telegramUsername: string;
  phone: string;
  archetype: string;
  experienceLevel: string;
  motivation: string;
  paymentMethod: "crypto";
  termsAccepted: boolean;
};

type PaymentForm = {
  transactionHash: string;
  currency: string;
  network: string;
  paidAmount: string;
  telegramUsername: string;
  senderWalletAddress: string;
  paymentNote: string;
};

const EXPERIENCE_LABELS: Record<string, string> = {
  learning: "در حال یادگیری یا بدون معامله واقعی",
  under_one_year: "کمتر از یک سال",
  one_to_three_years: "یک تا سه سال",
  over_three_years: "بیشتر از سه سال",
};

const ARCHETYPE_LABELS: Record<string, string> = {
  architect: "ARCHITECT — معمار فرایند",
  oracle: "ORACLE — تحلیلگر شواهد",
  alchemist: "ALCHEMIST — یادگیرنده منعطف",
  phantom: "PHANTOM — ناظر هیجان",
  sovereign: "SOVEREIGN — فرمانروای ریسک",
  balanced: "پروفایل متعادل",
  blended: "پروفایل ترکیبی",
  unknown: "هنوز تست را انجام نداده‌ام",
};

const STATUS_LABELS: Record<MembershipStatus, string> = {
  draft: "در حال تکمیل درخواست",
  submitted: "درخواست ثبت‌شده",
  waiting_for_payment: "در انتظار اطلاعات پرداخت",
  payment_submitted: "آماده ارسال برای بررسی",
  under_review: "در حال بررسی ادمین",
  approved: "تأییدشده",
  needs_correction: "نیازمند اصلاح",
  rejected: "ردشده",
};

const TERMS = [
  "Purple VOID کانال سیگنال نیست و هیچ سودی را تضمین نمی‌کند.",
  "مسئولیت تصمیم‌ها و معاملات با خود کاربر است.",
  "محتوا جایگزین روان‌درمانی یا مشاوره مالی نیست.",
  "دسترسی عضویت شخصی است و انتشار محتوای اختصاصی بدون اجازه مجاز نیست.",
  "فعال‌شدن عضویت به بررسی دستی پرداخت وابسته است.",
] as const;

function issuesToErrors(issues: readonly { path: PropertyKey[]; message: string }[]): FieldErrors {
  return Object.fromEntries(issues.map((issue) => [String(issue.path[0]), issue.message]));
}

function FieldError({ message }: { message?: string }) {
  return message ? <span className={styles.fieldError} role="alert">{message}</span> : null;
}

export function MembershipFlow() {
  const paymentReady = isMembershipPaymentReady(MEMBERSHIP_CONFIG);
  const priceLabel = membershipPriceLabel();
  const [step, setStep] = useState<Step>("application");
  const [status, setStatus] = useState<MembershipStatus>("draft");
  const [applicationErrors, setApplicationErrors] = useState<FieldErrors>({});
  const [paymentErrors, setPaymentErrors] = useState<FieldErrors>({});
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [application, setApplication] = useState<ApplicationForm>({
    displayName: "",
    telegramUsername: "",
    phone: "",
    archetype: "unknown",
    experienceLevel: "",
    motivation: "",
    paymentMethod: "crypto",
    termsAccepted: false,
  });
  const [payment, setPayment] = useState<PaymentForm>({
    transactionHash: "",
    currency: MEMBERSHIP_CONFIG.currency,
    network: MEMBERSHIP_CONFIG.network,
    paidAmount: MEMBERSHIP_CONFIG.price?.toString() ?? "",
    telegramUsername: "",
    senderWalletAddress: "",
    paymentNote: "",
  });

  useEffect(() => {
    const result = readResult();
    if (result) {
      const archetype = result.primaryAxis ?? (result.resultType === "balanced" ? "balanced" : result.resultType === "blended" ? "blended" : "unknown");
      setApplication((current) => ({ ...current, archetype }));
    }
    setReady(true);
  }, []);

  const adminMessage = useMemo(() => buildAdminPaymentMessage({
    displayName: application.displayName,
    telegramUsername: application.telegramUsername,
    archetype: application.archetype === "unknown" ? undefined : application.archetype,
    expectedAmountLabel: priceLabel,
    currency: MEMBERSHIP_CONFIG.currency,
    network: MEMBERSHIP_CONFIG.network,
    transactionHash: payment.transactionHash,
  }), [application, payment.transactionHash, priceLabel]);

  const telegramAdmin = normalizeTelegramUsername(MEMBERSHIP_CONFIG.telegramAdminUsername);
  const telegramUrl = !isConfigPlaceholder(MEMBERSHIP_CONFIG.telegramAdminUsername)
    ? `https://t.me/${encodeURIComponent(telegramAdmin)}`
    : null;

  function updateApplication<K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) {
    setApplication((current) => ({ ...current, [key]: value }));
    setApplicationErrors((current) => ({ ...current, [key]: "" }));
  }

  function reviewApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = membershipApplicationSchema.safeParse(application);
    if (!result.success) {
      setApplicationErrors(issuesToErrors(result.error.issues));
      return;
    }

    const telegramUsername = `@${result.data.telegramUsername}`;
    setApplication((current) => ({ ...current, ...result.data, telegramUsername }));
    setPayment((current) => ({ ...current, telegramUsername }));
    setApplicationErrors({});
    setStatus("submitted");
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueToPayment() {
    if (!paymentReady) return;
    setStatus("waiting_for_payment");
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!paymentReady || submitting) return;
    setSubmitting(true);
    const result = paymentEvidenceSchema.safeParse(payment);
    if (!result.success) {
      setPaymentErrors(issuesToErrors(result.error.issues));
      setSubmitting(false);
      return;
    }
    setPaymentErrors({});
    setPayment((current) => ({ ...current, paidAmount: String(result.data.paidAmount), telegramUsername: `@${result.data.telegramUsername}` }));
    setStatus("payment_submitted");
    setStep("handoff");
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className={styles.joinPage}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.eyebrow}>PURPLE VOID · MEMBERSHIP</span>
              <h1>درخواست عضویت Purple VOID</h1>
              <p>این مسیر برای ثبت درخواست و پرداخت دستی کریپتو طراحی شده است. قبل از هر واریز، اطلاعات را مرور می‌کنی و بعد از پرداخت، TxID را برای ادمین می‌فرستی.</p>
            </div>
            <ol className={styles.stepRail} aria-label="مراحل عضویت">
              <li className={step === "application" ? styles.activeStep : ""}><span>۱</span>اطلاعات اولیه</li>
              <li className={step === "review" ? styles.activeStep : ""}><span>۲</span>مرور درخواست</li>
              <li className={step === "payment" ? styles.activeStep : ""}><span>۳</span>پرداخت دستی</li>
              <li className={step === "handoff" ? styles.activeStep : ""}><span>۴</span>ارسال برای بررسی</li>
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.shell}>
          <div className={styles.statusBar} role="status">
            <span>وضعیت فعلی</span><strong>{STATUS_LABELS[status]}</strong>
            <small>تأیید یا رد نهایی فقط بعد از اتصال Backend و بررسی ادمین ثبت می‌شود.</small>
          </div>

          {step === "application" ? (
            <div className={styles.twoColumn}>
              <aside className={styles.contextPanel}>
                <span>قبل از فرم</span>
                <h2>عضویت قرار است چه چیزی به تو بدهد؟</h2>
                <ul>
                  <li>محتوای مرتبط با آرکیتایپ غالب</li>
                  <li>تمرین رفتاری و Reflection</li>
                  <li>Purple Quest و فایل‌های کاربردی</li>
                  <li>مرور دوره‌ای رفتار و بازآزمایی</li>
                </ul>
                <p>اگر هنوز تست را انجام نداده‌ای، می‌توانی فرم را ثبت کنی؛ اما نتیجه تست کمک می‌کند مسیر مرتبط‌تری را شروع کنی.</p>
                <a href="/test">انجام تست ۳۵ سؤالی</a>
              </aside>

              <form className={styles.formPanel} onSubmit={reviewApplication} noValidate>
                <header><span>مرحله ۱</span><h2>اطلاعات اولیه</h2><p>فقط اطلاعاتی را می‌گیریم که برای تماس و بررسی درخواست لازم است.</p></header>
                <div className={styles.formGrid}>
                  <label>
                    <span>نام یا نام مستعار <b>*</b></span>
                    <input aria-invalid={Boolean(applicationErrors.displayName)} value={application.displayName} onChange={(event) => updateApplication("displayName", event.target.value)} />
                    <FieldError message={applicationErrors.displayName} />
                  </label>
                  <label>
                    <span>آیدی تلگرام <b>*</b></span>
                    <input dir="ltr" placeholder="@username" aria-invalid={Boolean(applicationErrors.telegramUsername)} value={application.telegramUsername} onChange={(event) => updateApplication("telegramUsername", event.target.value)} />
                    <FieldError message={applicationErrors.telegramUsername} />
                  </label>
                  <label>
                    <span>شماره تماس <small>اختیاری</small></span>
                    <input dir="ltr" inputMode="tel" value={application.phone} onChange={(event) => updateApplication("phone", event.target.value)} />
                  </label>
                  <label>
                    <span>نتیجه آرکیتایپ</span>
                    <select value={application.archetype} onChange={(event) => updateApplication("archetype", event.target.value)}>
                      {Object.entries(ARCHETYPE_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className={styles.fullField}>
                    <span>سطح تجربه در ترید <b>*</b></span>
                    <select aria-invalid={Boolean(applicationErrors.experienceLevel)} value={application.experienceLevel} onChange={(event) => updateApplication("experienceLevel", event.target.value)}>
                      <option value="">انتخاب کن</option>
                      {Object.entries(EXPERIENCE_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                    <FieldError message={applicationErrors.experienceLevel} />
                  </label>
                  <label className={styles.fullField}>
                    <span>چرا به عضویت علاقه داری؟ <small>اختیاری</small></span>
                    <textarea rows={4} maxLength={600} value={application.motivation} onChange={(event) => updateApplication("motivation", event.target.value)} />
                  </label>
                </div>

                <div className={styles.termsBox}>
                  <h3>قوانین عضویت</h3>
                  <ul>{TERMS.map((term) => <li key={term}>{term}</li>)}</ul>
                  <p>سیاست بازپرداخت: <code>{MEMBERSHIP_CONFIG.refundPolicy}</code></p>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" checked={application.termsAccepted} onChange={(event) => updateApplication("termsAccepted", event.target.checked)} />
                    <span>Purple VOID کانال سیگنال نیست و قوانین عضویت را خوانده‌ام و می‌پذیرم. <b>*</b></span>
                  </label>
                  <FieldError message={applicationErrors.termsAccepted} />
                </div>

                <button className={styles.primaryButton} type="submit" disabled={!ready}>بررسی اطلاعات</button>
              </form>
            </div>
          ) : null}

          {step === "review" ? (
            <div className={styles.reviewLayout}>
              <div className={styles.reviewPanel}>
                <header><span>مرحله ۲</span><h2>قبل از پرداخت، اطلاعاتت را مرور کن</h2><p>در این نسخه اطلاعات هنوز برای Backend ارسال نمی‌شود و فقط در حافظه همین صفحه قرار دارد.</p></header>
                <dl>
                  <div><dt>نام</dt><dd>{application.displayName}</dd></div>
                  <div><dt>تلگرام</dt><dd dir="ltr">{application.telegramUsername}</dd></div>
                  <div><dt>آرکیتایپ</dt><dd>{ARCHETYPE_LABELS[application.archetype]}</dd></div>
                  <div><dt>تجربه</dt><dd>{EXPERIENCE_LABELS[application.experienceLevel]}</dd></div>
                  <div><dt>روش پرداخت</dt><dd>کریپتو · بررسی دستی</dd></div>
                </dl>
                <button className={styles.secondaryButton} type="button" onClick={() => setStep("application")}>بازگشت و اصلاح اطلاعات</button>
              </div>

              <aside className={styles.paymentSummary}>
                <span>اطلاعات پرداخت</span>
                <div><small>مبلغ</small><strong>{priceLabel}</strong></div>
                <div><small>ارز</small><strong dir="ltr">{MEMBERSHIP_CONFIG.currency}</strong></div>
                <div><small>شبکه</small><strong dir="ltr">{MEMBERSHIP_CONFIG.network}</strong></div>
                {!paymentReady ? <p className={styles.pendingAlert}>اطلاعات پرداخت هنوز نهایی نشده است. فعلاً واریزی انجام نده.</p> : null}
                <button className={styles.primaryButton} type="button" disabled={!paymentReady} onClick={continueToPayment}>ادامه برای پرداخت</button>
              </aside>
            </div>
          ) : null}

          {step === "payment" ? (
            <div className={styles.paymentLayout}>
              <div className={styles.walletPanel}>
                <header><span>مرحله ۳</span><h2>پرداخت دستی با کریپتو</h2><p>{MEMBERSHIP_CONFIG.paymentGuide}</p></header>
                <div className={styles.paymentFacts}>
                  <div><small>مبلغ دقیق</small><strong>{priceLabel}</strong></div>
                  <div><small>ارز</small><strong dir="ltr">{MEMBERSHIP_CONFIG.currency}</strong></div>
                  <div><small>شبکه</small><strong dir="ltr">{MEMBERSHIP_CONFIG.network}</strong></div>
                </div>
                <div className={styles.walletAddress}>
                  <span>آدرس کیف پول</span>
                  <code dir="ltr">{MEMBERSHIP_CONFIG.walletAddress}</code>
                  <button type="button" onClick={() => copyText(MEMBERSHIP_CONFIG.walletAddress)}>کپی آدرس کیف پول</button>
                </div>
                <ul className={styles.warnings}>
                  <li>فقط از شبکه‌ای که در این صفحه نوشته شده استفاده کن.</li>
                  <li>ارسال از شبکه اشتباه ممکن است باعث ازدست‌رفتن دارایی شود.</li>
                  <li>هزینه شبکه بر عهده پرداخت‌کننده است و فقط ارز و شبکه مشخص‌شده پذیرفته می‌شود.</li>
                  <li>قبل از واریز، آدرس کیف پول و شبکه را دوباره بررسی کن.</li>
                  <li>هیچ‌کس از طرف Purple VOID نباید Seed Phrase یا Private Key تو را درخواست کند.</li>
                </ul>
              </div>

              <form className={styles.formPanel} onSubmit={submitPayment} noValidate>
                <header><span>بعد از واریز</span><h2>اطلاعات تراکنش</h2><p>TxID را نگه دار. این فرم تراکنش را روی شبکه تأیید نمی‌کند؛ اطلاعات برای بررسی دستی آماده می‌شود.</p></header>
                <div className={styles.formGrid}>
                  <label className={styles.fullField}><span>Transaction Hash / TxID <b>*</b></span><input dir="ltr" value={payment.transactionHash} onChange={(event) => setPayment((current) => ({ ...current, transactionHash: event.target.value }))} /><FieldError message={paymentErrors.transactionHash} /></label>
                  <label><span>ارز پرداختی <b>*</b></span><input dir="ltr" readOnly value={payment.currency} /></label>
                  <label><span>شبکه <b>*</b></span><input dir="ltr" readOnly value={payment.network} /></label>
                  <label><span>مبلغ ارسال‌شده <b>*</b></span><input dir="ltr" inputMode="decimal" value={payment.paidAmount} onChange={(event) => setPayment((current) => ({ ...current, paidAmount: event.target.value }))} /><FieldError message={paymentErrors.paidAmount} /></label>
                  <label><span>آیدی تلگرام <b>*</b></span><input dir="ltr" value={payment.telegramUsername} onChange={(event) => setPayment((current) => ({ ...current, telegramUsername: event.target.value }))} /><FieldError message={paymentErrors.telegramUsername} /></label>
                  <label className={styles.fullField}><span>آدرس کیف پول مبدأ <small>اختیاری</small></span><input dir="ltr" value={payment.senderWalletAddress} onChange={(event) => setPayment((current) => ({ ...current, senderWalletAddress: event.target.value }))} /></label>
                  <label className={styles.fullField}><span>توضیحات <small>اختیاری</small></span><textarea rows={3} maxLength={500} value={payment.paymentNote} onChange={(event) => setPayment((current) => ({ ...current, paymentNote: event.target.value }))} /></label>
                </div>
                <button className={styles.primaryButton} type="submit" disabled={submitting}>{submitting ? "در حال بررسی فرم…" : "ثبت اطلاعات تراکنش"}</button>
              </form>
            </div>
          ) : null}

          {step === "handoff" ? (
            <div className={styles.handoffPanel}>
              <header><span>مرحله ۴</span><h2>اطلاعات پرداخت آماده شد</h2><p>اطلاعات پرداخت آماده شد. آن را برای ادمین ارسال کن تا تراکنش بررسی شود. این پیام به معنی تأیید پرداخت نیست.</p></header>
              <pre dir="rtl">{adminMessage}</pre>
              <div className={styles.handoffActions}>
                <button className={styles.primaryButton} type="button" onClick={() => copyText(adminMessage)}>کپی اطلاعات پرداخت</button>
                {telegramUrl ? <a className={styles.secondaryButton} href={telegramUrl} target="_blank" rel="noopener noreferrer">بازکردن تلگرام ادمین</a> : <button className={styles.secondaryButton} type="button" disabled>بازکردن تلگرام ادمین</button>}
              </div>
              {copyState === "copied" ? <p role="status">اطلاعات کپی شد. حالا تلگرام ادمین را باز کن و متن را بفرست.</p> : null}
              {copyState === "failed" ? <p role="alert">کپی خودکار انجام نشد؛ متن داخل کادر را دستی کپی کن.</p> : null}
              <div className={styles.securityNote}><strong>یادآوری امنیتی</strong><span>Seed Phrase، Private Key یا کدهای دسترسی کیف پولت را برای هیچ‌کس ارسال نکن.</span></div>
            </div>
          ) : null}

          <div className={styles.integrationNote}>
            <strong>وضعیت فنی این نسخه</strong>
            <p>ثبت دائمی درخواست، آپلود رسید، بررسی On-chain و تغییر وضعیت توسط ادمین هنوز به Backend یا Supabase متصل نشده‌اند. هیچ اطلاعات فرم در LocalStorage یا Console ذخیره نمی‌شود.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
