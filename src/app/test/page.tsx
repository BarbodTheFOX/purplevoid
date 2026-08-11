import { TestIntroForm } from "@/features/test/components/test-intro-form";
import { TEST_INTRO_COPY } from "@/features/test/data/questions";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "شروع آزمون | Purple VOID",
  description: "راهنمای شروع آزمون ۳۵ سؤالی پروفایل رفتاری Purple VOID.",
  path: "/test",
});

export default function TestIntroductionPage() {
  return (
    <section className="page-section test-intro-page">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">35-QUESTION TEST · BETA 1.1</p>
          <h1>{TEST_INTRO_COPY.title}</h1>
          {TEST_INTRO_COPY.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <TestIntroForm />
      </div>
    </section>
  );
}
