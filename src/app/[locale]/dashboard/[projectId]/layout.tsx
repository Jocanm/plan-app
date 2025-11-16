import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export function generateStaticParams() {
  return [{ projectId: "__placeholder" }];
}

const LayoutPage = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; projectId: string }>;
}) => {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return children;
};

export default LayoutPage;
