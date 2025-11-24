import { IError } from "@/shared/utils/resultPattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentUser } from "../../../auth/app/hooks/useCurrentUser";
import { useProjectTasks } from "../../../projects/components/providers/ProjectTasksProvider";
import { buildOptimisticTask } from "../../domain/factories";
import {
  createTask,
  CreateTaskActionErrorCode,
} from "../actions/tasks.actions";
import {
  createTaskSchema,
  CreateTaskSchema,
} from "../schemas/createTask.schema";

export const useCreateTask = () => {
  const user = useCurrentUser();
  const tCommon = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const { addOptimisticTask, removeOptimisticTask } = useProjectTasks();

  const methods = useForm({
    resolver: zodResolver(createTaskSchema),
  });

  const getCurrentTitle = () => {
    return methods.getValues("title");
  };

  const handleErrorMessage = ({ code }: IError<CreateTaskActionErrorCode>) => {
    let toastMessage: string;
    if (code === "VALIDATION_ERROR") {
      toastMessage = tCommon("errors.validation_error");
    } else {
      toastMessage = tCommon("errors.unknown_error");
    }
    toast.error(toastMessage);
  };

  const onSubmit = async (data: CreateTaskSchema, projectId: string) => {
    if (!user) return;

    startTransition(async () => {
      const customId = crypto.randomUUID();
      const optimisticTask = buildOptimisticTask({
        ...data,
        projectId,
        id: customId,
        userId: user.id,
      });
      addOptimisticTask(optimisticTask);
      methods.reset();

      const response = await createTask({ ...data, projectId, id: customId });
      if (response.error) {
        const currentTitle = getCurrentTitle();
        if (!currentTitle) {
          methods.setValue("title", optimisticTask.title);
        }
        removeOptimisticTask(customId);
        handleErrorMessage(response.error);
      }
    });
  };

  return { methods, isLoading: isPending, onSubmit };
};
