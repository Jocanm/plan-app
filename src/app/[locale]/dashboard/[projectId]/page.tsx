import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectDetails } from "@/features/projects/app/actions/projects.actions";
import { TaskCard } from "@/features/tasks/components/TaskCard";
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

  if (!projectDetails) return null;

  return (
    <Main>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight tracking-tight">
          {projectDetails.name}
        </h1>
      </div>
      <ul className="space-y-4">
        <TaskCard
          id="1"
          color="#4F46E5"
          title="Design homepage"
          description="Create a modern and responsive design for the homepage."
        />
        <TaskCard
          id="2"
          color="#FBBF24"
          title="Implement authentication"
          description="Set up user login and registration functionality."
        />
        <TaskCard
          id="3"
          color="#10B981"
          title="Set up database"
          description="Configure the database schema and initial data."
        />
      </ul>
    </Main>
  );
};

export default ProjectPage;
