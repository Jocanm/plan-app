import { getTranslations } from "next-intl/server";
import { SegmentSuspense } from "../SegmentSuspense";
import { SidebarCreateProjectCta } from "./SidebarCreateProjectCta";
import { SidebarProjectsList } from "./SidebarProjectsList";

export const SidebarProjectsSegment = async () => {
  const t = await getTranslations("sidebar.projects");

  return (
    <nav
      role="navigation"
      className="space-y-4"
      aria-labelledby="sidebar-projects-segment-title"
    >
      <section className="flex items-center justify-between">
        <h3
          id="sidebar-projects-segment-title"
          className="text-sm font-semibold text-muted-foreground"
        >
          {t("title")}
        </h3>
        <SidebarCreateProjectCta />
      </section>
      <SegmentSuspense>
        <SidebarProjectsList />
      </SegmentSuspense>
    </nav>
  );
};
