import { Settings } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PlanLogo } from "../../icons/PlanLogo";
import { LogoutButton } from "./LogoutButton";
import { SidebarNavigationSegment } from "./segments/navigation/SidebarNavigationSegment";
import { SidebarProjectsSegment } from "./segments/projects/SidebarProjectsSegment";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = async () => {
  const t = await getTranslations();

  return (
    <aside className="w-70 h-full border-r py-6 flex flex-col bg-muted/50">
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

      <section
        aria-label="Configuration"
        className="px-6 space-y-2 border-t pt-4"
      >
        <SidebarLink href="/settings">
          <SidebarLink.Icon>
            <Settings size={16} />
          </SidebarLink.Icon>
          <SidebarLink.Label>{t("sidebar.settings.title")}</SidebarLink.Label>
        </SidebarLink>

        <LogoutButton />
      </section>
    </aside>
  );
};
