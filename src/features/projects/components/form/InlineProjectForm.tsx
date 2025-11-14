"use client";

import { CustomInput } from "@/shared/components/ui/input/CustomInput";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import { useInlineProjectForm } from "../../app/hooks/useInlineProjectForm";

export const InlineProjectForm = () => {
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
        placeholder="Project Name"
        errorMessage={errors.name?.message}
        {...register("name", {
          disabled: isLoading,
          onBlur: () => setShowInlineForm(false),
        })}
      />
    </form>
  );
};
