"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MEMBERSHIP_CONFIG,
  membershipPriceLabel,
} from "@/config/membership";
import { AXES } from "@/features/test/data/axes";
import { readResult } from "@/features/test/lib/storage";
import type { ScoredResult } from "@/features/test/types";
import { buildAdminMessage, buildTelegramAdminUrl } from "../validation";
import styles from "./membership-flow.module.css";

type CopyTarget = "wallet" | "message";
type CopyState = "idle" | "copied" | "failed";

function copyWithSelection(text: string): boolean {
  let textarea: HTMLTextAreaElement | null = null;
  try {
    textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea?.remove();
  }
}

const HANDOFF_STEPS = [
  "پرداخت را انجام بده.",
  "از تراکنش Screenshot بگیر.",
  "TxID / Transaction Hash را نگه دار.",
  "روی دکمه ادامه عضویت بزن.",
  "Screenshot و TxID را برای ادمین Purple VOID ارسال کن.",
] as const;

function resultLabel(result: ScoredResult | null): string | undefined {
  if (!result) return undefined;
  if (result.primaryAxis) {
    const axis = AXES[result.primaryAxis];
    return `${axis.persianName} — ${axis.englishName}`;
  }
  if (result.resultType === "balanced") return "پروفایل متعادل";
  if (result.resultType === "blended") return "پروفایل ترکیبی";
  return undefined;
}

export function MembershipFlow() {
  const [archetype, setArchetype] = useState<string>();
  const [ready, setReady] = useState(false);
  const [copyState, setCopyState] = useState<Record<CopyTarget, CopyState>>({
    wallet: "idle",
    message: "idle",
  });

  useEffect(() => {
    setArchetype(resultLabel(readResult()));
    setReady(true);
  }, []);

  const adminMessage = useMemo(() => buildAdminMessage(archetype), [archetype]);
  const telegramUrl = buildTelegramAdminUrl(MEMBERSHIP_CONFIG.telegramAdminUsername);

  async function copyText(target: CopyTarget, text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (!copyWithSelection(text)) {
        throw new Error("Clipboard unavailable");
      }
      setCopyState((current) => ({ ...current, [target]: "copied" }));
    } catch {
      setCopyState((current) => ({
        ...current,
        [target]: copyWithSelection(text) ? "copied" : "failed",
      }));
    }
  }

  return (
    <main className={styles.joinPage}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <span className={styles.eyebrow}>PURPLE VOID · PRIVATE MEMBERSHIP</span>
          <h1>عضویت در <span className={styles.brandName} dir="ltr">Purple VOID</span></h1>
          <p>
            Purple VOID یک فضای خصوصی برای تمرین، شناخت و اصلاح رفتار معاملاتی است.
            پس از پرداخت، عضویت توسط ادمین بررسی و نهایی می‌شود.
          </p>
          <div className={styles.heroMeta} aria-label="خلاصه مسیر عضویت">
            <span>پرداخت مستقیم</span>
            <span>بررسی دستی</span>
            <span>تکمیل در تلگرام</span>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.shell}>
          <div className={styles.checkoutGrid}>
            <article className={styles.paymentPanel} aria-labelledby="payment-title">
              <header className={styles.panelHeader}>
                <span>اطلاعات پرداخت</span>
                <h2 id="payment-title">پرداخت عضویت</h2>
                <p>{MEMBERSHIP_CONFIG.paymentGuide}</p>
              </header>

              <dl className={styles.paymentFacts}>
                <div>
                  <dt>هزینه عضویت</dt>
                  <dd>{membershipPriceLabel()}</dd>
                </div>
                <div>
                  <dt>ارز پرداخت</dt>
                  <dd dir="ltr">{MEMBERSHIP_CONFIG.currency}</dd>
                </div>
                <div>
                  <dt>شبکه</dt>
                  <dd dir="ltr">{MEMBERSHIP_CONFIG.network}</dd>
                </div>
              </dl>

              <div className={styles.walletBlock}>
                <div className={styles.walletHeading}>
                  <span>آدرس Wallet</span>
                  <span className={styles.ltrBadge} dir="ltr">{MEMBERSHIP_CONFIG.network}</span>
                </div>
                <code dir="ltr">{MEMBERSHIP_CONFIG.walletAddress}</code>
                <button
                  className={styles.copyButton}
                  type="button"
                  disabled={!ready}
                  onClick={() => copyText("wallet", MEMBERSHIP_CONFIG.walletAddress)}
                >
                  کپی آدرس
                </button>
                {copyState.wallet === "copied" ? <p className={styles.copySuccess} role="status">آدرس کپی شد</p> : null}
                {copyState.wallet === "failed" ? <p className={styles.copyError} role="alert">کپی خودکار انجام نشد؛ آدرس را دستی کپی کن.</p> : null}
              </div>

              <div className={styles.warningPanel}>
                <strong>قبل از انتقال، یک‌بار دیگر بررسی کن</strong>
                <p>فقط با ارز و شبکه‌ای که در این صفحه مشخص شده پرداخت کن. ارسال روی شبکه اشتباه ممکن است باعث از دست رفتن دارایی شود.</p>
                <p>هیچ‌کس از طرف Purple VOID نباید Seed Phrase یا Private Key تو را درخواست کند.</p>
              </div>
            </article>

            <aside className={styles.processPanel} aria-labelledby="after-payment-title">
              <span className={styles.eyebrow}>مسیر ادامه</span>
              <h2 id="after-payment-title">بعد از پرداخت چه کار کنم؟</h2>
              <ol>
                {HANDOFF_STEPS.map((step, index) => (
                  <li key={step}>
                    <span>{new Intl.NumberFormat("fa-IR").format(index + 1)}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
              <p className={styles.processNote}>رسید داخل سایت آپلود نمی‌شود؛ آن را مستقیماً در تلگرام برای ادمین بفرست.</p>
            </aside>
          </div>

          <section className={styles.handoffPanel} aria-labelledby="handoff-title">
            <div className={styles.handoffCopy}>
              <span className={styles.eyebrow}>آماده برای ارسال</span>
              <h2 id="handoff-title">متن برای ادمین</h2>
              <p>این متن را کپی کن، بخش‌های خالی را در تلگرام کامل کن و Screenshot پرداخت را هم بفرست.</p>
              {archetype ? <div className={styles.resultBadge}>نتیجه تست روی این مرورگر پیدا شد: <strong>{archetype}</strong></div> : null}
            </div>

            <div className={styles.messageBox}>
              <pre dir="rtl">{adminMessage}</pre>
              <button
                className={styles.copyButton}
                type="button"
                disabled={!ready}
                onClick={() => copyText("message", adminMessage)}
              >
                کپی متن برای ادمین
              </button>
              {copyState.message === "copied" ? <p className={styles.copySuccess} role="status">متن برای ادمین کپی شد</p> : null}
              {copyState.message === "failed" ? <p className={styles.copyError} role="alert">کپی خودکار انجام نشد؛ متن داخل کادر را دستی کپی کن.</p> : null}
            </div>

            <div className={styles.ctaBlock}>
              {telegramUrl ? (
                <a
                  className={styles.primaryButton}
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="telegram-handoff-note"
                >
                  پرداخت کردم — تکمیل عضویت
                </a>
              ) : null}
              <small id="telegram-handoff-note">
                مرحله نهایی عضویت توسط ادمین Purple VOID انجام می‌شود.
                <span className={styles.srOnly}> لینک تلگرام در پنجره جدید باز می‌شود.</span>
              </small>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
