import { IError } from "@/shared/utils/resultPattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createTask,
  CreateTaskActionErrorCode,
} from "../actions/tasks.actions";
import {
  createTaskSchema,
  CreateTaskSchema,
} from "../schemas/createTask.schema";

export const useCreateTask = () => {
  const tCommon = useTranslations("common");
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(createTaskSchema),
  });

  const handleErrors = ({ code }: IError<CreateTaskActionErrorCode>) => {
    let toastMessage: string;
    if (code === "VALIDATION_ERROR") {
      toastMessage = tCommon("errors.validation_error");
    } else {
      toastMessage = tCommon("errors.unknown_error");
    }
    toast.error(toastMessage);
  };

  const onSubmit = async (data: CreateTaskSchema, projectId: string) => {
    setIsLoading(true);
    const response = await createTask({ ...data, projectId });
    setIsLoading(false);

    if (response.error) {
      handleErrors(response.error);
    }

    if (response.result) {
      methods.reset();
    }
  };

  return { methods, isLoading, onSubmit };
};
