import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

const INDEXABLE_ROUTES = ["/", "/test", "/methodology", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_CONFIG.indexingEnabled || !SITE_CONFIG.origin) return [];

  const origin = SITE_CONFIG.origin;
  const lastModified = new Date();
  return INDEXABLE_ROUTES.map((route, index) => ({
    url: new URL(route, origin).toString(),
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
