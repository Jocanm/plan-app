"use client";

import { ROUTES } from "@/lib/config/constants";
import clsx from "clsx";
import { Calendar, Home, SquareCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { SidebarLink } from "../SidebarLink";

const ACTIVE_LINK_CLASS =
  "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary";

export const SidebarNavigationSegment = () => {
  const mainNavId = useId();
  const pathname = usePathname();
  const translations = useTranslations("sidebar");

  const isLinkActive = (linkPath: string) => {
    return pathname === linkPath;
  };

  return (
    <nav aria-labelledby={mainNavId} className="space-y-2">
      <h3
        id={mainNavId}
        className="text-sm font-semibold text-muted-foreground"
      >
        {translations("navigation.title")}
      </h3>
      <ul>
        <li>
          <SidebarLink
            href={ROUTES.DASHBOARD}
            className={clsx(
              isLinkActive(ROUTES.DASHBOARD) && ACTIVE_LINK_CLASS
            )}
          >
            <SidebarLink.Icon>
              <Home size={16} />
            </SidebarLink.Icon>
            <SidebarLink.Label>
              {translations("navigation.todays_link")}
            </SidebarLink.Label>
            <SidebarLink.Badge
              className={clsx(
                isLinkActive(ROUTES.DASHBOARD) && "border-primary"
              )}
            >
              3
            </SidebarLink.Badge>
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            href={ROUTES.CALENDAR}
            className={clsx(isLinkActive(ROUTES.CALENDAR) && ACTIVE_LINK_CLASS)}
          >
            <SidebarLink.Icon>
              <Calendar size={16} />
            </SidebarLink.Icon>
            <SidebarLink.Label>
              {translations("navigation.calendar_link")}
            </SidebarLink.Label>
          </SidebarLink>
        </li>
        <li>
          <SidebarLink
            href={ROUTES.TASKS}
            className={clsx(isLinkActive(ROUTES.TASKS) && ACTIVE_LINK_CLASS)}
          >
            <SidebarLink.Icon>
              <SquareCheckBig size={16} />
            </SidebarLink.Icon>
            <SidebarLink.Label>
              {translations("navigation.tasks_link")}
            </SidebarLink.Label>
            <SidebarLink.Badge
              className={clsx(isLinkActive(ROUTES.TASKS) && "border-primary")}
            >
              3
            </SidebarLink.Badge>
          </SidebarLink>
        </li>
      </ul>
    </nav>
  );
};
