import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectDetails } from "@/features/projects/app/actions/projects.actions";
import { ProjectHeader } from "@/features/projects/components/ProjectHeader";
import { NoTasks } from "@/features/projects/components/tasks/NoTasks";
import { ProjectTasks } from "@/features/projects/components/tasks/ProjectTasks";
import { Main } from "@/shared/components/layout/main/Main";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { cache } from "react";

const getProject = cache(async (projectId: string) => {
  const currentUser = await getCurrentUser();
  const projectDetails = await getProjectDetails(projectId, currentUser.id);
  return projectDetails;
});

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/dashboard/[projectId]">) => {
  const { projectId, locale } = await params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "project",
  });
  const project = await getProject(projectId);

  return {
    title: project
      ? t("meta.title", { projectName: project.name })
      : t("meta.not_found_title"),
    description: t("meta.description"),
  };
};

const ProjectPage = async ({
  params,
}: PageProps<"/[locale]/dashboard/[projectId]">) => {
  const { projectId } = await params;
  const projectDetails = await getProject(projectId);

  if (!projectDetails) return null;
  const projectTasks = projectDetails.tasks;

  return (
    <Main>
      <ProjectHeader project={projectDetails} />
      {projectTasks.length === 0 ? (
        <NoTasks />
      ) : (
        <ProjectTasks tasks={projectTasks} />
      )}
    </Main>
  );
};

export default ProjectPage;
