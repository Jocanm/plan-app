import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
} from "@/features/i18n/domain/constants";
import { NextIntlClientProvider } from "next-intl";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { ThemeSwitcher } from "../../dev/ThemeSwitcher";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { SkipToMainContent } from "../SkipToMainContent";

interface Props {
  children: React.ReactNode;
  cookies: Promise<ReadonlyRequestCookies>;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const RootLayoutContent = async ({ cookies, children }: Props) => {
  const cookieStore = await cookies;
  const locale = cookieStore.get(LOCALE_COOKIE_KEY)?.value || DEFAULT_LOCALE;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <SkipToMainContent />
        </Suspense>
        <NextIntlClientProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            {children}
            <ThemeSwitcher />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
