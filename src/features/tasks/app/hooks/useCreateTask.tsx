import { IError } from "@/shared/utils/resultPattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  const tCommon = useTranslations("common");
  const { addOptimisticTask } = useProjectTasks();
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      const customId = crypto.randomUUID();
      const optimisticTask = buildOptimisticTask({
        ...data,
        projectId,
        id: customId,
        userId: "optimistic-user",
      });
      addOptimisticTask(optimisticTask);
      methods.reset();

      const response = await createTask({ ...data, projectId, id: customId });
      if (response.error) {
        handleErrors(response.error);
      }
    });
  };

  return { methods, isLoading: isPending, onSubmit };
};
