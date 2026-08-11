import { expect, test } from "@playwright/test";

test("presents a concise and honest membership path", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "از شناخت تا تغییر، در سه قدم." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "شفاف و بدون وعده اضافه." })).toBeVisible();
  await expect(page.getByRole("link", { name: "درخواست عضویت" }).first()).toHaveAttribute("href", "/join");
});

test("does not collect personal data while membership payment is unavailable", async ({ page }) => {
  await page.goto("/join");

  await expect(page.getByRole("heading", { name: "ثبت عضویت هنوز فعال نشده" })).toBeVisible();
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await expect(page.getByText(/\[[A-Z_]+\]/)).toHaveCount(0);
  await expect(page.getByRole("link", { name: "انجام تست ۳۵ سؤالی" })).toHaveAttribute("href", "/test");
  await expect(page.getByText("در این مرحله هیچ اطلاعات تماس یا مالی از تو دریافت نمی‌شود.")).toBeVisible();
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
