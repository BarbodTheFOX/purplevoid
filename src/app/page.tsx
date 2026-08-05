import Image from "next/image";
import { AXES, AXIS_IDS } from "@/features/test/data/axes";
import { ExclusiveContentStory } from "@/features/landing/components/exclusive-content-story";
import { LandingMotion } from "./landing-motion";
import styles from "./landing.module.css";

const archetypeNotes = {
  architect: "وقتی ساختار، تصمیم را نگه می‌دارد.",
  oracle: "وقتی شواهد از داستان ذهنی جدا می‌شود.",
  alchemist: "وقتی تجربه به تغییر حساب‌شده تبدیل می‌شود.",
  phantom: "وقتی بین هیجان و واکنش، فاصله می‌افتد.",
  sovereign: "وقتی قانون ریسک، حتی زیر فشار پابرجا می‌ماند.",
} as const;

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
                <span>تجربه رفتاری معامله‌گر</span>
                <i />
                <span>محصولی از ایونتوم اسپیس</span>
              </div>
              <h1 id="hero-title">
                فاصله بین پلن و
                <span>رفتارت را ببین.</span>
              </h1>
              <p className={styles.heroLead}>
                ممکن است پلن مشخصی داشته باشی، اما بعد از ضرر، هنگام FOMO یا وقتی اعتمادبه‌نفست بالا می‌رود همان پلن را کنار بگذاری. Purple VOID کمک می‌کند این فاصله را ببینی، ثبت کنی و روی آن کار کنی.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="/test" data-testid="start-test">
                  <span>شروع تست آرکیتایپ</span>
                  <b aria-hidden="true">←</b>
                </a>
                <a className={styles.ghostButton} href="#exclusive-content">مشاهده مسیر Purple VOID</a>
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
        <a className={styles.scrollCue} href="#problem" aria-label="رفتن به بخش بعد">
          <span>پایین برو</span><i aria-hidden="true" />
        </a>
      </section>

      <section className={styles.problem} id="problem">
        <div className={styles.shell}>
          <div className={styles.problemIntro} data-reveal>
            <span className={styles.sectionIndex}>۰۱ — مسئله اصلی</span>
            <h2>اطلاعات بیشتر، همیشه تصمیم بهتر نمی‌سازد.</h2>
            <p>بعضی اشتباه‌ها از ندانستن نمی‌آیند. مشکل از لحظه‌ای شروع می‌شود که فشار بالا می‌رود و واکنش، جای تصمیم از قبل تعیین‌شده را می‌گیرد.</p>
          </div>
          <div className={styles.behaviorStream} data-reveal>
            <div><span>بعد از ضرر</span><strong>برای جبران، سریع وارد معامله بعدی می‌شوی.</strong></div>
            <div><span>بعد از سود</span><strong>فکر می‌کنی این بار می‌توانی قانون ریسک را کمی جابه‌جا کنی.</strong></div>
            <div><span>وسط تصمیم</span><strong>برای چیزی که از قبل می‌دانی، باز هم دنبال تأیید می‌گردی.</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.whatIs} id="what-is-void">
        <div className={styles.shell}>
          <div className={styles.whatGrid}>
            <div className={styles.stickyStatement} data-reveal>
              <span className={styles.sectionIndex}>۰۲ — Purple VOID چیست؟</span>
              <h2>یک کانال ویژه معمولی نیست.</h2>
              <p>
                Purple VOID فضای عضویت و تمرین رفتاری برای تریدرهاست. تست نقطه شروع است؛ بعد از آن، الگو را در تصمیم‌های واقعی مشاهده می‌کنی و برای بخش‌هایی که تکرار می‌شوند تمرین مشخص داری.
              </p>
              <div className={styles.eventumSignature}>
                <Image src="/brand/eventum-wordmark-purple.png" alt="EVENTUM SPACE" width={688} height={112} />
              </div>
            </div>
            <div className={styles.definitionRail}>
              <article className={styles.definitionActive} data-reveal>
                <span>مشاهده</span>
                <h3>ببینی زیر فشار کدام الگو را تکرار می‌کنی.</h3>
                <p>نه رفتاری که فکر می‌کنی داری؛ رفتاری که در ورود، خروج، تغییر پلن و واکنش به سود و ضرر دیده می‌شود.</p>
              </article>
              <article data-reveal>
                <span>تمرین</span>
                <h3>برای مسئله فعلی‌ات، تمرین قابل انجام داشته باشی.</h3>
                <p>ثبت احساس، نوشتن دلیل ورود، فاصله بعد از ضرر و مرور تصمیم‌هایی که خارج از پلن گرفته شده‌اند.</p>
              </article>
              <article data-reveal>
                <span>مقایسه</span>
                <h3>بعد از مدتی، تغییر را فقط حدس نزنی؛ بررسی کنی.</h3>
                <p>نتیجه اولیه، یادداشت‌های رفتاری و بازآزمایی کمک می‌کنند رفتار امروزت را با خط پایه خودت مقایسه کنی.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.archetypes} id="archetypes">
        <div className={styles.shell}>
          <div className={styles.sectionHeading} data-reveal>
            <div>
              <span className={styles.sectionIndex}>۰۳ — پنج مسیر رفتاری</span>
              <h2>آرکیتایپ، برچسب تو نیست.</h2>
            </div>
            <p>فقط نشان می‌دهد در رفتار معاملاتی اخیرت کدام الگو پررنگ‌تر بوده و کدام بخش به مشاهده و تمرین بیشتری نیاز دارد.</p>
          </div>
          <div className={styles.archetypeField} data-reveal>
            <div className={styles.archetypeCore} aria-hidden="true"><span>الگوی فعلی</span><b>تو</b></div>
            {AXIS_IDS.map((axisId, index) => (
              <article className={styles.archetypeRow} key={axisId}>
                <span className={styles.archetypeNumber}>۰{index + 1}</span>
                <div>
                  <strong dir="ltr">{AXES[axisId].englishName}</strong>
                  <span>{AXES[axisId].persianName}</span>
                </div>
                <p>{archetypeNotes[axisId]}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
          <p className={styles.archetypeNote} data-reveal>نتیجه تست می‌تونه متعادل، ترکیبی، دارای نیروی پشتیبان یا یک الگوی غالب باشه.</p>
        </div>
      </section>

      <section className={styles.testPreview} id="test-entry">
        <div className={styles.shell}>
          <div className={styles.testGlass} data-reveal>
            <div className={styles.testCopy}>
              <span className={styles.sectionIndex}>۰۴ — نقطه ورود</span>
              <h2>اول یک خط پایه از رفتار فعلی‌ات داشته باش.</h2>
              <p>۳۵ پرسش درباره تصمیم‌هایی که واقعاً در بازار می‌گیری؛ بدون جواب درست و غلط و بدون ساختن یک برچسب شخصیتی ثابت.</p>
              <ul>
                <li>پاسخ‌ها فقط روی همین مرورگر ذخیره می‌شوند</li>
                <li>می‌توانی بین سؤال‌ها عقب و جلو بروی</li>
                <li>نتیجه براساس پنج محور و سطح اطمینان محاسبه می‌شود</li>
              </ul>
              <a className={styles.primaryButton} href="/test">
                <span>تست را شروع می‌کنم</span><b aria-hidden="true">←</b>
              </a>
            </div>
            <div className={styles.questionMock} aria-label="پیش‌نمایش محیط تست">
              <div className={styles.mockTop}><span>سؤال ۱۹ از ۳۵</span><b>۵۴٪</b></div>
              <div className={styles.mockTrack}><i /></div>
              <p>بعد از یک ضرر احساسی، سریع دنبال معامله بعدی می‌گردی تا حس بدش را از بین ببری؟</p>
              <div className={styles.mockOptions}>
                {["اصلاً", "به ندرت", "بعضی وقت‌ها", "بیشتر وقت‌ها", "تقریباً همیشه"].map((option, index) => (
                  <span className={index === 2 ? styles.mockSelected : ""} key={option}><i />{option}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExclusiveContentStory />

      <section className={styles.boundaries} id="boundaries">
        <div className={styles.shell}>
          <div className={styles.boundaryGlass} data-reveal>
            <div>
              <span className={styles.sectionIndex}>۰۶ — مرزهای روشن</span>
              <h2>قبل از درخواست عضویت، این مرزها را بدان.</h2>
            </div>
            <ul>
              <li><strong>سیگنال نیست.</strong><span>هیچ معامله‌ای به تو پیشنهاد نمی‌شود.</span></li>
              <li><strong>تضمین سود نیست.</strong><span>مسئولیت تصمیم‌های معاملاتی با خودت است.</span></li>
              <li><strong>تشخیص نیست.</strong><span>آرکیتایپ‌ها تشخیص روان‌شناختی یا بالینی نیستند.</span></li>
              <li><strong>جایگزین درمان نیست.</strong><span>محتوا و تعامل‌ها، روان‌درمانی یا مشاوره فردی تضمین‌شده نیستند.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGlow} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.finalInner} data-reveal>
            <Image src="/brand/eventum-symbol-purple.png" alt="" width={536} height={640} aria-hidden="true" />
            <span>مسیر روشن است: تست، مشاهده، تمرین، مرور.</span>
            <h2>می‌خواهی اول الگوی فعلی‌ات را ببینی یا درخواست عضویتت را ثبت کنی؟</h2>
            <p>اگر هنوز تست را انجام نداده‌ای، از همان‌جا شروع کن. اگر نتیجه‌ات را داری، فرم عضویت را تکمیل کن و قبل از هر پرداخت، اطلاعات را یک‌بار دیگر مرور کن.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="/test"><span>انجام تست</span><b aria-hidden="true">←</b></a>
              <a className={styles.ghostButton} href="/join"><span>درخواست عضویت</span></a>
            </div>
            <small>این تست ابزار آموزشی و خودبازتابی است؛ نه توصیه مالی و نه ارزیابی روان‌شناختی.</small>
          </div>
        </div>
      </section>
    </div>
  );
}
