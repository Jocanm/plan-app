import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectsForSidebar } from "@/features/projects/app/actions/projects.actions";
import { getTranslations } from "next-intl/server";
import { Button } from "../../../Button";
import { SidebarProjectItem } from "./SidebarProjectItem";

const getProjects = async () => {
  const currentUser = await getCurrentUser();
  const projects = await getProjectsForSidebar(currentUser.id);
  return projects;
};

export const SidebarProjectsList = async () => {
  const [t, projects] = await Promise.all([
    getTranslations("sidebar"),
    getProjects(),
  ]);

  if (projects.length === 0) {
    return (
      <section
        role="status"
        className="flex justify-center"
        data-testid="sidebar-projects-segment-empty"
      >
        <Button variant="link" className="underline p-0">
          {t("projects.create_first_project")}
        </Button>
      </section>
    );
  }

  return (
    <ul data-testid="sidebar-projects-segment">
      {projects.map(project => (
        <SidebarProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};
