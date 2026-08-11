export type SiteConfigInput = {
  allowIndexing?: string;
  siteUrl?: string;
};

export type SiteConfig = {
  origin: string | null;
  indexingEnabled: boolean;
};

function parsePublicOrigin(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const hasCredentials = Boolean(url.username || url.password);
    const hasNonRootPath = url.pathname !== "/";
    if (url.protocol !== "https:" || hasCredentials || hasNonRootPath || url.search || url.hash) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

export function resolveSiteConfig(input: SiteConfigInput): SiteConfig {
  const origin = parsePublicOrigin(input.siteUrl);
  return {
    origin,
    indexingEnabled: input.allowIndexing === "true" && origin !== null,
  };
}

export const SITE_CONFIG = resolveSiteConfig({
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
});
