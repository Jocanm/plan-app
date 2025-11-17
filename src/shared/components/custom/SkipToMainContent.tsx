import { getTranslations } from "next-intl/server";

export const SkipToMainContent = async () => {
  const t = await getTranslations("common");

  return (
    <a href="#main-content" className="skip-link">
      {t("skip_to_main_content")}
    </a>
  );
};
