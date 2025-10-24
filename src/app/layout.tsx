import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { RootLayoutContent } from "../shared/components/ui/layouts/RootLayoutContent";
import { getBaseUrl } from "../shared/utils/getBaseUrl";
import "./globals.css";

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
  return (
    <Suspense>
      <RootLayoutContent cookies={cookies()}>{children}</RootLayoutContent>
    </Suspense>
  );
}
