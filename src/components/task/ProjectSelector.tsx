import * as React from "react";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";

interface Project {
  id: string;
  name: string;
  color: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject?: string;
  onProjectChange?: (projectId: string) => void;
  placeholder?: string;
  className?: string;
}

function ProjectSelector({
  projects,
  selectedProject,
  onProjectChange,
  placeholder = "Select project",
  className,
  ref,
}: ProjectSelectorProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <Select value={selectedProject} onValueChange={onProjectChange}>
      <SelectTrigger ref={ref} className={className}>
        <SelectValue placeholder={placeholder}>
          {selectedProjectData && (
            <div className="flex items-center space-x-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: selectedProjectData.color }}
              />
              <span>{selectedProjectData.name}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {projects.map(project => (
          <SelectItem key={project.id} value={project.id}>
            <div className="flex items-center space-x-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span>{project.name}</span>
              {selectedProject === project.id && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { ProjectSelector, type ProjectSelectorProps, type Project };
