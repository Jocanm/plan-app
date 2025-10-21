import { Settings } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PlanLogo } from "../../icons/PlanLogo";
import { SidebarNavigationSegment } from "./segments/SidebarNavigationSegment";
import { SidebarProjectsSegment } from "./segments/SidebarProjectsSegment";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = async () => {
  const t = await getTranslations();

  return (
    <aside
      aria-label="Sidebar"
      className="w-70 h-full border-r py-6 flex flex-col bg-muted/50"
    >
      <section className="flex items-center gap-2 pb-6 border-b px-6">
        <PlanLogo size="md" />
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {t("common.app_name")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("sidebar.welcome_back")}
          </p>
        </div>
      </section>

      <section className="h-full px-6 flex flex-col py-6 gap-6">
        <SidebarNavigationSegment />
        <SidebarProjectsSegment />
      </section>

      <section aria-label="Configuration" className="px-6">
        <SidebarLink href="/settings">
          <SidebarLink.Icon>
            <Settings size={16} />
          </SidebarLink.Icon>
          <SidebarLink.Label>{t("sidebar.settings.title")}</SidebarLink.Label>
        </SidebarLink>
      </section>
    </aside>
  );
};
