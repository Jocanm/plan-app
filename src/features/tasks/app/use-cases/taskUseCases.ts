import {
  createErrorResult,
  createSuccessResult,
} from "@/shared/utils/resultPattern";
import { buildCreateTaskData } from "../../domain/factories";
import { ITaskRepository } from "../../domain/types/repository";
import { CreateTaskResult } from "../../domain/types/results";
import { CreateTaskInput } from "../../domain/types/task";

interface TasksUseCaseProps {
  repo: ITaskRepository;
}

interface CreateTaskProps extends TasksUseCaseProps {
  data: CreateTaskInput;
}

const createTask = async ({
  repo,
  data,
}: CreateTaskProps): Promise<CreateTaskResult> => {
  try {
    const taskData = buildCreateTaskData(data);
    const task = await repo.createTask(taskData);
    return createSuccessResult(task);
  } catch {
    return createErrorResult(
      "UNKNOWN_ERROR",
      "something went wrong creating new task"
    );
  }
};

export const taskUseCases = {
  createTask,
};
