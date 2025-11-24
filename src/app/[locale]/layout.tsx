import { locales } from "@/features/i18n/domain/constants";
import { SkipToMainContent } from "@/shared/components/custom/SkipToMainContent";
import { getBaseUrl } from "@/shared/utils/getBaseUrl";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { Locale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { Toaster } from "sonner";
import { ThemeSwitcher } from "../../shared/components/dev/ThemeSwitcher";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "common",
  });
  const baseUrl = getBaseUrl();

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        en: `/en`,
        es: `/es`,
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: baseUrl,
      siteName: t("meta.title"),
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("meta.title"),
        },
      ],
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [`${baseUrl}/og-image.png`],
    },
    other: {
      "application-ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t("meta.title"),
        description: t("meta.description"),
        url: baseUrl,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: t("company_name"),
        },
      }),
    },
  };
}

export default function LocaleLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const messages = use(getMessages());

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <SkipToMainContent />
        </Suspense>
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              enableSystem
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors position="bottom-right" />
              <ThemeSwitcher />
              <Analytics />
              <SpeedInsights />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
