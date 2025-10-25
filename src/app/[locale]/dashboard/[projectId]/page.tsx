const ProjectPage = async (
  props: PageProps<"/[locale]/dashboard/[projectId]">
) => {
  const { projectId } = await props.params;

  return <div>Project: {projectId}</div>;
};

export default ProjectPage;
