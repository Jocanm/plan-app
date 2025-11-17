import { Button } from "@/components/ui/button";
import { Archive, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

export const ProjectHeaderActions = () => {
  const t = useTranslations("project");

  return (
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
  );
};
