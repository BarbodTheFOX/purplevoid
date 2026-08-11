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

test("shows the concise Purple VOID path", async ({ page }) => {
  await page.goto("/");

  const path = page.locator("#how-it-works");
  await expect(path.getByRole("heading", { name: "از شناخت تا تغییر، در سه قدم." })).toBeVisible();

  for (const title of ["خط پایه رفتاری‌ات را بساز.", "الگوی تکرارشونده را در معامله‌ها ببین.", "روی همان الگو کار کن و دوباره بسنج."]) {
    await expect(path.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }

  await expect(page.getByRole("link", { name: "درخواست عضویت" }).first()).toHaveAttribute("href", "/join");
});

test("shows Persian archetype titles before the English subtitle and tagline", async ({ page }) => {
  await page.goto("/");

  const expected = {
    architect: ["معمار", "THE ARCHITECT", "قبل از هر تصمیم، سیستم می‌سازد."],
    oracle: ["بینش‌گر", "THE VISIONARY", "پشت نشانه‌ها، الگو را می‌بیند."],
    alchemist: ["تبدیل‌گر", "THE ALCHEMIST", "تجربه را به مسیر تازه تبدیل می‌کند."],
    phantom: ["ناظر", "THE OBSERVER", "قبل از واکنش، فاصله می‌گیرد و نگاه می‌کند."],
    sovereign: ["فرمانروا", "THE SOVEREIGN", "حتی زیر فشار، قانونش را تغییر نمی‌دهد."],
  } as const;

  for (const [axisId, [persianName, englishName, tagline]] of Object.entries(expected)) {
    const card = page.locator(`[data-archetype-id="${axisId}"]`);
    const copy = card.locator("[data-archetype-copy]");
    await expect(card.getByRole("heading", { name: persianName, exact: true })).toBeVisible();
    await expect(card.getByText(englishName, { exact: true })).toBeVisible();
    await expect(card.getByText(tagline, { exact: true })).toBeVisible();
    await expect(copy.locator(":scope > *")).toHaveText([persianName, englishName, tagline]);
  }
});

test("keeps the landing page free of horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("#archetypes").scrollIntoViewIfNeeded();

  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);
});
