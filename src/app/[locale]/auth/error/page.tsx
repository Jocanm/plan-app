import { ErrorPageContent } from "@/features/auth/components/error/ErrorPageContent";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "error.meta" });
  return {
    title: t("title"),
    description: t("description"),
    robots: "noindex, nofollow",
  };
};

export default function AuthErrorPage({
  searchParams,
}: PageProps<"/[locale]/auth/error">) {
  return (
    <Suspense>
      <ErrorPageContent searchParams={searchParams} />
    </Suspense>
  );
}
