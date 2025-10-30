import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectsForSidebar } from "@/features/projects/app/actions/projects.actions";
import { SidebarProjectItem } from "./SidebarProjectItem";

export const SidebarProjectsList = async () => {
  const currentUser = await getCurrentUser();
  const projects = await getProjectsForSidebar(currentUser.id);

  return (
    <ul data-testid="sidebar-projects-segment">
      {projects.map(project => (
        <SidebarProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};
