import type { AxisId } from "../test/types";

export type MembershipStatus =
  | "draft"
  | "submitted"
  | "waiting_for_payment"
  | "payment_submitted"
  | "under_review"
  | "approved"
  | "needs_correction"
  | "rejected";

export type MembershipApplication = {
  id?: string;
  displayName: string;
  telegramUsername: string;
  phone?: string;
  archetype?: AxisId | "balanced" | "blended" | "unknown";
  experienceLevel?: string;
  motivation?: string;
  paymentMethod: "crypto";
  currency: string;
  network: string;
  expectedAmount: number;
  paidAmount?: number;
  transactionHash?: string;
  senderWalletAddress?: string;
  paymentNote?: string;
  termsAccepted: boolean;
  status: MembershipStatus;
  createdAt?: string;
};

export type MembershipApplicationInput = Pick<
  MembershipApplication,
  | "displayName"
  | "telegramUsername"
  | "phone"
  | "archetype"
  | "experienceLevel"
  | "motivation"
  | "paymentMethod"
  | "termsAccepted"
>;

export type PaymentEvidenceInput = Pick<
  MembershipApplication,
  | "transactionHash"
  | "currency"
  | "network"
  | "paidAmount"
  | "telegramUsername"
  | "senderWalletAddress"
  | "paymentNote"
>;
