import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
} from "@/features/i18n/domain/constants";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "../shared/components/providers/ThemeProvider";
import { ThemeSwitcher } from "../shared/components/dev/ThemeSwitcher";
import { getBaseUrl } from "../shared/utils/getBaseUrl";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("common");
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
      locale: "en_US",
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cookieStore, t] = await Promise.all([
    cookies(),
    getTranslations("common"),
  ]);
  const locale = cookieStore.get(LOCALE_COOKIE_KEY)?.value || DEFAULT_LOCALE;

  // Determine text direction based on locale
  const isRTL = ["ar", "he", "fa", "ur"].includes(locale);
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          {t("skip_to_main_content")}
        </a>
        <NextIntlClientProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            {children}
            {/* TODO: REMOVE THIS - Only for development. Move to proper theme toggle in UI */}
            <ThemeSwitcher />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
