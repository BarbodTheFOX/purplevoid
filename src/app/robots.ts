import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

const STATEFUL_ROUTES = ["/results", "/test/questions", "/join"] as const;

export default function robots(): MetadataRoute.Robots {
  if (!SITE_CONFIG.indexingEnabled || !SITE_CONFIG.origin) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...STATEFUL_ROUTES],
    },
    sitemap: `${SITE_CONFIG.origin}/sitemap.xml`,
  };
}
