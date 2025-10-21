import { getTranslations } from "next-intl/server";
import { SidebarLink } from "../SidebarLink";

export const SidebarProjectsSegment = async () => {
  const t = await getTranslations("sidebar");

  return (
    <nav aria-labelledby="sidebar-projects-segment-title" className="space-y-4">
      <h3
        id="sidebar-projects-segment-title"
        className="text-sm font-semibold text-muted-foreground"
      >
        {t("projects.title")}
      </h3>
      <ul>
        <li>
          <SidebarLink href="/dashboard/project-alpha">
            <SidebarLink.Color dot="bg-red-500" />
            <SidebarLink.Label>Project Alpha</SidebarLink.Label>
            <SidebarLink.Badge>3</SidebarLink.Badge>
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/dashboard/project-beta">
            <SidebarLink.Color dot="bg-blue-500" />
            <SidebarLink.Label>Project Beta</SidebarLink.Label>
            <SidebarLink.Badge>5</SidebarLink.Badge>
          </SidebarLink>
        </li>
        <li>
          <SidebarLink href="/dashboard/project-gamma">
            <SidebarLink.Color dot="bg-yellow-500" />
            <SidebarLink.Label>Project Gamma</SidebarLink.Label>
            <SidebarLink.Badge>3</SidebarLink.Badge>
          </SidebarLink>
        </li>
      </ul>
    </nav>
  );
};
