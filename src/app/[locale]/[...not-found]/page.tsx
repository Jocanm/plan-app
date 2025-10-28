import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "not_found.meta",
  });
  return {
    title: t("title"),
    description: t("description"),
    robots: "noindex, nofollow",
  };
};

export default function CatchAllPage() {
  notFound();
}
