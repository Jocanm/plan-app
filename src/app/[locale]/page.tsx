import { redirect } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ROUTES } from "../../lib/config/constants";

const HomePage = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  redirect({
    href: ROUTES.DASHBOARD,
    locale: locale as Locale,
  });

  return null;
};

export default HomePage;
