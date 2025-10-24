import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { getProjectsForSidebar } from "@/features/projects/app/actions/projects.actions";
import { SidebarLink } from "../../SidebarLink";

export const Projects = async () => {
  const currentUser = await getCurrentUser();
  const projects = await getProjectsForSidebar(currentUser.id);

  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>
          <SidebarLink href={`/dashboard/${project.id}`}>
            <SidebarLink.Color dot={project.color} />
            <SidebarLink.Label>{project.name}</SidebarLink.Label>
          </SidebarLink>
        </li>
      ))}
    </ul>
  );
};
