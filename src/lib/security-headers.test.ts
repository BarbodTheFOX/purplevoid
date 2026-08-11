import { describe, expect, it } from "vitest";
import { applySecurityHeaders } from "./security-headers";

describe("production security headers", () => {
  it("adds browser hardening headers and preserves the response body", async () => {
    const request = new Request("https://purple-void.example/test");
    const response = applySecurityHeaders(request, new Response("ok", { headers: { "content-type": "text/plain" } }));

    expect(await response.text()).toBe("ok");
    expect(response.headers.get("content-security-policy")).toContain("frame-ancestors 'none'");
    expect(response.headers.get("strict-transport-security")).toContain("max-age=31536000");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("permissions-policy")).toContain("camera=()");
  });

  it("does not emit HSTS for an HTTP development response", () => {
    const response = applySecurityHeaders(new Request("http://127.0.0.1:3300/"), new Response());
    expect(response.headers.has("strict-transport-security")).toBe(false);
  });
});
