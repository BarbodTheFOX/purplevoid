import { expect, test } from "@playwright/test";

test("presents a concise and honest membership path", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "از شناخت تا تغییر، در سه قدم." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "شفاف و بدون وعده اضافه." })).toBeVisible();
  await expect(page.getByRole("link", { name: "درخواست عضویت" }).first()).toHaveAttribute("href", "/join");
});

test("shows the complete payment layout without exposing incomplete configuration", async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as typeof window & { copiedPaymentValue?: string }).copiedPaymentValue = text;
        },
      },
    });
  });
  await page.goto("/join");

  await expect(page.getByRole("heading", { name: "اطلاعات پرداخت" })).toBeVisible();
  const paymentBox = await page.getByRole("heading", { name: "اطلاعات پرداخت" }).locator("xpath=ancestor::article").boundingBox();
  const processBox = await page.getByRole("heading", { name: "بعد از پرداخت چه کار کنم؟" }).locator("xpath=ancestor::aside").boundingBox();
  const handoffBox = await page.getByRole("region", { name: "متن برای ادمین" }).boundingBox();
  expect(paymentBox).not.toBeNull();
  expect(processBox).not.toBeNull();
  expect(handoffBox).not.toBeNull();
  expect(paymentBox!.x).toBeLessThan(processBox!.x);
  expect(Math.abs(handoffBox!.x - processBox!.x)).toBeLessThan(3);
  await expect(page.getByText("قیمت هنوز تنظیم نشده", { exact: true })).toBeVisible();
  await expect(page.getByText("ارز هنوز تنظیم نشده", { exact: true })).toBeVisible();
  await expect(page.getByRole("definition").filter({ hasText: "شبکه هنوز تنظیم نشده" })).toBeVisible();
  await expect(page.getByText("Wallet Address هنوز تنظیم نشده", { exact: true })).toBeVisible();
  await expect(page.getByText("TPartialTestWalletMustNotLeak", { exact: true })).toHaveCount(0);
  await expect(page.getByText("راهنمای ناقص آزمایشی نباید نمایش داده شود", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "کپی آدرس" })).toBeDisabled();
  const disabledTelegramCta = page.getByRole("button", { name: "پرداخت کردم — تکمیل عضویت" });
  await expect(disabledTelegramCta).toBeDisabled();
  await expect(disabledTelegramCta).toHaveAccessibleDescription(/اطلاعات واقعی هنوز کامل نشده/);
  await expect(page.getByText("لینک تلگرام در پنجره جدید باز می‌شود.", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "بعد از پرداخت چه کار کنم؟" })).toBeVisible();
  await expect(page.getByRole("button", { name: "کپی متن برای ادمین" })).toBeEnabled({ timeout: 20_000 });
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await expect(page.getByText(/\[[A-Z_]+\]/)).toHaveCount(0);

  await page.getByRole("button", { name: "کپی آدرس" }).evaluate((button: HTMLButtonElement) => {
    button.disabled = false;
    button.click();
  });
  expect(
    await page.evaluate(() => (window as typeof window & { copiedPaymentValue?: string }).copiedPaymentValue),
  ).toBeUndefined();
});

test("keeps the join flow free of horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/join");

  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
});
