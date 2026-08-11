"use client";

import { useEffect, useState } from "react";
import { LIKERT_OPTIONS } from "../data/questions";
import {
  eraseTestData,
  readProgress,
  readResult,
  saveProgress,
} from "../lib/storage";
import { createTieBreakOrder, createTieBreakSeed } from "../logic/tie-break";
import type { StoredProgress, TradeCountRange } from "../types";

const TRADE_OPTIONS: readonly {
  value: TradeCountRange;
  label: string;
  note: string;
}[] = [
  { value: "zero", label: "۰ معامله", note: "پروفایل فرضی" },
  { value: "one_to_seven", label: "۱ تا ۷ معامله", note: "رفتار ۹۰ روز اخیر" },
  { value: "eight_to_fourteen", label: "۸ تا ۱۴ معامله", note: "رفتار ۹۰ روز اخیر" },
  { value: "fifteen_plus", label: "۱۵ معامله یا بیشتر", note: "رفتار ۶۰ روز اخیر" },
];

export function TestIntroForm() {
  const [tradeRange, setTradeRange] = useState<TradeCountRange | null>(null);
  const [progress, setProgress] = useState<StoredProgress | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    setProgress(readProgress());
    setHasResult(Boolean(readResult()));
    setReady(true);
  }, []);

  function beginTest() {
    if (!tradeRange) return;
    if ((progress || hasResult) && !window.confirm("داده آزمون قبلی پاک شود و آزمون از ابتدا شروع شود؟")) {
      return;
    }

    eraseTestData();
    const now = Date.now();
    const tieBreakSeed = createTieBreakSeed();
    const nextProgress: StoredProgress = {
      testVersion: "beta-1.1-BPI-PV",
      algorithmVersion: "1.1",
      answers: { likert: {}, scenarios: {} },
      currentQuestionIndex: 0,
      startTime: now,
      questionShownAt: now,
      responseTimestamps: {},
      responseDurationsMs: {},
      tradeCountRange: tradeRange,
      tieBreakSeed,
      tieBreakOrder: createTieBreakOrder(tieBreakSeed),
    };
    if (!saveProgress(nextProgress)) {
      setStorageError("مرورگر اجازه ذخیره آزمون را نمی‌دهد. فضای ذخیره‌سازی یا تنظیمات حریم خصوصی مرورگر را بررسی کن و دوباره تلاش کن.");
      return;
    }
    setStorageError("");
    window.location.assign("/test/questions");
  }

  return (
    <div className="test-layout" data-testid="test-intro" data-ready={ready ? "true" : "false"}>
      {ready && (progress || hasResult) ? (
        <aside className="resume-banner" aria-label="آزمون ذخیره‌شده">
          <div>
            <strong>{hasResult ? "نتیجه ذخیره‌شده داری" : "آزمون نیمه‌تمام پیدا شد"}</strong>
            <p>{hasResult ? "می‌توانی نتیجه قبلی را دوباره ببینی یا از ابتدا شروع کنی." : "پیشرفت قبلی در همین مرورگر ذخیره شده است."}</p>
          </div>
          <button
            className="button button-small button-ghost"
            type="button"
            onClick={() => window.location.assign(hasResult ? "/results" : "/test/questions")}
          >
            {hasResult ? "دیدن نتیجه" : "ادامه آزمون"}
          </button>
        </aside>
      ) : null}

      <section className="test-card" aria-labelledby="trade-count-title">
        <div className="step-label">مرحله ۱ از ۲</div>
        <h2 id="trade-count-title">اخیراً چند معامله واقعی داشتی؟</h2>
        <p className="card-lead">این پاسخ فقط برای انتخاب بازه یادآوری و تعیین سطح اطمینان نتیجه استفاده می‌شود.</p>
        <fieldset className="trade-options">
          <legend className="sr-only">تعداد معامله واقعی</legend>
          {TRADE_OPTIONS.map((option) => (
            <label className={`trade-option ${tradeRange === option.value ? "is-selected" : ""}`} key={option.value}>
              <input
                type="radio"
                name="trade-count"
                value={option.value}
                checked={tradeRange === option.value}
                onChange={() => setTradeRange(option.value)}
              />
              <span><strong>{option.label}</strong><small>{option.note}</small></span>
              <i aria-hidden="true" />
            </label>
          ))}
        </fieldset>
        {tradeRange ? (
          <p className="recall-guidance" role="status">
            {tradeRange === "zero"
              ? "بدون معامله واقعی، آزمون یک پروفایل فرضی با سطح اطمینان پایین می‌سازد."
              : tradeRange === "fifteen_plus"
                ? "هنگام پاسخ، رفتار واقعی خودت در ۶۰ روز اخیر را در نظر بگیر."
                : "هنگام پاسخ، رفتار واقعی خودت در ۹۰ روز اخیر را در نظر بگیر."}
          </p>
        ) : null}
      </section>

      <section className="test-card" aria-labelledby="scale-title">
        <div className="step-label">مرحله ۲ از ۲</div>
        <h2 id="scale-title">گزینه های پاسخ سؤال های ۱ تا ۳۰</h2>
        <div className="scale-preview" role="list">
          {LIKERT_OPTIONS.map((option) => (
            <div role="listitem" key={option.value}>
              <strong>{option.value.toLocaleString("fa-IR")}</strong>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
        <p className="answer-reminder">جوابی رو انتخاب کن که به رفتار واقعی تو نزدیک تره؛ نه رفتاری که فکر می کنی درست تره.</p>
      </section>

      {storageError ? <p className="form-error" role="alert">{storageError}</p> : null}

      <div className="test-start-row">
        <button className="button" type="button" disabled={!tradeRange} onClick={beginTest} data-testid="begin-questions">
          ورود به سؤال‌ها
          <span aria-hidden="true">←</span>
        </button>
        <span>پاسخ‌ها فقط روی همین مرورگر ذخیره می‌شوند.</span>
      </div>
    </div>
  );
}
