"use client";

import { ProjectSidebar } from "@/features/projects/domain/types/project";
import { usePathname } from "@/i18n/navigation";
import { ROUTES } from "@/lib/config/constants";
import { buildPath } from "../../../../../../utils/buildPath";
import { SidebarLink } from "../../../SidebarLink";

interface SidebarProjectItemProps {
  project: ProjectSidebar;
}

export const SidebarProjectItem = ({ project }: SidebarProjectItemProps) => {
  const pathname = usePathname();
  const pathToProject = buildPath(ROUTES.PROJECT, { projectId: project.id });

  const isLinkActive = pathname === pathToProject;

  return (
    <li key={project.id} data-testid={`sidebar-project-item-${project.id}`}>
      <SidebarLink
        href={pathToProject}
        isActive={isLinkActive}
        aria-current={isLinkActive ? "page" : undefined}
      >
        <SidebarLink.Color dot={project.color} />
        <SidebarLink.Label>{project.name}</SidebarLink.Label>
      </SidebarLink>
    </li>
  );
};
