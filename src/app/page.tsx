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

const insideItems = [
  { number: "۰۱", title: "مأموریت رفتاری", text: "تمرین‌های کوتاه روزانه و هفتگی برای رفتاری که واقعاً در معامله تکرار می‌کنی." },
  { number: "۰۲", title: "بازتاب و ثبت", text: "فقط انجام‌دادن کافی نیست؛ دلیل تصمیم، حس همان لحظه و فاصله‌ات از پلن را ثبت می‌کنی." },
  { number: "۰۳", title: "مسیر مخصوص خودت", text: "تمرین‌ها براساس محور فعال و مسیر رشد فعلی تو جهت می‌گیرند؛ نه یک نسخه یکسان برای همه." },
  { number: "۰۴", title: "تداوم معنادار", text: "امتیاز، زنجیره تداوم و Purple Quest برای استمرار واقعی‌اند؛ نه بیشتر پیام‌دادن یا رقابت نمایشی." },
] as const;

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
                ممکنه دقیقاً بدونی باید چه‌کار کنی؛ اما وقتی ضرر، هیجان یا عجله وارد تصمیم می‌شه،
                همه‌چیز عوض می‌شه. Purple VOID کمک می‌کنه الگوی واقعی رفتارت را ببینی و برایش تمرین داشته باشی.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="/test" data-testid="start-test">
                  <span>شروع تست آرکیتایپ</span>
                  <b aria-hidden="true">←</b>
                </a>
                <a className={styles.ghostButton} href="#inside-void">ببین داخل وُید چه خبره</a>
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
            <h2>اطلاعات بیشتر، همیشه تصمیم بهتر نمی‌سازه.</h2>
            <p>بعضی اشتباه‌ها از ندانستن نمیان. از لحظه‌ای میان که فشار بالا می‌ره و رفتار، جای پلن را می‌گیره.</p>
          </div>
          <div className={styles.behaviorStream} data-reveal>
            <div><span>بعد از ضرر</span><strong>برای جبران، سریع وارد معامله بعدی می‌شی.</strong></div>
            <div><span>بعد از سود</span><strong>فکر می‌کنی این بار می‌تونی قانون ریسک را کمی جابه‌جا کنی.</strong></div>
            <div><span>وسط تصمیم</span><strong>برای چیزی که از قبل می‌دونی، باز هم دنبال تأیید می‌گردی.</strong></div>
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
                Purple VOID فضایی برای دیدن، ثبت‌کردن و تمرین‌دادن رفتار معامله‌گره؛ جایی که آگاهی باید به یک کار قابل انجام تبدیل بشه.
              </p>
              <div className={styles.eventumSignature}>
                <Image src="/brand/eventum-wordmark-purple.png" alt="EVENTUM SPACE" width={688} height={112} />
              </div>
            </div>
            <div className={styles.definitionRail}>
              <article className={styles.definitionActive} data-reveal>
                <span>مشاهده</span>
                <h3>بفهمی زیر فشار دقیقاً چه الگویی را تکرار می‌کنی.</h3>
                <p>نه رفتاری که دوست داری داشته باشی؛ رفتاری که واقعاً در تصمیم‌هایت دیده می‌شه.</p>
              </article>
              <article data-reveal>
                <span>تمرین</span>
                <h3>برای نقطه‌ضعف فعلی‌ات، تمرین مشخص داشته باشی.</h3>
                <p>مأموریت‌های رفتاری، بازتاب، توقف‌های آگاهانه و تمرین‌های مخصوص هر محور.</p>
              </article>
              <article data-reveal>
                <span>مقایسه</span>
                <h3>بعد از چند هفته، تغییر را فقط حس نکنی؛ ببینی.</h3>
                <p>ارزیابی پایه رفتاری، ثبت مسیر و بازآزمایی کمک می‌کنن تغییر را با گذشته خودت مقایسه کنی.</p>
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
            <p>فقط نشون می‌ده در این مقطع، کدوم مهارت در تصمیم‌های تو پررنگ‌تره و کدوم بخش به تمرین بیشتری نیاز داره.</p>
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
              <h2>اول ببین الان کجای این نقشه‌ای.</h2>
              <p>۳۵ پرسش درباره رفتار واقعی تو در بازار؛ بدون جواب درست و غلط و بدون ساختن یک هویت همیشگی.</p>
              <ul>
                <li>پاسخ‌ها روی همین مرورگر ذخیره می‌شن</li>
                <li>می‌تونی بین سؤال‌ها عقب و جلو بری</li>
                <li>نتیجه براساس پنج محور و سطح اطمینان ساخته می‌شه</li>
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

      <section className={styles.inside} id="inside-void">
        <div className={styles.shell}>
          <div className={styles.sectionHeading} data-reveal>
            <div>
              <span className={styles.sectionIndex}>۰۶ — داخل Purple VOID</span>
              <h2>نتیجه تست، پایان کار نیست.</h2>
            </div>
            <p>از اینجا به بعد، باید چیزی را که فهمیدی وارد رفتار روزمره‌ات کنی.</p>
          </div>
          <div className={styles.insideJourney}>
            <div className={styles.journeySpine} aria-hidden="true"><i /><i /><i /><i /></div>
            {insideItems.map((item) => (
              <article key={item.number} data-reveal>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
          <div className={styles.questPanel} data-reveal>
            <div>
              <span>PURPLE QUEST</span>
              <h3>یک رفتار را انتخاب کن. هفت روز، فقط همان را ببین.</h3>
            </div>
            <p>مثلاً قبل از هر ورود، دلیل معامله و نقطه ابطال را بنویس. هدف، انجام یک حرکت نمایشی نیست؛ ساختن یک تکرار قابل مشاهده‌ست.</p>
          </div>
        </div>
      </section>

      <section className={styles.boundaries} id="boundaries">
        <div className={styles.shell}>
          <div className={styles.boundaryGlass} data-reveal>
            <div>
              <span className={styles.sectionIndex}>۰۷ — مرزهای روشن</span>
              <h2>قبل از ورود، این را شفاف بدون.</h2>
            </div>
            <ul>
              <li><strong>سیگنال نیست.</strong><span>هیچ معامله‌ای به تو پیشنهاد نمی‌شه.</span></li>
              <li><strong>تضمین سود نیست.</strong><span>مسئولیت تصمیم‌های معاملاتی با خودته.</span></li>
              <li><strong>درمان نیست.</strong><span>آرکیتایپ‌ها تشخیص روان‌شناختی یا بالینی نیستن.</span></li>
              <li><strong>فضای نمایش نیست.</strong><span>پیشرفت با مشارکت واقعی و بازتاب سنجیده می‌شه، نه تعداد پیام.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGlow} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.finalInner} data-reveal>
            <Image src="/brand/eventum-symbol-purple.png" alt="" width={536} height={640} aria-hidden="true" />
            <span>قدم اول، دیدن الگوی فعلیه.</span>
            <h2>آماده‌ای تصمیم‌هایت را بدون فیلتر ببینی؟</h2>
            <p>تست را انجام بده و ببین در رفتار معاملاتی اخیرت، کدوم نیرو فعال‌تر بوده و مسیر تمرینت از کجا شروع می‌شه.</p>
            <a className={styles.primaryButton} href="/test">
              <span>آرکیتایپم را پیدا می‌کنم</span><b aria-hidden="true">←</b>
            </a>
            <small>این تست ابزار آموزشی و خودبازتابیه؛ نه توصیه مالی و نه ارزیابی روان‌شناختی.</small>
          </div>
        </div>
      </section>
    </div>
  );
}
