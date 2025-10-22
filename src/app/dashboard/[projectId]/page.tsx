const ProjectPage = async (props: PageProps<"/dashboard/[projectId]">) => {
  const { projectId } = await props.params;
  const search = await props.searchParams;

  return <div>Project: {projectId}</div>;
};

export default ProjectPage;
