import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "https://purplevoid.example";

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Purple VOID | پروفایل رفتاری معامله‌گر",
      template: "%s | Purple VOID",
    },
    description:
      "آزمون آموزشی پنج‌محوری برای مشاهده الگوهای رفتاری اخیر معامله‌گران فارسی‌زبان.",
    openGraph: {
      type: "website",
      locale: "fa_IR",
      title: "Purple VOID | پروفایل رفتاری معامله‌گر",
      description:
        "مهارت‌های رفتاری اخیرت در فرایند، شواهد، یادگیری، هیجان و ریسک را مشاهده کن.",
      siteName: "Purple VOID",
      images: [{ url: "/og.png", width: 1732, height: 910, alt: "Purple VOID PV–BPI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Purple VOID | پروفایل رفتاری معامله‌گر",
      description:
        "مهارت‌های رفتاری اخیرت در فرایند، شواهد، یادگیری، هیجان و ریسک را مشاهده کن.",
      images: ["/og.png"],
    },
    robots: allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08070f" },
    { media: "(prefers-color-scheme: light)", color: "#efedf1" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `
  try {
    const saved = localStorage.getItem("purple-void:theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "dark";
  }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">پرش به محتوای اصلی</a>
        <div className="ambient ambient-top" aria-hidden="true" />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
