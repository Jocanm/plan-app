"use client";

import { CustomInput } from "@/shared/components/custom/CustomInput";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import { useTranslations } from "next-intl";
import { useInlineProjectForm } from "../../app/hooks/actions/useInlineProjectForm";

interface InlineProjectFormProps {
  projectsCount?: number;
}

export const InlineProjectForm = ({
  projectsCount,
}: InlineProjectFormProps) => {
  const t = useTranslations("project.form");
  const setShowInlineForm = useSidebarStore(s => s.setShowInlineProjectForm);

  const { formMethods, isLoading, onSubmit, getTranslatedError } =
    useInlineProjectForm();

  return (
    <form
      data-testid="sidebar-inline-project-form"
      onSubmit={formMethods.handleSubmit(data => onSubmit(data, projectsCount))}
    >
      <CustomInput
        autoFocus
        showBaseLoader={isLoading}
        placeholder={t("placeholder_name")}
        data-testid="create-project-inline-input"
        errorMessage={getTranslatedError("name")}
        {...formMethods.register("name", {
          disabled: isLoading,
          onBlur: () => setShowInlineForm(false),
        })}
      />
    </form>
  );
};
