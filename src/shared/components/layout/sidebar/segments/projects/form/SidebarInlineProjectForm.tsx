"use client";

import { InlineProjectForm } from "@/features/projects/components/form/InlineProjectForm";
import { useSidebarStore } from "../../../../../../stores/useSidebarStore";

interface SidebarInlineProjectFormProps {
  projectsCount?: number;
}

export const SidebarInlineProjectForm = ({
  projectsCount,
}: SidebarInlineProjectFormProps) => {
  const showInlineForm = useSidebarStore(s => s.showInlineProjectForm);

  if (!showInlineForm) {
    return null;
  }

  return (
    <div className="p-2">
      <InlineProjectForm projectsCount={projectsCount} />
    </div>
  );
};
