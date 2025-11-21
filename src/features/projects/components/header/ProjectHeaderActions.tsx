import { Button } from "@/components/ui/button";
import { Archive, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  projectName: string;
}

export const ProjectHeaderActions = ({ projectName }: Props) => {
  const t = useTranslations("project.header");

  return (
    <div className="flex items-center gap-2">
      <Button
        disabled
        type="button"
        variant="ghost"
        className="flex items-center gap-2"
        aria-label={t("a11y_edit_project", { projectName })}
      >
        <Pencil size={16} aria-hidden="true" />
        <span aria-hidden="true" className="hidden xs:inline">
          {t("edit_project")}
        </span>
      </Button>
      <Button
        disabled
        type="button"
        variant="ghost"
        className="flex items-center gap-2"
        aria-label={t("a11y_archive_project", { projectName })}
      >
        <Archive size={16} aria-hidden="true" />
        <span aria-hidden="true" className="hidden xs:inline">
          {t("archive_project")}
        </span>
      </Button>
    </div>
  );
};
