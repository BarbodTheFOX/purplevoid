import { describe, expect, it } from "vitest";
import {
  MEMBERSHIP_CONFIG,
  createMembershipConfig,
  isMembershipPaymentReady,
  membershipPriceLabel,
} from "../../config/membership";
import { buildAdminMessage, buildTelegramAdminUrl } from "./validation";

const READY_CONFIG = {
  enabled: true,
  price: "120",
  currency: "USDT",
  network: "TRC20",
  walletAddress: "TValidPublicAddress",
  telegramAdminUsername: "purple_void_admin",
  paymentGuide: "مبلغ دقیق را فقط روی شبکه اعلام‌شده ارسال کن.",
};

describe("membership checkout configuration", () => {
  it("keeps checkout disabled while public configuration is missing", () => {
    expect(isMembershipPaymentReady(MEMBERSHIP_CONFIG)).toBe(false);
  });

  it("reads checkout values from public environment configuration", () => {
    const config = createMembershipConfig({
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_PRICE: "120.5",
      NEXT_PUBLIC_MEMBERSHIP_CURRENCY: "USDT",
      NEXT_PUBLIC_MEMBERSHIP_NETWORK: "TRC20",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TValidPublicAddress",
      NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: "purple_void_admin",
      NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE: "راهنمای پرداخت",
    });

    expect(config).toEqual({
      enabled: true,
      price: "120.5",
      currency: "USDT",
      network: "TRC20",
      walletAddress: "TValidPublicAddress",
      telegramAdminUsername: "purple_void_admin",
      paymentGuide: "راهنمای پرداخت",
    });
    expect(isMembershipPaymentReady(config)).toBe(true);
  });

  it("rejects every missing essential payment value", () => {
    for (const field of ["currency", "network", "walletAddress", "telegramAdminUsername"] as const) {
      expect(isMembershipPaymentReady({ ...READY_CONFIG, [field]: "   " })).toBe(false);
    }
    expect(isMembershipPaymentReady({ ...READY_CONFIG, price: null })).toBe(false);
    expect(isMembershipPaymentReady({ ...READY_CONFIG, enabled: false })).toBe(false);
  });

  it("does not make the optional payment guide a checkout blocker", () => {
    expect(isMembershipPaymentReady({ ...READY_CONFIG, paymentGuide: "" })).toBe(true);
  });

  it("keeps checkout unavailable for a malformed Telegram username", () => {
    expect(
      isMembershipPaymentReady({
        ...READY_CONFIG,
        telegramAdminUsername: "bad username",
      }),
    ).toBe(false);
  });

  it.each([
    "0x10",
    "1e2",
    "NaN",
    "Infinity",
    "0",
    "-1",
    "0.000000001",
  ])("rejects invalid or unrepresentable price %s", (rawPrice) => {
    const config = createMembershipConfig({
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_PRICE: rawPrice,
      NEXT_PUBLIC_MEMBERSHIP_CURRENCY: "USDT",
      NEXT_PUBLIC_MEMBERSHIP_NETWORK: "TRC20",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TValidPublicAddress",
      NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: "purple_void_admin",
    });

    expect(config.price).toBeNull();
    expect(isMembershipPaymentReady(config)).toBe(false);
  });

  it("accepts the minimum price representable by the eight-decimal label", () => {
    const config = createMembershipConfig({
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_PRICE: "0.00000001",
      NEXT_PUBLIC_MEMBERSHIP_CURRENCY: "USDT",
      NEXT_PUBLIC_MEMBERSHIP_NETWORK: "TRC20",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TValidPublicAddress",
      NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: "purple_void_admin",
    });

    expect(config.price).toBe("0.00000001");
    expect(isMembershipPaymentReady(config)).toBe(true);
  });

  it("rejects prices that cannot be displayed without changing the amount", () => {
    const config = createMembershipConfig({
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_PRICE: "1.000000001",
      NEXT_PUBLIC_MEMBERSHIP_CURRENCY: "USDT",
      NEXT_PUBLIC_MEMBERSHIP_NETWORK: "TRC20",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TValidPublicAddress",
      NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: "purple_void_admin",
    });

    expect(config.price).toBeNull();
    expect(isMembershipPaymentReady({ ...READY_CONFIG, price: "0.000000001" })).toBe(false);
  });

  it("preserves and displays an eight-decimal amount without floating-point rounding", () => {
    const config = createMembershipConfig({
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_PRICE: "90071992.53740991",
      NEXT_PUBLIC_MEMBERSHIP_CURRENCY: "USDT",
      NEXT_PUBLIC_MEMBERSHIP_NETWORK: "TRC20",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TValidPublicAddress",
      NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: "purple_void_admin",
    });

    expect(config.price).toBe("90071992.53740991");
    expect(membershipPriceLabel(config)).toBe("۹۰٬۰۷۱٬۹۹۲٫۵۳۷۴۰۹۹۱");
    expect(isMembershipPaymentReady(config)).toBe(true);
  });
});

describe("Telegram handoff", () => {
  it("builds the concise copyable admin message", () => {
    expect(buildAdminMessage("بینش‌گر — THE VISIONARY")).toBe([
      "سلام، برای عضویت Purple VOID پرداخت انجام دادم.",
      "",
      "نام:",
      "آیدی تلگرام:",
      "TxID:",
      "نتیجه تست Purple VOID: بینش‌گر — THE VISIONARY",
      "",
      "اسکرین‌شات پرداخت را هم ارسال می‌کنم.",
    ].join("\n"));
  });

  it("creates a direct Telegram link without a fragile prefilled message", () => {
    expect(buildTelegramAdminUrl(" @Purple_VOID_Admin ")).toBe("https://t.me/Purple_VOID_Admin");
    expect(buildTelegramAdminUrl("[TELEGRAM_ADMIN_USERNAME]")).toBeNull();
    expect(buildTelegramAdminUrl("bad username")).toBeNull();
  });

  it("never asks for wallet secrets in the prepared message", () => {
    expect(buildAdminMessage()).not.toMatch(/Seed Phrase|Private Key/i);
  });
});
