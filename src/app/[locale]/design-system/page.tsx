import { Button } from "@/shared/components/ui/Button";
import { Main } from "@/shared/components/ui/main/Main";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "design_system" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: "noindex, nofollow", // Keep internal, not for search engines
  };
};

export default async function DesignSystemPage({
  params,
}: PageProps<"/[locale]/design-system">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "design_system",
  });

  return (
    <Main className="container mx-auto p-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </header>

      <section aria-labelledby="colors-heading" className="mb-12">
        <h2 id="colors-heading" className="text-2xl font-semibold mb-4">
          {t("colors_heading")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            <div className="font-medium">{t("color_primary")}</div>
            <div className="text-sm opacity-90">{t("color_primary_desc")}</div>
          </div>
          <div className="p-4 bg-success text-success-foreground rounded-lg">
            <div className="font-medium">{t("color_success")}</div>
            <div className="text-sm opacity-90">{t("color_success_desc")}</div>
          </div>
          <div className="p-4 bg-warning text-warning-foreground rounded-lg">
            <div className="font-medium">{t("color_warning")}</div>
            <div className="text-sm opacity-90">{t("color_warning_desc")}</div>
          </div>
          <div className="p-4 bg-danger text-danger-foreground rounded-lg">
            <div className="font-medium">{t("color_danger")}</div>
            <div className="text-sm opacity-90">{t("color_danger_desc")}</div>
          </div>
        </div>
      </section>

      <section aria-labelledby="buttons-heading" className="mb-12">
        <h2 id="buttons-heading" className="text-2xl font-semibold mb-4">
          {t("buttons_heading")}
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">{t("button_default")}</Button>
            <Button variant="secondary">{t("button_secondary")}</Button>
            <Button variant="outline">{t("button_outline")}</Button>
            <Button variant="ghost">{t("button_ghost")}</Button>
            <Button variant="link">{t("button_link")}</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="destructive">{t("button_destructive")}</Button>
            <Button disabled>{t("button_disabled")}</Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="accessibility-heading">
        <h2 id="accessibility-heading" className="text-2xl font-semibold mb-4">
          {t("accessibility_heading")}
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• {t("accessibility_feature_1")}</li>
          <li>• {t("accessibility_feature_2")}</li>
          <li>• {t("accessibility_feature_3")}</li>
          <li>• {t("accessibility_feature_4")}</li>
          <li>• {t("accessibility_feature_5")}</li>
        </ul>
      </section>
    </Main>
  );
}
