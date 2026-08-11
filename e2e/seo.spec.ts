import { expect, test } from "@playwright/test";

test("publishes robots and sitemap endpoints without indexing stateful routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("User-Agent");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await request.get("/favicon.ico")).toBeOK();

  for (const route of ["/results", "/test/questions", "/join"]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(await response.text()).toMatch(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i);
  }

  for (const route of ["/", "/test", "/methodology", "/privacy"]) {
    const response = await request.get(route);
    const html = await response.text();
    const expectedUrl = `http://127.0.0.1:3100${route === "/" ? "" : route}`;
    expect(html).toContain(`rel="canonical" href="${expectedUrl}"`);
    expect(html).toContain(`property="og:url" content="${expectedUrl}"`);
  }
});
