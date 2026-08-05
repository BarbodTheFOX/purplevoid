import { expect, test } from "@playwright/test";

test("presents an honest membership path without fake media previews", async ({ page }) => {
  await page.goto("/");

  const exclusive = page.locator("#exclusive-content");
  for (const title of [
    "الگوی خودت را بشناس",
    "رفتارت را مشاهده کن",
    "روی الگوی خودت کار کن",
    "تغییراتت را بررسی کن",
  ]) {
    await expect(exclusive.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }

  await expect(exclusive.getByText(/پیش‌نمایش رابط|فایل صوتی واقعی بعداً|پیش‌نمایش ویدیو/)).toHaveCount(0);
  await expect(exclusive.locator("audio, video")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "درخواست عضویت" }).first()).toHaveAttribute("href", "/join");
});

test("validates the application and shows a review before manual payment", async ({ page }) => {
  await page.goto("/join");

  await expect(page.getByRole("heading", { name: "درخواست عضویت Purple VOID" })).toBeVisible();
  await page.getByRole("button", { name: "بررسی اطلاعات" }).click();
  await expect(page.getByText("نام یا نام مستعار را وارد کن.")).toBeVisible();
  await expect(page.getByText("آیدی تلگرام معتبر وارد کن.")).toBeVisible();

  await page.getByLabel("نام یا نام مستعار").fill("تریدر نمونه");
  await page.getByLabel("آیدی تلگرام").fill("@trader_sample");
  await page.getByLabel("سطح تجربه در ترید").selectOption("one_to_three_years");
  await page.getByLabel("Purple VOID کانال سیگنال نیست").check();
  await page.getByRole("button", { name: "بررسی اطلاعات" }).click();

  await expect(page.getByRole("heading", { name: "قبل از پرداخت، اطلاعاتت را مرور کن" })).toBeVisible();
  await expect(page.getByText("@trader_sample", { exact: true })).toBeVisible();
  await expect(page.getByText("[MEMBERSHIP_PRICE]", { exact: true })).toBeVisible();
  await expect(page.getByText("اطلاعات پرداخت هنوز نهایی نشده است. فعلاً واریزی انجام نده.")).toBeVisible();
  await expect(page.getByRole("button", { name: "ادامه برای پرداخت" })).toBeDisabled();
  await expect(page.locator("img[alt*='QR'], canvas[aria-label*='QR']")).toHaveCount(0);
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
