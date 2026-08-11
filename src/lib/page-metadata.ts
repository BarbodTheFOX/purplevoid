import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Purple VOID",
      type: "website",
      locale: "fa_IR",
      images: [
        {
          url: "/og-minimal.png",
          width: 1731,
          height: 909,
          alt: "Purple VOID — فاصله بین پلن و رفتارت را ببین",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-minimal.png"],
    },
  };
}
