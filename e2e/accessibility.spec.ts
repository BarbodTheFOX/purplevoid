import { expect, test } from "@playwright/test";

test("moves focus to each newly rendered question", async ({ page }) => {
  await page.goto("/test");
  await expect(page.getByTestId("test-intro")).toHaveAttribute("data-ready", "true");
  await page.locator('input[value="zero"]').check();
  await page.getByTestId("begin-questions").click();

  const firstChoice = page.locator('input[type="radio"]').first();
  await firstChoice.check();
  await page.getByTestId("next-question").click();

  const legend = page.locator(".question-card legend");
  await expect(legend).toBeFocused();
  await expect(page.locator(".question-topline")).toContainText("سؤال ۲ از ۳۵");
});

test("keeps mobile header and footer controls at least 44 pixels tall", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".theme-toggle")).toHaveAttribute("data-ready", "true", { timeout: 15_000 });

  const controls = [
    page.locator(".theme-toggle"),
    page.locator(".header-nav .button-small"),
    ...await page.locator(".site-footer nav a").all(),
  ];

  for (const control of controls) {
    const box = await control.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});
