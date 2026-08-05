"use client";

import { useEffect, useMemo, useState } from "react";
import { AXES, AXIS_IDS } from "../data/axes";
import {
  ARCHETYPE_INTERPRETATIONS,
  CONFIDENCE_COPY,
  RESULT_TYPE_COPY,
} from "../data/interpretations";
import { TEST_INTRO_COPY } from "../data/questions";
import { eraseTestData, readResult } from "../lib/storage";
import { LOW_CONFIDENCE_MESSAGE } from "../logic/confidence";
import { SKILL_LEVEL_LABELS } from "../logic/scoring-utils";
import { sortAxesByRawIndex } from "../logic/tie-break";
import type { AxisId, ScoredResult } from "../types";
import { formatPersianNumber } from "@/lib/format";
import { AxisRadar } from "./axis-radar";

export function ResultsView() {
  const [result, setResult] = useState<ScoredResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readResult();
    if (!stored) {
      window.location.replace("/test");
      return;
    }
    setResult(stored);
    setReady(true);
  }, []);

  const orderedAxes = useMemo(() => {
    if (!result) return [];
    const rawIndexes = Object.fromEntries(
      AXIS_IDS.map((axisId) => [axisId, result.axes[axisId].rawIndex]),
    ) as Record<AxisId, number>;
    return sortAxesByRawIndex(rawIndexes, result.tieBreakOrder);
  }, [result]);

  if (!ready || !result) {
    return <div className="question-loading" role="status">در حال بازیابی نتیجه…</div>;
  }

  const typeCopy = RESULT_TYPE_COPY[result.resultType];
  const confidenceCopy = CONFIDENCE_COPY[result.confidenceLevel];
  const activeFlags = result.qualityFlags.filter((flag) => flag.active);
  const featuredAxes = result.resultType === "balanced"
    ? []
    : [result.primaryAxis, result.secondAxis].filter(Boolean) as AxisId[];

  function restart() {
    if (!window.confirm("همه پاسخ‌ها و این نتیجه پاک شود و آزمون از ابتدا شروع شود؟")) return;
    eraseTestData();
    window.location.replace("/test");
  }

  return (
    <div className="results-shell">
      <section className="result-hero">
        <div className="result-hero-copy">
          <p className="eyebrow">YOUR PV-BPI PROFILE · BETA 1.1</p>
          <div className="result-badges">
            <span>{typeCopy.label}</span>
            <span className={`confidence-badge confidence-${result.confidenceLevel}`}>اطمینان {confidenceCopy.label}</span>
          </div>
          <h1>{typeCopy.title}</h1>
          {featuredAxes.length > 0 ? (
            <div className="featured-archetypes">
              {featuredAxes.map((axisId, index) => (
                <div key={axisId}>
                  <small>{index === 0 ? (result.resultType === "blended" ? "آرکتایپ اول" : "نیروی فعال") : (result.resultType === "blended" ? "آرکتایپ دوم" : "نیروی پشتیبان")}</small>
                  <strong dir="ltr">{AXES[axisId].englishName}</strong>
                  <span>{AXES[axisId].persianName}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="balanced-note">هیچ آرکتایپ منفردی غالب معرفی نمی‌شود.</p>
          )}
          <p className="result-description">{typeCopy.description}</p>
        </div>
        <AxisRadar axes={result.axes} />
      </section>

      <section className="result-section" aria-labelledby="confidence-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">CONFIDENCE</p>
            <h2 id="confidence-title">سطح اطمینان {confidenceCopy.label}</h2>
          </div>
          <span className={`confidence-orb confidence-${result.confidenceLevel}`}>{confidenceCopy.label}</span>
        </div>
        <div className="confidence-panel">
          <p>{result.confidenceLevel === "low" ? LOW_CONFIDENCE_MESSAGE : confidenceCopy.description}</p>
          {activeFlags.length > 0 ? (
            <details>
              <summary>{formatPersianNumber(activeFlags.length)} نشانه مؤثر بر سطح اطمینان</summary>
              <ul>{activeFlags.map((flag) => <li key={flag.id}>{flag.label}</li>)}</ul>
            </details>
          ) : (
            <span className="quality-clear">هیچ نشانه کیفیت پایین فعال نشد.</span>
          )}
        </div>
      </section>

      <section className="result-section" aria-labelledby="axes-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">FIVE AXES</p>
            <h2 id="axes-title">پنج مهارت در یک نگاه</h2>
          </div>
          <p>عدد نمایش‌داده‌شده گرد شده است؛ محاسبات با RawIndex صحیح انجام شده‌اند.</p>
        </div>
        <div className="axis-result-list">
          {orderedAxes.map((axisId, index) => {
            const axis = result.axes[axisId];
            const score = Math.round(axis.axisScore);
            const lower = Math.max(0, score - 10);
            const upper = Math.min(100, score + 10);
            return (
              <article className="axis-result-card" key={axisId}>
                <div className="axis-rank" aria-label={`رتبه نمایشی ${formatPersianNumber(index + 1)}`}>{formatPersianNumber(index + 1).padStart(2, "۰")}</div>
                <div className="axis-result-main">
                  <div className="axis-result-heading">
                    <div><strong dir="ltr">{AXES[axisId].englishName}</strong><span>{AXES[axisId].persianName}</span></div>
                    <div className="axis-score-number"><strong>{formatPersianNumber(score)}</strong><span>از ۱۰۰</span></div>
                  </div>
                  <div className="score-track" aria-label={`نمره ${formatPersianNumber(score)} با عدم قطعیت تقریبی مثبت و منفی ۱۰`}>
                    <span className="score-uncertainty" style={{ insetInlineStart: `${lower}%`, width: `${upper - lower}%` }} />
                    <span className="score-fill" style={{ width: `${score}%` }} />
                    <i style={{ insetInlineStart: `${score}%` }} />
                  </div>
                  <div className="axis-result-meta">
                    <span>{SKILL_LEVEL_LABELS[axis.skillLevel]}</span>
                    <small>عدم قطعیت نمایشی حدود ±۱۰</small>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="result-section" aria-labelledby="interpretation-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">INTERPRETATION</p>
            <h2 id="interpretation-title">این الگو چه چیزی برای مشاهده دارد؟</h2>
          </div>
        </div>
        <div className="interpretation-grid">
          {(featuredAxes.length > 0 ? featuredAxes : orderedAxes.slice(0, 2)).map((axisId) => (
            <article className="interpretation-card" key={axisId}>
              <span dir="ltr">{AXES[axisId].englishName}</span>
              <h3>{AXES[axisId].persianName}</h3>
              <p>{ARCHETYPE_INTERPRETATIONS[axisId].summary}</p>
              <div><strong>رفتار در فشار</strong><p>{ARCHETYPE_INTERPRETATIONS[axisId].pressure}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="result-section" aria-labelledby="growth-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">GROWTH PATH</p>
            <h2 id="growth-title">مسیر رشد فعلی</h2>
          </div>
          <p>{result.growthAxes.length === 2 ? "دو محور پایین نزدیک‌اند؛ هر دو مسیر رشد نمایش داده می‌شوند." : "پایین‌ترین محور، مسیر رشد فعلی است."}</p>
        </div>
        <div className="growth-grid">
          {result.growthAxes.map((axisId, index) => (
            <article className="growth-card" key={axisId}>
              <span className="growth-index">0{index + 1}</span>
              <div>
                <strong dir="ltr">{AXES[axisId].englishName}</strong>
                <h3>{AXES[axisId].persianName}</h3>
                <p>{ARCHETYPE_INTERPRETATIONS[axisId].growthPractice}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {result.shadow ? (
        <section className="result-section shadow-section" aria-labelledby="shadow-title">
          <div className="shadow-symbol" aria-hidden="true">◇</div>
          <div>
            <p className="eyebrow">POSSIBLE SHADOW</p>
            <h2 id="shadow-title" dir="ltr">{result.shadow.name}</h2>
            <p>{result.shadow.description}</p>
            <small>این یک احتمال آموزشی ناشی از ترکیب یک محور بالا و یک محور پایین است؛ نه تشخیص یا هویت ثابت.</small>
          </div>
        </section>
      ) : null}

      <section className="result-section retest-section">
        <div>
          <p className="eyebrow">RETEST</p>
          <h2>این نتیجه یک عکس از رفتار اخیر است.</h2>
          <p>آزمون را پس از ۳۰ روز یا حداقل ۲۰ معامله جدید تکرار کن. تغییر کمتر از ۳ واحد RawIndex، تقریباً ۱۱ نمره نمایشی، بدون تغییر معنادار گزارش می‌شود.</p>
        </div>
        <button className="button button-ghost" type="button" onClick={restart}>شروع آزمون جدید</button>
      </section>

      <section className="result-limitation">
        <h2>محدودیت نتیجه</h2>
        <p>این نتیجه یک برچسب ثابت شخصیتی نیست. پروفایل تو نشان می دهد در رفتار معاملاتی اخیرت کدام مهارت ها فعال تر بوده اند و کدام بخش ها به تمرین بیشتری نیاز دارند.</p>
        <p>PV-BPI یک ابزار آموزشی و خودبازتابی است؛ جایگزین ارزیابی روان شناختی، پیش بینی عملکرد مالی یا توصیه سرمایه گذاری نیست. نسخه اختصاصی Purple VOID هنوز روی جامعه معامله گران فارسی زبان اعتبارسنجی کامل نشده است.</p>
        <strong>{TEST_INTRO_COPY.ending[1]}</strong>
      </section>
    </div>
  );
}
