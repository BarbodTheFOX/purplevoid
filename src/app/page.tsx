import Image from "next/image";
import { AXES, AXIS_IDS } from "@/features/test/data/axes";
import { buildPageMetadata } from "@/lib/page-metadata";
import { LandingMotion } from "./landing-motion";
import styles from "./landing.module.css";

export const metadata = buildPageMetadata({
  title: "Purple VOID | پروفایل رفتاری معامله‌گر",
  description: "آزمون آموزشی پنج‌محوری برای مشاهده الگوهای رفتاری اخیر معامله‌گران فارسی‌زبان.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className={styles.landing} data-purple-landing>
      <LandingMotion />

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy} data-reveal>
              <div className={styles.brandLine}>
                <span>محصولی از ایونتوم اسپیس</span>
              </div>
              <h1 id="hero-title">
                فاصله بین پلن و
                <span>رفتارت را ببین.</span>
              </h1>
              <p className={styles.heroLead}>
                یک تست ۳۵ سؤالی برای دیدن الگوهایی که زیر فشار، پلن معاملاتی‌ات را تغییر می‌دهند.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="/test" data-testid="start-test">
                  <span>شروع تست آرکیتایپ</span>
                  <b aria-hidden="true">←</b>
                </a>
                <a className={styles.ghostButton} href="/join">درخواست عضویت</a>
              </div>
              <div className={styles.heroFacts} aria-label="مشخصات تست">
                <span><strong>۳۵</strong> پرسش</span>
                <span><strong>۵</strong> محور رفتاری</span>
                <span><strong>۸–۱۲</strong> دقیقه</span>
              </div>
            </div>

            <div className={styles.voidStage} data-reveal>
              <div className={styles.stageHalo} aria-hidden="true" />
              <div className={styles.orbitOne} aria-hidden="true" />
              <div className={styles.orbitTwo} aria-hidden="true" />
              <div className={styles.logoGlass}>
                <span className={styles.logoRefraction} aria-hidden="true" />
                <Image
                  src="/brand/eventum-symbol-purple.png"
                  alt="نشان ایونتوم اسپیس"
                  width={536}
                  height={640}
                  priority
                />
                <div className={styles.voidTitle} aria-hidden="true">
                  <span>PURPLE</span>
                  <strong>VOID</strong>
                </div>
              </div>
              <span className={`${styles.axisChip} ${styles.axisChipOne}`}>ساختار</span>
              <span className={`${styles.axisChip} ${styles.axisChipTwo}`}>شواهد</span>
              <span className={`${styles.axisChip} ${styles.axisChipThree}`}>یادگیری</span>
              <span className={`${styles.axisChip} ${styles.axisChipFour}`}>هیجان</span>
              <span className={`${styles.axisChip} ${styles.axisChipFive}`}>ریسک</span>
            </div>
          </div>
        </div>
        <a className={styles.scrollCue} href="#how-it-works" aria-label="رفتن به بخش بعد">
          <span>پایین برو</span><i aria-hidden="true" />
        </a>
      </section>

      <section className={styles.whatIs} id="how-it-works">
        <div className={styles.shell}>
          <div className={styles.whatGrid}>
            <div className={styles.stickyStatement} data-reveal>
              <span className={styles.sectionIndex}>۰۱ — مسیر Purple VOID</span>
              <h2>از شناخت تا تغییر، در سه قدم.</h2>
              <p>
                تست، نقطه شروع است. بعد الگوی رفتاری‌ات را در معامله‌های واقعی مشاهده و تمرین می‌کنی.
              </p>
            </div>
            <div className={styles.definitionRail}>
              <article className={styles.definitionActive} data-reveal>
                <span>۱ · تست</span>
                <h3>خط پایه رفتاری‌ات را بساز.</h3>
              </article>
              <article data-reveal>
                <span>۲ · مشاهده</span>
                <h3>الگوی تکرارشونده را در معامله‌ها ببین.</h3>
              </article>
              <article data-reveal>
                <span>۳ · تمرین</span>
                <h3>روی همان الگو کار کن و دوباره بسنج.</h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.archetypes} id="archetypes">
        <div className={styles.shell}>
          <div className={styles.sectionHeading} data-reveal>
            <div>
              <span className={styles.sectionIndex}>۰۲ — پنج محور رفتاری</span>
              <h2>پنج الگو؛ یک تصویر از رفتار فعلی.</h2>
            </div>
            <p>نتیجه، برچسب شخصیتی نیست؛ نشان می‌دهد الان کدام مهارت‌ها فعال‌ترند.</p>
          </div>
          <div className={styles.archetypeField} data-reveal>
            <div className={styles.archetypeCore} aria-hidden="true"><span>الگوی فعلی</span><b>تو</b></div>
            {AXIS_IDS.map((axisId, index) => (
              <article className={styles.archetypeRow} data-archetype-id={axisId} key={axisId}>
                <span className={styles.archetypeNumber}>۰{index + 1}</span>
                <div className={styles.archetypeName} data-archetype-copy>
                  <h3>{AXES[axisId].persianName}</h3>
                  <span dir="ltr">{AXES[axisId].englishName}</span>
                  <p>{AXES[axisId].tagline}</p>
                </div>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.boundaries} id="boundaries">
        <div className={styles.shell}>
          <div className={styles.boundaryGlass} data-reveal>
            <div>
              <span className={styles.sectionIndex}>۰۳ — مرزهای روشن</span>
              <h2>شفاف و بدون وعده اضافه.</h2>
            </div>
            <ul>
              <li><strong>سیگنال نیست.</strong><span>معامله‌ای پیشنهاد نمی‌کند.</span></li>
              <li><strong>تضمین سود نیست.</strong><span>تصمیم نهایی با خودت است.</span></li>
              <li><strong>تشخیص روان‌شناختی نیست.</strong><span>یک ابزار آموزشی و خودبازتابی است.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGlow} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.finalInner} data-reveal>
            <span>قدم بعدی</span>
            <h2>الگوی رفتاری‌ات را ببین.</h2>
            <p>۳۵ سؤال، حدود ۱۰ دقیقه، با نتیجه‌ای که فقط روی مرورگر خودت ذخیره می‌شود.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="/test"><span>انجام تست</span><b aria-hidden="true">←</b></a>
              <a className={styles.ghostButton} href="/join"><span>درخواست عضویت</span></a>
            </div>
            <small>ابزار آموزشی است؛ نه توصیه مالی.</small>
          </div>
        </div>
      </section>
    </div>
  );
}
