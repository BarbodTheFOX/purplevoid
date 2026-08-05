import { z } from "zod";
import { MEMBERSHIP_CONFIG } from "../../config/membership";

const telegramPattern = /^[A-Za-z0-9_]{5,32}$/;
const transactionPattern = /^(?:0x)?[A-Za-z0-9]{8,160}$/;

export function normalizeTelegramUsername(value: string): string {
  return value.trim().replace(/^@/, "").toLowerCase();
}

const telegramUsernameSchema = z
  .string()
  .transform(normalizeTelegramUsername)
  .refine((value) => telegramPattern.test(value), {
    message: "آیدی تلگرام معتبر وارد کن.",
  });

export const membershipApplicationSchema = z.object({
  displayName: z.string().trim().min(2, "نام یا نام مستعار را وارد کن.").max(80),
  telegramUsername: telegramUsernameSchema,
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  archetype: z
    .enum(["architect", "oracle", "alchemist", "phantom", "sovereign", "balanced", "blended", "unknown"])
    .optional()
    .or(z.literal("")),
  experienceLevel: z.string().trim().min(1, "سطح تجربه در ترید را انتخاب کن."),
  motivation: z.string().trim().max(600).optional().or(z.literal("")),
  paymentMethod: z.literal("crypto"),
  termsAccepted: z.literal(true, {
    error: "برای ادامه، قوانین عضویت را تأیید کن.",
  }),
});

export const paymentEvidenceSchema = z.object({
  transactionHash: z
    .string()
    .trim()
    .min(1, "TxID یا Transaction Hash را وارد کن.")
    .regex(transactionPattern, "فرمت TxID قابل قبول نیست."),
  currency: z.literal(MEMBERSHIP_CONFIG.currency, {
    error: "ارز پرداختی با گزینه فعال مطابقت ندارد.",
  }),
  network: z.literal(MEMBERSHIP_CONFIG.network, {
    error: "شبکه با گزینه فعال مطابقت ندارد.",
  }),
  paidAmount: z.coerce.number().positive("مبلغ باید یک عدد معتبر و بیشتر از صفر باشد."),
  telegramUsername: telegramUsernameSchema,
  senderWalletAddress: z.string().trim().max(180).optional().or(z.literal("")),
  paymentNote: z.string().trim().max(500).optional().or(z.literal("")),
});

type AdminMessageInput = {
  displayName: string;
  telegramUsername: string;
  archetype?: string;
  expectedAmountLabel: string;
  currency: string;
  network: string;
  transactionHash: string;
};

export function buildAdminPaymentMessage(input: AdminMessageInput): string {
  const telegram = input.telegramUsername.startsWith("@")
    ? input.telegramUsername
    : `@${input.telegramUsername}`;
  const archetype = input.archetype
    ? input.archetype.toUpperCase()
    : "ثبت نشده";

  return [
    "درخواست بررسی عضویت Purple VOID",
    `نام: ${input.displayName}`,
    `آیدی تلگرام: ${telegram}`,
    `آرکیتایپ: ${archetype}`,
    `مبلغ: ${input.expectedAmountLabel}`,
    `ارز: ${input.currency}`,
    `شبکه: ${input.network}`,
    `TxID: ${input.transactionHash}`,
  ].join("\n");
}
