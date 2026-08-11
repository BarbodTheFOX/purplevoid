import { describe, expect, it } from "vitest";
import { resolveSiteConfig } from "./site";

describe("site launch configuration", () => {
  it("enables indexing only with an explicit valid public URL", () => {
    expect(resolveSiteConfig({ allowIndexing: "true", siteUrl: "https://example.com/" })).toEqual({
      origin: "https://example.com",
      indexingEnabled: true,
    });
  });

  it("fails closed when the public URL is missing or insecure", () => {
    expect(resolveSiteConfig({ allowIndexing: "true", siteUrl: undefined }).indexingEnabled).toBe(false);
    expect(resolveSiteConfig({ allowIndexing: "true", siteUrl: "http://example.com" }).indexingEnabled).toBe(false);
    expect(resolveSiteConfig({ allowIndexing: "false", siteUrl: "https://example.com" }).indexingEnabled).toBe(false);
  });
});
