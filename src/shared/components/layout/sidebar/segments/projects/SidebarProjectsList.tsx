import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { getProjectsForSidebar } from "@/features/projects/app/queries/projects.queries";
import { projectsTags } from "@/lib/cache";
import { updateTag } from "next/cache";
import { InlineError } from "../../../../errors/inline/InlineError";
import { SidebarNoProjects } from "./SidebarNoProjects";
import { SidebarProjectItem } from "./SidebarProjectItem";
import { SidebarInlineProjectForm } from "./form/SidebarInlineProjectForm";

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
      <SidebarInlineProjectForm />
      {projects.map(project => (
        <SidebarProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};
