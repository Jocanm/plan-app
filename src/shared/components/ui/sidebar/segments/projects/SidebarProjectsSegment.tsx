import { getTranslations } from "next-intl/server";
import { SegmentSuspense } from "../SegmentSuspense";
import { Projects } from "./Projects";

export const SidebarProjectsSegment = async () => {
  const t = await getTranslations("sidebar");

  return (
    <nav
      role="navigation"
      className="space-y-4"
      aria-labelledby="sidebar-projects-segment-title"
    >
      <h3
        id="sidebar-projects-segment-title"
        className="text-sm font-semibold text-muted-foreground"
      >
        {t("projects.title")}
      </h3>
      <SegmentSuspense>
        <Projects />
      </SegmentSuspense>
    </nav>
  );
};
