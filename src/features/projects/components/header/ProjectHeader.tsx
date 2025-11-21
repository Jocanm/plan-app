import { TaskInputCard } from "../../../tasks/components/form/TaskInputCard";
import { Project } from "../../domain/types/project";
import { ProjectHeaderActions } from "./ProjectHeaderActions";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="w-full mb-4 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="rounded-sm h-3 w-3 shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <h1
            title={project.name}
            data-testid="project-header-title"
            className="text-xl xs:text-2xl font-bold leading-tight tracking-tight"
          >
            {project.name}
          </h1>
        </div>
        <ProjectHeaderActions projectName={project.name} />
      </div>
      <TaskInputCard projectId={project.id} />
    </div>
  );
};
