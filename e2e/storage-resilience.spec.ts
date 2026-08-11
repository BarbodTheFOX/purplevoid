import { expect, test } from "@playwright/test";

test("shows a recovery message when browser storage rejects a new test", async ({ page }) => {
  await page.goto("/test");
  await expect(page.getByTestId("test-intro")).toHaveAttribute("data-ready", "true");
  await page.evaluate(() => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key.includes("purple-void:pv-bpi")) {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      }
      return originalSetItem.call(this, key, value);
    };
  });

  await page.getByLabel("۰ معامله").check();
  await page.getByRole("button", { name: "ورود به سؤال‌ها" }).click();

  await expect(page).toHaveURL(/\/test$/);
  await expect(page.getByRole("alert")).toContainText("مرورگر اجازه ذخیره آزمون را نمی‌دهد");
});

test("clears an incomplete saved result instead of showing the error boundary", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("purple-void:pv-bpi:result:beta-1.1", JSON.stringify({
      testVersion: "beta-1.1-BPI-PV",
      algorithmVersion: "1.1",
      resultType: "balanced",
      confidenceLevel: "usual",
      tieBreakSeed: "seed",
      tieBreakOrder: ["architect", "oracle", "alchemist", "phantom", "sovereign"],
      axes: {},
      answers: {},
    }));
  });

  await page.goto("/results");
  await expect(page).toHaveURL(/\/test$/);
  await expect(page.getByText("This page couldn’t load")).toHaveCount(0);
});
