import type { Metadata } from "next";
import { MembershipFlow } from "@/features/membership/components/membership-flow";

export const metadata: Metadata = {
  title: "عضویت در Purple VOID",
  description: "اطلاعات پرداخت و مسیر تکمیل عضویت خصوصی Purple VOID از طریق ادمین تلگرام.",
  robots: { index: false, follow: false },
};

export default function JoinPage() {
  return <MembershipFlow />;
}
