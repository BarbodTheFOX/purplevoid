import {
  CONTENT_PILLARS,
  DELIVERY_NOTES,
  PERSONALIZED_PATHS,
  type ContentPillar,
} from "../data/exclusive-content";
import styles from "./exclusive-content.module.css";

function PillarVisual({ pillar }: { pillar: ContentPillar }) {
  if (pillar.visual === "profile") {
    return (
      <div className={styles.profileVisual} aria-hidden="true">
        <span>قدرت</span><span>سایه</span><span>محرک</span>
        <i /><b>الگوی فعلی</b>
      </div>
    );
  }

  if (pillar.visual === "path") {
    return (
      <div className={styles.pathVisual} aria-hidden="true">
        <i /><i /><i /><i />
        <span>مشاهده</span><span>ثبت</span>
      </div>
    );
  }

  if (pillar.visual === "tools") {
    return (
      <div className={styles.archiveVisual} aria-hidden="true">
        <span /><span /><span />
        <b>تمرین · راهنما · Quest</b>
      </div>
    );
  }

  return (
    <div className={styles.reviewVisual} aria-hidden="true">
      <span>خط پایه</span><i />
      <span>تمرین و ثبت</span><i />
      <span>مرور دوباره</span>
    </div>
  );
}

export function ExclusiveContentStory() {
  return (
    <section className={styles.exclusive} id="exclusive-content" aria-labelledby="exclusive-title">
      <div className={styles.shell}>
        <header className={styles.heading} data-reveal>
          <span>۰۵ — تجربه عضویت</span>
          <h2 id="exclusive-title">تست فقط الگوی غالب را نشان می‌دهد. بخش اصلی، دیدن همان الگو در معامله‌های واقعی است.</h2>
          <p>
            اول الگوی فعلی‌ات را می‌شناسی، بعد محتوای مرتبط می‌گیری، تمرین می‌کنی و رفتارت را ثبت می‌کنی. Purple VOID قرار نیست یک آرشیو شلوغ باشد؛ قرار است موضوعی که در تصمیم‌هایت تکرار می‌شود، قابل مشاهده شود.
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

        <div className={styles.personalized} data-reveal>
          <div className={styles.personalizedIntro}>
            <span>یک نسخه ثابت برای همه نیست</span>
            <h2>هر آرکیتایپ، رفتار را از زاویه خودش بررسی می‌کند.</h2>
            <p>این تفاوت به معنی شخصی‌سازی خودکار یا تشخیص قطعی نیست. محتوا با توجه به آرکیتایپ غالب و موضوع تمرین دسته‌بندی می‌شود.</p>
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

        <div className={styles.delivery} data-reveal>
          <div className={styles.deliveryIntro}>
            <span>فرمت‌های قابل ارائه</span>
            <h2>محتوا به اندازه‌ای وعده داده می‌شود که واقعاً قابل تولید باشد.</h2>
          </div>
          <div className={styles.deliveryList}>
            {DELIVERY_NOTES.map((item, index) => (
              <article key={item.title}>
                <span>۰{index + 1}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.sectionCta} data-reveal>
          <div>
            <span>مسیر عضویت</span>
            <h2>اگر تست را انجام داده‌ای، می‌توانی درخواست عضویتت را ثبت کنی.</h2>
          </div>
          <div className={styles.ctaGroup}>
            <a href="/test">انجام تست <b aria-hidden="true">←</b></a>
            <a href="/join">درخواست عضویت <b aria-hidden="true">←</b></a>
          </div>
        </div>
      </div>
    </section>
  );
}
