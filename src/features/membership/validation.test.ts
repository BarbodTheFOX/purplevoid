import { describe, expect, it } from "vitest";
import { MEMBERSHIP_CONFIG, isMembershipPaymentReady } from "../../config/membership";
import {
  buildAdminPaymentMessage,
  membershipApplicationSchema,
  normalizeTelegramUsername,
  paymentEvidenceSchema,
} from "./validation";

describe("membership application validation", () => {
  const validApplication = {
    displayName: "تریدر نمونه",
    telegramUsername: "@trader_sample",
    phone: "",
    archetype: "oracle",
    experienceLevel: "one_to_three_years",
    motivation: "می‌خواهم تصمیم‌های بعد از ضرر را بهتر ثبت کنم.",
    paymentMethod: "crypto" as const,
    termsAccepted: true,
  };

  it("normalizes a Telegram username without inventing contact data", () => {
    expect(normalizeTelegramUsername(" @Trader_Sample ")).toBe("trader_sample");
  });

  it("rejects missing required fields and unaccepted terms", () => {
    const result = membershipApplicationSchema.safeParse({
      ...validApplication,
      displayName: "",
      telegramUsername: "bad username",
      termsAccepted: false,
    });

    expect(result.success).toBe(false);
  });

  it("accepts a minimal honest membership application", () => {
    expect(membershipApplicationSchema.safeParse(validApplication).success).toBe(true);
  });
});

describe("manual crypto payment", () => {
  it("keeps payment disabled while central config still contains placeholders", () => {
    expect(isMembershipPaymentReady(MEMBERSHIP_CONFIG)).toBe(false);
  });

  it("rejects empty or whitespace-only payment configuration values", () => {
    const readyConfig = {
      ...MEMBERSHIP_CONFIG,
      enabled: true,
      price: 120,
      currency: "USDT",
      network: "TRC20",
      walletAddress: "TValidPublicAddress",
      telegramAdminUsername: "purple_void_admin",
      paymentGuide: "مبلغ دقیق را فقط روی شبکه اعلام‌شده ارسال کن.",
      refundPolicy: "شرایط بازپرداخت پیش از پرداخت نمایش داده می‌شود.",
    };

    for (const field of ["currency", "network", "walletAddress", "telegramAdminUsername", "paymentGuide", "refundPolicy"] as const) {
      expect(isMembershipPaymentReady({ ...readyConfig, [field]: "   " })).toBe(false);
    }
  });

  it("accepts only a complete non-placeholder payment configuration", () => {
    expect(isMembershipPaymentReady({
      ...MEMBERSHIP_CONFIG,
      enabled: true,
      price: 120,
      currency: "USDT",
      network: "TRC20",
      walletAddress: "TValidPublicAddress",
      telegramAdminUsername: "purple_void_admin",
      paymentGuide: "مبلغ دقیق را فقط روی شبکه اعلام‌شده ارسال کن.",
      refundPolicy: "شرایط بازپرداخت پیش از پرداخت نمایش داده می‌شود.",
    })).toBe(true);
  });

  it("rejects empty TxID, invalid amount, and a mismatched currency or network", () => {
    const result = paymentEvidenceSchema.safeParse({
      transactionHash: "",
      currency: "WRONG",
      network: "WRONG",
      paidAmount: 0,
      telegramUsername: "@trader_sample",
      senderWalletAddress: "",
      paymentNote: "",
    });

    expect(result.success).toBe(false);
  });

  it("builds a copyable admin message without seed phrase or private key fields", () => {
    const message = buildAdminPaymentMessage({
      displayName: "تریدر نمونه",
      telegramUsername: "@trader_sample",
      archetype: "بینش‌گر — THE VISIONARY",
      expectedAmountLabel: "[MEMBERSHIP_PRICE]",
      currency: "[PAYMENT_CURRENCY]",
      network: "[PAYMENT_NETWORK]",
      transactionHash: "0x1234567890abcdef",
    });

    expect(message).toContain("TxID: 0x1234567890abcdef");
    expect(message).toContain("آرکیتایپ: بینش‌گر — THE VISIONARY");
    expect(message).not.toMatch(/Seed Phrase|Private Key/i);
  });
});
