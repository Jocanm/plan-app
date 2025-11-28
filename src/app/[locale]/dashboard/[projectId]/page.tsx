import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { getProjectDetails } from "@/features/projects/app/queries/projects.queries";
import { ProjectHeader } from "@/features/projects/components/header/ProjectHeader";
import { ProjectTasksProvider } from "@/features/projects/components/providers/ProjectTasksProvider";
import { ProjectTasks } from "@/features/projects/components/tasks/ProjectTasks";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProject = cache(async (projectId: string) => {
  const currentUser = await getCurrentUser();
  return await getProjectDetails(projectId, currentUser.id);
});

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/dashboard/[projectId]">) => {
  const { projectId, locale } = await params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "project",
  });
  const { result: project } = await getProject(projectId);

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
  const { result: project, error } = await getProject(projectId);

  if (error) {
    throw new Error(error.message);
  }

  if (!project) {
    notFound();
  }

  return (
    <ProjectTasksProvider initialTasks={project.tasks}>
      <ProjectHeader project={project} />
      <ProjectTasks />
    </ProjectTasksProvider>
  );
};

export default ProjectPage;
