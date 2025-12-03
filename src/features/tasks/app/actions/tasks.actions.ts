"use server";

import { logger } from "@/lib/logger";
import { ValidationErrorCode } from "@/shared/types/results";
import { createErrorResult, IResult } from "@/shared/utils/resultPattern";
import { updateTag } from "next/cache";
import { getCurrentUser } from "../../../auth/app/queries/getCurrentUser";
import { projectsTags } from "../../../projects/app/cache/tags";
import { tasksRepository } from "../../data/tasks.repository.factory";
import { TaskEvents } from "../../domain/events/catalog";
import { CreateTaskErrorCode } from "../../domain/types/results";
import { Task } from "../../domain/types/task";
import { createTaskSchema } from "../schemas/createTask.schema";
import { taskUseCases } from "../use-cases/taskUseCases";

export type CreateTaskActionErrorCode =
  | CreateTaskErrorCode
  | ValidationErrorCode;

export type CreateTaskActionResult = IResult<Task, CreateTaskActionErrorCode>;

export const createTask = async (data: {
  id?: string;
  title: string;
  projectId: string;
}): Promise<CreateTaskActionResult> => {
  const parsedData = createTaskSchema.safeParse(data);
  if (!parsedData.success) {
    logger.error(
      {
        event: TaskEvents.validationFail,
        input: data,
      },
      "Task validation failed"
    );
    return createErrorResult("VALIDATION_ERROR", "Invalid task data");
  }

  const currentUser = await getCurrentUser();
  const response = await taskUseCases.createTask({
    repo: tasksRepository,
    data: { ...parsedData.data, userId: currentUser.id },
  });

  if (response.result) {
    logger.info(
      {
        event: TaskEvents.created,
        userId: currentUser.id,
        taskId: response.result.id,
        taskTitle: response.result.title,
        projectId: data.projectId,
      },
      "Task created successfully"
    );
    updateTag(projectsTags.byId(data.projectId));
  } else if (response.error) {
    logger.error(
      {
        event: TaskEvents.createFail,
        userId: currentUser.id,
        error: response.error.message,
        input: parsedData.data,
      },
      "Failed to create task"
    );
  }

  return response;
};
