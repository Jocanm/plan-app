import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "../../../Button";
import { SegmentSuspense } from "../SegmentSuspense";
import { SidebarProjectsList } from "./SidebarProjectsList";

export const SidebarProjectsSegment = async () => {
  const t = await getTranslations("sidebar");

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
          {t("projects.title")}
        </h3>
        <Button
          disabled
          size="xs"
          variant="ghost"
          className="text-muted-foreground"
          aria-label={t("projects.add_project")}
        >
          <Plus size={16} aria-hidden="true" />
        </Button>
      </section>
      <SegmentSuspense>
        <SidebarProjectsList />
      </SegmentSuspense>
    </nav>
  );
};
