import { isValidTelegramAdminUsername } from "../../config/membership";

export function buildTelegramAdminUrl(value: string): string | null {
  if (!isValidTelegramAdminUsername(value)) return null;
  const username = value.trim().replace(/^@/, "");
  return `https://t.me/${encodeURIComponent(username)}`;
}

export function buildAdminMessage(archetype?: string): string {
  return [
    "سلام، برای عضویت Purple VOID پرداخت انجام دادم.",
    "",
    "نام:",
    "آیدی تلگرام:",
    "TxID:",
    `نتیجه تست Purple VOID: ${archetype ?? ""}`,
    "",
    "اسکرین‌شات پرداخت را هم ارسال می‌کنم.",
  ].join("\n");
}
