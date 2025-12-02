import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/lib/config/constants";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import { buildPath } from "@/shared/utils/buildPath";
import { IError } from "@/shared/utils/resultPattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createProject,
  CreateProjectActionErrorCode,
} from "../../actions/projects.actions";
import {
  createProjectSchema,
  CreateProjectSchema,
} from "../../schemas/createProject.schema";

export const useInlineProjectForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setShowInlineForm = useSidebarStore(s => s.setShowInlineProjectForm);
  const t = useTranslations("project.form.errors");

  const formMethods = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  });

  const setCustomError = (
    field: keyof CreateProjectSchema,
    message: string
  ) => {
    formMethods.setError(
      field,
      { type: "custom", message },
      { shouldFocus: true }
    );
  };

  const translateError = (key: string): string => {
    // @ts-expect-error - key comes from Zod dynamically, but we validate existence with has()
    return t.has(key) ? t(key) : key;
  };

  const getTranslatedError = (field: keyof CreateProjectSchema) => {
    const errorMessage = formMethods.formState.errors[field]?.message;
    return errorMessage && translateError(errorMessage);
  };

  const handleErrors = (error: IError<CreateProjectActionErrorCode>) => {
    let errorMessage: string;

    if (error.code === "VALIDATION_ERROR") {
      errorMessage = translateError(error.message);
    } else if (error.code === "UNAUTHORIZED") {
      errorMessage = t("unauthorized");
    } else {
      errorMessage = t("unknown_error");
    }

    setCustomError("name", errorMessage);
  };

  const onSubmit = async (
    data: CreateProjectSchema,
    projectsCount?: number
  ) => {
    setIsLoading(true);
    const { result: project, error } = await createProject(data);
    setIsLoading(false);
    if (error) {
      return handleErrors(error);
    }

    if (projectsCount === 0) {
      const projectPath = buildPath(ROUTES.PROJECT, {
        projectId: project.id,
      });
      router.push(projectPath);
    }

    setShowInlineForm(false);
    formMethods.reset();
  };

  return {
    isLoading,
    formMethods,

    onSubmit,
    getTranslatedError,
  };
};
