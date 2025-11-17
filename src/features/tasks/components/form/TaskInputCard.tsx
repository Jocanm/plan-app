import { Button } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input/Input";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";

export const TaskInputCard = () => {
  const t = useTranslations("task.form");

  return (
    <div className="group w-full p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 border-l-[3px] border-l-primary">
      <div className="flex items-center gap-3.5">
        <div className="flex-1 relative">
          <label htmlFor="new-task-input" className="sr-only">
            {t("aria_label")}
          </label>
          <div className="bg-background/60 rounded-xl px-4 py-3 border border-border/40 group-focus-within:border-primary/40 group-focus-within:bg-background transition-all">
            <Input
              id="new-task-input"
              placeholder={t("placeholder")}
              aria-label={t("aria_label")}
              autoComplete="off"
              className="border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-6 text-[15px]"
            />
          </div>
        </div>

        <Button
          size="lg"
          className="shrink-0 h-11 w-11 p-0 rounded-xl shadow-sm hover:shadow-md"
          aria-label={t("submit_aria_label")}
        >
          <CirclePlus size={20} aria-hidden="true" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};
