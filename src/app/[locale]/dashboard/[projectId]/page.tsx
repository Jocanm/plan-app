import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectDetails } from "@/features/projects/app/actions/projects.actions";
import { Main } from "@/shared/components/ui/main/Main";
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
  // const t = await getTranslations("project");

  if (!projectDetails) return null;

  return (
    <Main>
      <h1 className="text-2xl font-bold leading-tight tracking-tight">
        {projectDetails.name}
      </h1>
      {/* <p className="mt-2 text-md text-muted-foreground">
        {t("tasks_completed", { completed: "1", total: 1 })}
      </p> */}
    </Main>
  );
};

export default ProjectPage;
