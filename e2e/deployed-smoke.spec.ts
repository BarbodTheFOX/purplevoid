import { expect, test } from "@playwright/test";

const DEPLOYED_URL = "https://purple-void-pv-bpi.foxoncrypto1313.chatgpt.site/";

test("opens the hosted test flow", async ({ browser }) => {
  const bypassToken = process.env.SITES_BYPASS_TOKEN;
  test.skip(!bypassToken, "Sites bypass token is required for the deployed smoke test");

  const context = await browser.newContext({
    extraHTTPHeaders: {
      "OAI-Sites-Authorization": `Bearer ${bypassToken}`,
    },
  });
  const page = await context.newPage();

  await page.goto(DEPLOYED_URL);
  await page.getByTestId("start-test").click();

  await expect(page).toHaveURL(/\/test$/);
  await expect(page.locator('input[name="trade-count"]')).toHaveCount(4);

  await context.close();
});
