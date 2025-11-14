"use client";

import { CustomInput } from "@/shared/components/ui/input/CustomInput";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import { useTranslations } from "next-intl";
import { useInlineProjectForm } from "../../app/hooks/useInlineProjectForm";

export const InlineProjectForm = () => {
  const t = useTranslations("project.form");
  const setShowInlineForm = useSidebarStore(s => s.setShowInlineProjectForm);

  const { formMethods, isLoading, handleSubmit } = useInlineProjectForm();

  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <form data-testid="sidebar-inline-project-form" onSubmit={handleSubmit}>
      <CustomInput
        autoFocus
        showBaseLoader={isLoading}
        placeholder={t("placeholder_name")}
        errorMessage={errors.name?.message}
        {...register("name", {
          disabled: isLoading,
          onBlur: () => setShowInlineForm(false),
        })}
      />
    </form>
  );
};
