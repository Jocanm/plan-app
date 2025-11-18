"use client";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/shared/components/custom/CustomInput";
import { useFormErrorTranslator } from "@/shared/hooks/useErrorTranslator";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCreateTask } from "../../app/hooks/useCreateTask";
import { MAX_TASK_TITLE_LENGTH } from "../../domain/constants";

interface TaskInputCardProps {
  projectId: string;
}

export const TaskInputCard = ({ projectId }: TaskInputCardProps) => {
  const t = useTranslations("task.form");
  const translateError = useFormErrorTranslator("task.form.validation", {
    max: MAX_TASK_TITLE_LENGTH,
  });

  const { methods, isLoading, onSubmit } = useCreateTask();
  const errors = methods.formState.errors;

  return (
    <div className="group w-full p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 border-l-[3px] border-l-primary">
      <form
        className="flex items-center gap-3.5"
        onSubmit={methods.handleSubmit(data => onSubmit(data, projectId))}
      >
        <div className="flex-1 relative">
          <label htmlFor="new-task-input" className="sr-only">
            {t("aria_label")}
          </label>
          <div className="bg-background/60 rounded-xl px-4 py-3 border border-border/40 group-focus-within:border-primary/40 group-focus-within:bg-background transition-all">
            <CustomInput
              id="new-task-input"
              placeholder={t("placeholder")}
              aria-label={t("aria_label")}
              autoComplete="off"
              className="border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-6"
              disabled={isLoading}
              showBaseLoader={isLoading}
              errorMessage={translateError(errors.title?.message)}
              {...methods.register("title", {
                onBlur: () => methods.clearErrors(),
              })}
            />
          </div>
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={isLoading}
          aria-label={t("submit_aria_label")}
          className="shrink-0 h-11 w-11 p-0 rounded-xl shadow-sm hover:shadow-md"
        >
          <CirclePlus size={20} aria-hidden="true" strokeWidth={2} />
        </Button>
      </form>
    </div>
  );
};
