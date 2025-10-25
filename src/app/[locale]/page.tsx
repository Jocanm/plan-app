import { redirect } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { ROUTES } from "../../lib/config/constants";

const HomePage = ({ params }: PageProps<"/[locale]">) => {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  redirect({
    href: ROUTES.DASHBOARD,
    locale: locale as Locale,
  });

  return null;
};

export default HomePage;
