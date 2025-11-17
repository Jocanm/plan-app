import { DEFAULT_TASK_COLOR } from "./constants";
import { CreateTaskData, CreateTaskInput } from "./types/task";

export const buildCreateTaskData = (input: CreateTaskInput): CreateTaskData => {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    userId: input.userId,
    projectId: input.projectId,
    color: input.color ?? DEFAULT_TASK_COLOR,
  };
};
