"use server";

import { ValidationErrorCode } from "@/shared/types/results";
import { createErrorResult, IResult } from "@/shared/utils/resultPattern";
import { updateTag } from "next/cache";
import { getCurrentUser } from "../../../auth/app/actions/getCurrentUser";
import { tasksRepository } from "../../data/tasks.repository.factory";
import { CreateTaskErrorCode } from "../../domain/types/results";
import { Task } from "../../domain/types/task";
import { createTaskSchema } from "../schemas/createTask.schema";
import { taskUseCases } from "../use-cases/taskUseCases";

export type CreateTaskActionErrorCode =
  | CreateTaskErrorCode
  | ValidationErrorCode;

export const createTask = async (data: {
  title: string;
  projectId: string;
}): Promise<IResult<Task, CreateTaskActionErrorCode>> => {
  const parsedData = createTaskSchema.safeParse(data);
  if (!parsedData.success) {
    return createErrorResult("VALIDATION_ERROR", "Invalid task data");
  }

  const currentUser = await getCurrentUser();
  const response = await taskUseCases.createTask({
    repo: tasksRepository,
    data: { ...parsedData.data, userId: currentUser.id },
  });

  if (response.result) {
    updateTag(`project-${data.projectId}`);
  }
  return response;
};
