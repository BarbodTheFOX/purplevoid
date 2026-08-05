import type { Metadata } from "next";
import { ResultsView } from "@/features/test/components/results-view";

export const metadata: Metadata = {
  title: "نتیجه آزمون",
  description: "نتیجه پنج‌محوری پروفایل رفتاری Purple VOID.",
};

export default function ResultsPage() {
  return (
    <section className="results-page">
      <div className="shell">
        <ResultsView />
      </div>
    </section>
  );
}
