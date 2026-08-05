import { expect, test } from "@playwright/test";

test("switches to the light theme and keeps the choice after refresh", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.setItem("purple-void:theme", "dark"));
  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const toggle = page.getByRole("button", { name: "فعال‌کردن تم روشن" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("button", { name: "فعال‌کردن تم تیره" })).toBeVisible();
});

test("shows the exclusive membership system after the test entry", async ({ page }) => {
  await page.goto("/");

  const exclusive = page.locator("#exclusive-content");
  await expect(exclusive.getByRole("heading", { name: "تست فقط الگوی غالب را نشان می‌دهد. بخش اصلی، دیدن همان الگو در معامله‌های واقعی است." })).toBeVisible();

  for (const title of ["الگوی خودت را بشناس", "رفتارت را مشاهده کن", "روی الگوی خودت کار کن", "تغییراتت را بررسی کن"]) {
    await expect(exclusive.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }

  await expect(exclusive.locator("audio, video")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "درخواست عضویت" }).first()).toHaveAttribute("href", "/join");
});

test("keeps the new story free of horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("#exclusive-content").scrollIntoViewIfNeeded();

  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
});
