import { getTranslations } from "next-intl/server";
import { Navigation } from "./Navigation";

export const SidebarNavigationSegment = async () => {
  const t = await getTranslations("sidebar");

  return (
    <nav
      role="navigation"
      className="space-y-2"
      aria-labelledby="sidebar-navigation-segment-title"
    >
      <h3
        id="sidebar-navigation-segment-title"
        className="text-sm font-semibold text-muted-foreground"
      >
        {t("navigation.title")}
      </h3>
      <Navigation />
    </nav>
  );
};
