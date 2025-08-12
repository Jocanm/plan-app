"use client";

import { useState } from "react";
import { Label } from "@/components/ui";
import { ProjectSelector, type Project } from "@/components/task";

interface InteractiveProjectSelectorProps {
  projects: Project[];
}

export function InteractiveProjectSelector({ projects }: InteractiveProjectSelectorProps) {
  const [selectedProject, setSelectedProject] = useState<string>();

  return (
    <div className="space-y-2">
      <Label>Project Selector</Label>
      <ProjectSelector
        projects={projects}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        className="max-w-xs"
      />
    </div>
  );
}