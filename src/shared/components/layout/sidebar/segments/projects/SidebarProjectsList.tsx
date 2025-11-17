import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectsForSidebar } from "@/features/projects/app/actions/projects.actions";
import { InlineError } from "../../../../errors/InlineError";
import { SidebarNoProjects } from "./SidebarNoProjects";
import { SidebarProjectItem } from "./SidebarProjectItem";
import { SidebarInlineProjectForm } from "./form/SidebarInlineProjectForm";

export const SidebarProjectsList = async () => {
  const currentUser = await getCurrentUser();
  const { result: projects, error } = await getProjectsForSidebar(
    currentUser.id
  );

  if (error) {
    return <InlineError />;
  }

  if (projects.length === 0) {
    return <SidebarNoProjects />;
  }

  return (
    <ul data-testid="sidebar-projects-segment">
      <SidebarInlineProjectForm />
      {projects.map(project => (
        <SidebarProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};
