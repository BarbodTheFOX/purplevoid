"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LIKERT_OPTIONS, QUESTIONS } from "../data/questions";
import { eraseTestData, readProgress, saveProgress, saveResult } from "../lib/storage";
import { scoreTest } from "../logic/scoring";
import type {
  LikertValue,
  ScenarioOptionId,
  StoredProgress,
} from "../types";
import { formatPersianNumber } from "@/lib/format";

export function QuestionFlow() {
  const [progress, setProgress] = useState<StoredProgress | null>(null);
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");
  const questionLegendRef = useRef<HTMLLegendElement>(null);

  useEffect(() => {
    const stored = readProgress();
    if (!stored) {
      window.location.replace("/test");
      return;
    }
    const resumed = { ...stored, questionShownAt: Date.now() };
    if (!saveProgress(resumed)) {
      setStorageError("ذخیره خودکار در این مرورگر در دسترس نیست. پاسخ‌ها تا وقتی این صفحه باز است حفظ می‌شوند.");
    }
    setProgress(resumed);
  }, []);

  const currentQuestionIndex = progress?.currentQuestionIndex;

  useEffect(() => {
    if (currentQuestionIndex === undefined) return;
    questionLegendRef.current?.focus();
  }, [currentQuestionIndex]);

  const question = progress ? QUESTIONS[progress.currentQuestionIndex] : null;
  const selected = useMemo(() => {
    if (!progress || !question) return undefined;
    return question.kind === "likert"
      ? progress.answers.likert[question.id]
      : progress.answers.scenarios[question.id];
  }, [progress, question]);

  function updateProgress(updater: (current: StoredProgress) => StoredProgress) {
    if (!progress) return;
    const next = updater(progress);
    if (!saveProgress(next)) {
      setStorageError("ذخیره خودکار در این مرورگر در دسترس نیست. پاسخ‌ها تا وقتی این صفحه باز است حفظ می‌شوند.");
    } else {
      setStorageError("");
    }
    setProgress(next);
  }

  function selectAnswer(value: LikertValue | ScenarioOptionId) {
    if (!question) return;
    const now = Date.now();
    updateProgress((current) => {
      const hasTiming = current.responseTimestamps[question.id] !== undefined;
      const answers = question.kind === "likert"
        ? { ...current.answers, likert: { ...current.answers.likert, [question.id]: value as LikertValue } }
        : { ...current.answers, scenarios: { ...current.answers.scenarios, [question.id]: value as ScenarioOptionId } };
      return {
        ...current,
        answers,
        responseTimestamps: hasTiming
          ? current.responseTimestamps
          : { ...current.responseTimestamps, [question.id]: now },
        responseDurationsMs: hasTiming
          ? current.responseDurationsMs
          : { ...current.responseDurationsMs, [question.id]: Math.max(0, now - current.questionShownAt) },
      };
    });
    setError("");
  }

  function moveTo(index: number) {
    updateProgress((current) => ({
      ...current,
      currentQuestionIndex: index,
      questionShownAt: Date.now(),
    }));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (!progress || !question) return;
    if (selected === undefined) {
      setError("برای ادامه یک پاسخ انتخاب کن.");
      return;
    }
    if (progress.currentQuestionIndex < QUESTIONS.length - 1) {
      moveTo(progress.currentQuestionIndex + 1);
      return;
    }

    try {
      const result = scoreTest({
        answers: progress.answers,
        startTime: progress.startTime,
        endTime: Date.now(),
        responseDurationsMs: progress.responseDurationsMs,
        tradeCountRange: progress.tradeCountRange,
        tieBreakSeed: progress.tieBreakSeed,
        tieBreakOrder: progress.tieBreakOrder,
      });
      if (!saveResult(result)) {
        setStorageError("مرورگر اجازه ذخیره نتیجه را نمی‌دهد. فضای ذخیره‌سازی یا تنظیمات حریم خصوصی را بررسی کن و دوباره تلاش کن.");
        return;
      }
      window.location.assign("/results");
    } catch {
      setError("همه ۳۵ پاسخ باید کامل و معتبر باشند. لطفاً سؤال‌های قبلی را بررسی کن.");
    }
  }

  function restart() {
    if (!window.confirm("همه پاسخ‌ها و نتیجه ذخیره‌شده پاک شود و آزمون از ابتدا شروع شود؟")) return;
    eraseTestData();
    window.location.replace("/test");
  }

  if (!progress || !question) {
    return <div className="question-loading" role="status">در حال بازیابی آزمون…</div>;
  }

  const progressValue = ((progress.currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="question-shell">
      <div className="question-topline">
        <div>
          <span>سؤال {formatPersianNumber(question.id)} از ۳۵</span>
          <strong>{question.kind === "likert" ? "سؤال رفتاری" : "سؤال موقعیتی"}</strong>
        </div>
        <button className="restart-link" type="button" onClick={restart}>شروع دوباره</button>
      </div>
      <div className="progress-track" role="progressbar" aria-label="پیشرفت آزمون" aria-valuemin={1} aria-valuemax={35} aria-valuenow={question.id}>
        <span style={{ width: `${progressValue}%` }} />
      </div>

      <form className="question-card" onSubmit={(event) => { event.preventDefault(); next(); }}>
        <fieldset>
          <legend ref={questionLegendRef} tabIndex={-1}>
            <span className="question-number" aria-hidden="true">{formatPersianNumber(question.id).padStart(2, "۰")}</span>
            {question.text}
          </legend>

          {question.kind === "likert" ? (
            <div className="likert-grid">
              {LIKERT_OPTIONS.map((option) => (
                <label className={`answer-choice likert-choice ${selected === option.value ? "is-selected" : ""}`} key={option.value}>
                  <input
                    className="choice-input"
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={selected === option.value}
                    onChange={() => selectAnswer(option.value)}
                  />
                  <span className="choice-value">{formatPersianNumber(option.value)}</span>
                  <span className="choice-text">{option.label}</span>
                  <span className="choice-dot" aria-hidden="true" />
                </label>
              ))}
            </div>
          ) : (
            <div className="scenario-list">
              {question.options.map((option) => (
                <label className={`answer-choice scenario-choice ${selected === option.id ? "is-selected" : ""}`} key={option.id}>
                  <input
                    className="choice-input"
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={selected === option.id}
                    onChange={() => selectAnswer(option.id)}
                  />
                  <span className="scenario-letter" aria-hidden="true">{option.id}</span>
                  <span className="choice-text">{option.text}</span>
                  <span className="choice-dot" aria-hidden="true" />
                </label>
              ))}
            </div>
          )}
        </fieldset>

        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="question-actions">
          <button
            className="button button-subtle"
            type="button"
            disabled={progress.currentQuestionIndex === 0}
            onClick={() => moveTo(progress.currentQuestionIndex - 1)}
          >
            قبلی
          </button>
          <button className="button" type="submit" data-testid="next-question">
            {progress.currentQuestionIndex === QUESTIONS.length - 1 ? "ساخت نتیجه" : "سؤال بعدی"}
            <span aria-hidden="true">←</span>
          </button>
        </div>
      </form>

      {storageError ? (
        <p className="form-error" role="alert">{storageError}</p>
      ) : (
        <p className="autosave-note"><span aria-hidden="true">✓</span> پاسخ‌ها به‌صورت خودکار روی همین مرورگر ذخیره می‌شوند.</p>
      )}
    </div>
  );
}
