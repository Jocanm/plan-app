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

  const handleTaskCreationError = (
    error: IError<CreateTaskActionErrorCode>,
    taskId: string,
    draftTitle: string
  ) => {
    const currentTitle = methods.getValues("title");
    if (!currentTitle) {
      methods.setValue("title", draftTitle);
    }

    removeOptimisticTask(taskId);

    const message =
      error.code === "VALIDATION_ERROR"
        ? tCommon("errors.validation_error")
        : tCommon("errors.unknown_error");
    toast.error(message);
  };

  const onSubmit = async (data: CreateTaskSchema, projectId: string) => {
    if (!user) {
      toast.error(tCommon("errors.not_authenticated"));
      return;
    }

    const userId = user.id;

    startTransition(async () => {
      const taskId = crypto.randomUUID();
      const optimisticTask = buildOptimisticTask({
        ...data,
        projectId,
        id: taskId,
        userId,
      });

      addOptimisticTask(optimisticTask);
      methods.reset();

      const response = await createTask({ ...data, projectId, id: taskId });

      if (response.error) {
        handleTaskCreationError(response.error, taskId, data.title);
      }
    });
  };

  return { methods, isLoading: isPending, onSubmit };
};
