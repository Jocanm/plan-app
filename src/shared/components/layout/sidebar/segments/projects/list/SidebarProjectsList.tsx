import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { projectsTags } from "@/features/projects/app/cache/tags";
import { getProjectsForSidebar } from "@/features/projects/app/queries/projects.queries";
import { updateTag } from "next/cache";
import { InlineError } from "../../../../../errors/inline/InlineError";
import { SidebarInlineProjectForm } from "../form/SidebarInlineProjectForm";
import { SidebarNoProjects } from "./SidebarNoProjects";
import { SidebarProjectItem } from "./SidebarProjectItem";

export const SidebarProjectsList = async () => {
  const currentUser = await getCurrentUser();
  const { result: projects, error } = await getProjectsForSidebar(
    currentUser.id
  );

  if (error) {
    return (
      <InlineError
        retryAction={async () => {
          "use server";
          updateTag(projectsTags.byUser(currentUser.id));
        }}
      />
    );
  }

  if (projects.length === 0) {
    return <SidebarNoProjects />;
  }

  return (
    <ul
      data-testid="sidebar-projects-segment"
      className="flex-1 overflow-y-auto min-h-0 scrollbar-thin"
    >
      <SidebarInlineProjectForm projectsCount={projects.length} />
      {projects.map(project => (
        <SidebarProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};
