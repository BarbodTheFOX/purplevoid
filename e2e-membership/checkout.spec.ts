import { expect, test } from "@playwright/test";
import { scoreTest } from "../src/features/test/logic/scoring";
import type { CompleteAnswers } from "../src/features/test/types";

const RESULT_STORAGE_KEY = "purple-void:pv-bpi:result:beta-1.1";

function balancedResult() {
  const answers = {
    likert: Object.fromEntries(Array.from({ length: 30 }, (_, index) => [index + 1, 3])),
    scenarios: Object.fromEntries(Array.from({ length: 5 }, (_, index) => [index + 31, "C"])),
  } as CompleteAnswers;

  return scoreTest({
    answers,
    startTime: 1,
    endTime: 60_001,
    responseDurationsMs: Object.fromEntries(Array.from({ length: 35 }, (_, index) => [index + 1, 1_000])),
    tradeCountRange: "zero",
    tieBreakSeed: "seed",
    tieBreakOrder: ["architect", "oracle", "alchemist", "phantom", "sovereign"],
  });
}

test("shows a concise premium checkout and hands completion to Telegram", async ({ page }) => {
  await page.addInitScript(({ key, result }) => {
    window.localStorage.setItem(key, JSON.stringify(result));
  }, { key: RESULT_STORAGE_KEY, result: balancedResult() });

  await page.goto("/join");

  await expect(page.getByRole("heading", { name: "عضویت در Purple VOID" })).toBeVisible();
  const brandSymbol = page.locator(".brand-symbol").first();
  await expect(brandSymbol).toHaveJSProperty("complete", true);
  expect(await brandSymbol.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByText("۱۲۰٫۵")).toBeVisible();
  await expect(page.getByText("USDT", { exact: true })).toBeVisible();
  await expect(page.getByRole("definition").filter({ hasText: "TRC20" })).toBeVisible();
  await expect(page.getByText("TTestOnlyPublicWalletAddress123456", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "کپی آدرس" }).click();
  await expect(page.getByText("آدرس کپی شد", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "TTestOnlyPublicWalletAddress123456",
  );

  await expect(page.getByRole("heading", { name: "بعد از پرداخت چه کار کنم؟" })).toBeVisible();
  await expect(page.getByText("نتیجه تست Purple VOID: پروفایل متعادل")).toBeVisible();
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.getByRole("textbox")).toHaveCount(0);

  await page.getByRole("button", { name: "کپی متن برای ادمین" }).click();
  await expect(page.getByText("متن برای ادمین کپی شد", { exact: true })).toBeVisible();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n"),
  ).toBe([
    "سلام، برای عضویت Purple VOID پرداخت انجام دادم.",
    "",
    "نام:",
    "آیدی تلگرام:",
    "TxID:",
    "نتیجه تست Purple VOID: پروفایل متعادل",
    "",
    "اسکرین‌شات پرداخت را هم ارسال می‌کنم.",
  ].join("\n"));

  const telegramCta = page.getByRole("link", { name: "پرداخت کردم — تکمیل عضویت" });
  await expect(telegramCta).toHaveAttribute("href", "https://t.me/purple_void_test_admin");
  await expect(telegramCta).toHaveAttribute("target", "_blank");
  await expect(page.getByText("مرحله نهایی عضویت توسط ادمین Purple VOID انجام می‌شود.")).toBeVisible();
});

test("contains clipboard and fallback failures and cleans up the selection helper", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Clipboard denied");
        },
      },
    });
    Object.defineProperty(Document.prototype, "execCommand", {
      configurable: true,
      value: () => {
        throw new Error("Fallback copy failed");
      },
    });
  });

  await page.goto("/join");
  await page.getByRole("button", { name: "کپی آدرس" }).click();

  await expect(page.getByText("کپی خودکار انجام نشد؛ آدرس را دستی کپی کن.")).toBeVisible();
  await expect(page.locator("textarea")).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});

test("keeps the active checkout free of horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/join");

  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
});
