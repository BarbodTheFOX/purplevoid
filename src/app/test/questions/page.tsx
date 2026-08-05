import type { Metadata } from "next";
import { QuestionFlow } from "@/features/test/components/question-flow";

export const metadata: Metadata = {
  title: "سؤال‌های آزمون",
  description: "پاسخ به ۳۵ سؤال آزمون رفتاری Purple VOID.",
};

export default function QuestionsPage() {
  return (
    <section className="questions-page">
      <div className="shell">
        <QuestionFlow />
      </div>
    </section>
  );
}
