import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectDetails } from "@/features/projects/app/actions/projects.actions";
import { Main } from "@/shared/components/ui/main/Main";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const ProjectPage = async ({
  params,
}: PageProps<"/[locale]/dashboard/[projectId]">) => {
  const { projectId, locale } = await params;

  setRequestLocale(locale as Locale);

  const currentUser = await getCurrentUser();
  const projectDetails = await getProjectDetails(projectId, currentUser.id);
  return <Main>{projectDetails?.name}</Main>;
};

export default ProjectPage;
