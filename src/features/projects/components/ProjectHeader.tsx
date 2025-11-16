import { Button } from "@/shared/components/ui";
import { Archive, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "../domain/types/project";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const t = useTranslations("project");

  return (
    <div className="w-full mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="rounded-sm h-3 w-3 shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <h1
          title={project.name}
          data-testid="project-header-title"
          className="text-2xl font-bold leading-tight tracking-tight"
        >
          {project.name}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled
          type="button"
          variant="ghost"
          className="flex items-center gap-2"
        >
          <Pencil size={16} aria-hidden="true" />
          <span>{t("edit_button")}</span>
        </Button>
        <Button
          disabled
          type="button"
          variant="ghost"
          className="flex items-center gap-2"
        >
          <Archive size={16} aria-hidden="true" />
          <span>{t("archive_button")}</span>
        </Button>
      </div>
    </div>
  );
};
