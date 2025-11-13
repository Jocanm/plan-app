"use client";

import {
  CalendarIntegrationIcon,
  CollaborationIcon,
  TaskOrganizationIcon,
} from "@/shared/components/icons/FeatureIcons";
import { useTranslations } from "next-intl";

/**
 * FeatureList - Login page feature list
 *
 * Displays the 3 core product features:
 * - Task Organization (success theme)
 * - Calendar Integration (primary theme)
 * - Team Collaboration (warning theme)
 *
 * Features staggered animations (100ms, 200ms, 300ms delays)
 */

export const FeatureList = () => {
  const t = useTranslations("login");

  return (
    <ul className="space-y-6">
      {/* Task Organization */}
      <li className="flex items-center gap-4 group animate-fade-in-up animation-delay-100">
        <div className="w-12 h-12 rounded-xl bg-success/15 shadow-md shadow-success/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-success/20 transition-all duration-300">
          <TaskOrganizationIcon />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">
            {t("beautiful_task_organization")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("organize_with_drag_and_drop")}
          </p>
        </div>
      </li>

      {/* Calendar Integration */}
      <li className="flex items-center gap-4 group animate-fade-in-up animation-delay-200">
        <div className="w-12 h-12 rounded-xl bg-primary/15 shadow-md shadow-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
          <CalendarIntegrationIcon />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">
            {t("calendar_integration")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("schedule_seamlessly")}
          </p>
        </div>
      </li>

      {/* Team Collaboration */}
      <li className="flex items-center gap-4 group animate-fade-in-up animation-delay-300">
        <div className="w-12 h-12 rounded-xl bg-warning/15 shadow-md shadow-warning/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-warning/20 transition-all duration-300">
          <CollaborationIcon />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">
            {t("team_collaboration")}
          </h3>
          <p className="text-muted-foreground text-sm">{t("work_together")}</p>
        </div>
      </li>
    </ul>
  );
};
