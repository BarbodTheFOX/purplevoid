import { expect, test } from "@playwright/test";

test("completes all 35 questions and keeps the result stable after refresh", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.goto("/");
  await page.getByTestId("start-test").click();
  await expect(page).toHaveURL(/\/test$/);
  await expect(page.getByTestId("test-intro")).toHaveAttribute("data-ready", "true");

  await page.locator('input[name="trade-count"][value="fifteen_plus"]').check();
  const beginQuestions = page.getByTestId("begin-questions");
  await expect(beginQuestions).toBeEnabled();
  await beginQuestions.click();
  await expect(page.getByText("سؤال ۱ از ۳۵")).toBeVisible();

  for (let questionId = 1; questionId <= 35; questionId += 1) {
    if (questionId <= 30) {
      const value = ((questionId - 1) % 5) + 1;
      await page.locator(`input[name="question-${questionId}"][value="${value}"]`).check();
    } else {
      await page.locator(`input[name="question-${questionId}"][value="D"]`).check();
    }

    await page.getByTestId("next-question").click();

    if (questionId === 1) {
      await page.reload();
      await expect(page.getByText("سؤال ۲ از ۳۵")).toBeVisible();
    }
  }

  await expect(page).toHaveURL(/\/results$/);
  await expect(page.getByRole("heading", { name: "پنج مهارت در یک نگاه" })).toBeVisible();

  const expectedArchetypes = {
    architect: ["معمار", "THE ARCHITECT", "قبل از هر تصمیم، سیستم می‌سازد."],
    oracle: ["بینش‌گر", "THE VISIONARY", "پشت نشانه‌ها، الگو را می‌بیند."],
    alchemist: ["تبدیل‌گر", "THE ALCHEMIST", "تجربه را به مسیر تازه تبدیل می‌کند."],
    phantom: ["ناظر", "THE OBSERVER", "قبل از واکنش، فاصله می‌گیرد و نگاه می‌کند."],
    sovereign: ["فرمانروا", "THE SOVEREIGN", "حتی زیر فشار، قانونش را تغییر نمی‌دهد."],
  } as const;

  for (const [axisId, [persianName, englishName, tagline]] of Object.entries(expectedArchetypes)) {
    const card = page.locator(`[data-result-axis-id="${axisId}"]`);
    await expect(card.getByRole("heading", { name: persianName, exact: true })).toBeVisible();
    await expect(card.getByText(englishName, { exact: true })).toBeVisible();
    await expect(card.getByText(tagline, { exact: true })).toBeVisible();
  }

  const profileTitle = await page.locator(".result-hero h1").innerText();
  const firstAxis = await page.locator(".axis-archetype-heading h3").first().innerText();
  await page.screenshot({ path: testInfo.outputPath("result-desktop.png"), fullPage: true });

  await page.reload();

  await expect(page.locator(".result-hero h1")).toHaveText(profileTitle);
  await expect(page.locator(".axis-archetype-heading h3").first()).toHaveText(firstAxis);
  await expect(page.getByRole("heading", { name: "پنج مهارت در یک نگاه" })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: testInfo.outputPath("result-mobile.png"), fullPage: true });
});
