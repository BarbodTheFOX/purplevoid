import type { Metadata } from "next";
import { MembershipFlow } from "@/features/membership/components/membership-flow";

export const metadata: Metadata = {
  title: "درخواست عضویت",
  description: "ثبت درخواست عضویت Purple VOID و راهنمای پرداخت دستی کریپتو.",
};

export default function JoinPage() {
  return <MembershipFlow />;
}
