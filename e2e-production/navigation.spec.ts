import { expect, test } from "@playwright/test";

test("production header anchors navigate without runtime errors", async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");
  await page.getByRole("link", { name: "روش کار", exact: true }).click();
  await expect(page).toHaveURL(/\/#how-it-works$/);
  await expect(page.locator("#how-it-works")).toBeInViewport();

  await page.goto("/join");
  await page.getByRole("link", { name: "آرکیتایپ‌ها", exact: true }).click();
  await expect(page).toHaveURL(/\/#archetypes$/);
  await expect(page.locator("#archetypes")).toBeInViewport();

  expect(pageErrors).toEqual([]);
  expect(consoleErrors.filter((message) => message.includes("RSC prefetch setup error"))).toEqual([]);
});
