import {
  CONTENT_PILLARS,
  FEATURED_CONTENT,
  PERSONALIZED_PATHS,
  type ContentPillar,
  type FeaturedContent,
} from "../data/exclusive-content";
import styles from "./exclusive-content.module.css";

function PillarVisual({ pillar }: { pillar: ContentPillar }) {
  if (pillar.visual === "profile") {
    return (
      <div className={styles.profileVisual} aria-hidden="true">
        <span>قدرت</span><span>سایه</span><span>محرک</span>
        <i /><b>پروفایل</b>
      </div>
    );
  }

  if (pillar.visual === "path") {
    return (
      <div className={styles.pathVisual} aria-hidden="true">
        <i /><i /><i /><i />
        <span>شروع</span><span>بازتاب</span>
      </div>
    );
  }

  if (pillar.visual === "archive") {
    return (
      <div className={styles.archiveVisual} aria-hidden="true">
        <span /><span /><span />
        <b>فایل‌های اختصاصی</b>
      </div>
    );
  }

  return (
    <div className={styles.progressVisual} aria-hidden="true">
      {[42, 63, 51, 78, 86, 72, 92].map((height, index) => (
        <i key={index} style={{ height: `${height}%` }} />
      ))}
      <span>مرور ماهانه</span>
    </div>
  );
}

function FeaturedVisual({ item }: { item: FeaturedContent }) {
  if (item.id === "playbook") {
    return (
      <div className={styles.playbookPreview} aria-label="پیش‌نمایش ساختار Playbook">
        <div><small>PURPLE VOID</small><strong>راهنمای آرکیتایپ</strong><span>نسخه قابل‌جایگزینی</span></div>
        <div><b>۰۱</b><span>قدرت و سایه</span><i /></div>
        <div><b>۰۲</b><span>محرک‌های رایج</span><i /></div>
        <div><b>۰۳</b><span>تمرین و بازتاب</span><i /></div>
      </div>
    );
  }

  if (item.id === "voice") {
    return (
      <div className={styles.audioPreview} aria-label="پیش‌نمایش رابط یادداشت صوتی">
        <button type="button" aria-label="نمونه رابط؛ فایل صوتی موجود نیست" disabled>▶</button>
        <div className={styles.waveform} aria-hidden="true">
          {[18, 42, 28, 66, 48, 82, 35, 72, 54, 24, 64, 38, 78, 44, 22, 58, 30, 68].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <span>۰۰:۰۰</span>
        <p>این بخش یک پیش‌نمایش رابط است و فایل صوتی واقعی بعداً جایگزین می‌شود.</p>
      </div>
    );
  }

  if (item.id === "quest") {
    return (
      <div className={styles.questPreview} aria-label="پیش‌نمایش ساختار Purple Quest">
        <div><span>مرحله ۱</span><i /></div>
        <div><span>مرحله ۲</span><i /></div>
        <div><span>مرحله ۳</span><i /></div>
        <strong>بازتاب نهایی</strong>
      </div>
    );
  }

  if (item.id === "uncut") {
    return (
      <div className={styles.videoPreview} aria-label="جای ویدیوی واقعی">
        <div><i /><span>پیش‌نمایش نسخه کامل</span></div>
        <p>تصویر و ویدیوی واقعی بعداً جایگزین می‌شود.</p>
      </div>
    );
  }

  return (
    <div className={styles.workbookPreview} aria-label="پیش‌نمایش دفترکار رفتاری">
      <span>فرم بازبینی معامله</span>
      <i /><i /><i />
      <div><b>احساس قبل از ورود</b><em>۰ — ۵</em></div>
      <div><b>فاصله از پلن</b><em>۰ — ۵</em></div>
    </div>
  );
}

export function ExclusiveContentStory() {
  return (
    <section className={styles.exclusive} id="exclusive-content" aria-labelledby="exclusive-title">
      <div className={styles.shell}>
        <header className={styles.heading} data-reveal>
          <span>۰۵ — عضویت در Purple VOID</span>
          <h2 id="exclusive-title">تست فقط الگو را نشان می‌دهد؛ کار اصلی بعدش شروع می‌شود.</h2>
          <p>
            بعد از شناخت الگو، محتوای مرتبط می‌گیری، تمرین انجام می‌دی و در طول زمان می‌بینی رفتارت کجا تغییر کرده. Purple VOID یک کتابخانه محتوا نیست؛ یک سیستم تمرین مستمره.
          </p>
        </header>

        <div className={styles.pillars}>
          {CONTENT_PILLARS.map((pillar) => (
            <article className={styles.pillar} key={pillar.id} data-reveal>
              <div className={styles.pillarCopy}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <ul>{pillar.examples.map((example) => <li key={example}>{example}</li>)}</ul>
              </div>
              <PillarVisual pillar={pillar} />
            </article>
          ))}
        </div>

        <div className={styles.featuredHeading} data-reveal>
          <span>چند نمونه از تجربه عضویت</span>
          <h2>محتوا اینجا فقط دیده نمی‌شه؛ وارد رفتار می‌شه.</h2>
          <p>این نمونه‌ها ساختار و رابط تجربه را نشان می‌دن. فایل‌ها، صداها و ویدیوهای نهایی بعد از تولید محتوای واقعی جایگزین می‌شن.</p>
        </div>

        <div className={styles.featured}>
          {FEATURED_CONTENT.map((item, index) => (
            <article className={`${styles.featuredItem} ${index % 2 ? styles.featuredReverse : ""}`} key={item.id} data-reveal>
              <div className={styles.featuredCopy}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.format} · محتوای در حال تولید</small>
              </div>
              <FeaturedVisual item={item} />
            </article>
          ))}
        </div>

        <div className={styles.personalized} data-reveal>
          <div className={styles.personalizedIntro}>
            <span>مسیر یکسان برای همه نیست</span>
            <h2>هر الگو، نقطه تمرکز خودش را داره.</h2>
            <p>این‌ها فقط یک پیش‌نمایش کوتاهن؛ جزئیات مسیر بعد از نتیجه تست و براساس قواعد واقعی پروفایل نمایش داده می‌شن.</p>
          </div>
          <div className={styles.pathList}>
            {PERSONALIZED_PATHS.map((path, index) => (
              <article key={path.archetype}>
                <span>۰{index + 1}</span>
                <div><strong dir="ltr">{path.archetype}</strong><small>{path.title}</small></div>
                <p>{path.preview}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.sectionCta} data-reveal>
          <div>
            <span>قدم اول هنوز همونه</span>
            <h2>اول الگوی خودت را بشناس؛ بعد مسیر مناسب خودت را شروع کن.</h2>
          </div>
          <a href="/test">اول الگویم را پیدا می‌کنم <b aria-hidden="true">←</b></a>
        </div>
      </div>
    </section>
  );
}
