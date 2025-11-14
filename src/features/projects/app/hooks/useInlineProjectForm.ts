import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSidebarStore } from "../../../../shared/stores/useSidebarStore";
import { createProject } from "../actions/projects.actions";
import {
  createProjectSchema,
  CreateProjectSchema,
} from "../schemas/createProject.schema";

export const useInlineProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setShowInlineForm = useSidebarStore(s => s.setShowInlineProjectForm);

  const formMethods = useForm({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = async (data: CreateProjectSchema) => {
    setIsLoading(true);
    await createProject(data);
    setIsLoading(false);
    setShowInlineForm(false);
    formMethods.reset();
  };

  const handleSubmit = formMethods.handleSubmit(onSubmit);

  return {
    isLoading,
    formMethods,
    handleSubmit,
  };
};
