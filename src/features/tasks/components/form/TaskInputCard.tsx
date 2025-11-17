import { Button } from "@/shared/components/ui";
import { CustomInput } from "@/shared/components/ui/input/CustomInput";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export const TaskInputCard = () => {
  const t = useTranslations("task.form");

  return (
    <div
      role="form"
      aria-label={t("aria_label")}
      className="p-4 border-2 border-dashed border-muted-foreground/30 bg-card rounded-lg w-full h-24 hover:border-primary/70 transition-colors"
    >
      <div className="flex items-start gap-3 h-full">
        <div className="flex-1 my-auto">
          <label htmlFor="new-task-input" className="sr-only">
            {t("aria_label")}
          </label>
          <CustomInput
            id="new-task-input"
            placeholder={t("placeholder")}
            aria-label={t("aria_label")}
          />
        </div>

        <Button
          size="lg"
          variant="ghost"
          className="shrink-0 h-10 my-auto"
          aria-label={t("submit_aria_label")}
        >
          <Plus size={20} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
