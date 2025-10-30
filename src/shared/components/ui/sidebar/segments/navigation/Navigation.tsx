"use client";

import { usePathname } from "@/i18n/navigation";
import { ROUTES } from "@/lib/config/constants";
import clsx from "clsx";
import { Calendar, Home, SquareCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";
import { SidebarLink } from "../../SidebarLink";

export const Navigation = () => {
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const isLinkActive = (linkPath: string) => {
    return pathname === linkPath;
  };

  return (
    <ul>
      <li>
        <SidebarLink
          href={ROUTES.DASHBOARD}
          aria-current={isLinkActive(ROUTES.DASHBOARD) ? "page" : undefined}
          isActive={isLinkActive(ROUTES.DASHBOARD)}
        >
          <SidebarLink.Icon>
            <Home size={16} />
          </SidebarLink.Icon>
          <SidebarLink.Label>{t("navigation.todays_link")}</SidebarLink.Label>
          <SidebarLink.Badge
            className={clsx(isLinkActive(ROUTES.DASHBOARD) && "border-primary")}
          >
            3
          </SidebarLink.Badge>
        </SidebarLink>
      </li>
      <li>
        <SidebarLink
          href={ROUTES.CALENDAR}
          aria-current={isLinkActive(ROUTES.CALENDAR) ? "page" : undefined}
          isActive={isLinkActive(ROUTES.CALENDAR)}
        >
          <SidebarLink.Icon>
            <Calendar size={16} />
          </SidebarLink.Icon>
          <SidebarLink.Label>{t("navigation.calendar_link")}</SidebarLink.Label>
        </SidebarLink>
      </li>
      <li>
        <SidebarLink
          href={ROUTES.TASKS}
          aria-current={isLinkActive(ROUTES.TASKS) ? "page" : undefined}
          isActive={isLinkActive(ROUTES.TASKS)}
        >
          <SidebarLink.Icon>
            <SquareCheckBig size={16} />
          </SidebarLink.Icon>
          <SidebarLink.Label>{t("navigation.tasks_link")}</SidebarLink.Label>
          <SidebarLink.Badge
            ariaLabel={t("number_of_tasks", { count: 3 })}
            className={clsx(isLinkActive(ROUTES.TASKS) && "border-primary")}
          >
            3
          </SidebarLink.Badge>
        </SidebarLink>
      </li>
    </ul>
  );
};
