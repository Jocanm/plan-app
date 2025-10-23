"use client";

import clsx from "clsx";
import { Calendar, Home, SquareCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ROUTES } from "../../../../../../lib/config/constants";
import { SidebarLink } from "../../SidebarLink";

const ACTIVE_LINK_CLASS =
  "bg-primary/10 text-primary-active hover:bg-primary/10 hover:text-primary-active";

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
          className={clsx(isLinkActive(ROUTES.DASHBOARD) && ACTIVE_LINK_CLASS)}
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
          className={clsx(isLinkActive(ROUTES.CALENDAR) && ACTIVE_LINK_CLASS)}
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
          className={clsx(isLinkActive(ROUTES.TASKS) && ACTIVE_LINK_CLASS)}
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
