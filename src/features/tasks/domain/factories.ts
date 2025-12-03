import { generateId } from "@/lib/utils/id";
import { DEFAULT_TASK_COLOR } from "./constants";
import {
  CreateOptimisticTaskInput,
  CreateTaskData,
  CreateTaskInput,
  OptimisticTask,
} from "./types/task";

export const buildCreateTaskData = (input: CreateTaskInput): CreateTaskData => {
  return {
    id: input.id ?? generateId(),
    title: input.title,
    description: input.description,
    userId: input.userId,
    projectId: input.projectId,
    color: input.color ?? DEFAULT_TASK_COLOR,
  };
};

export const buildOptimisticTask = (
  input: CreateOptimisticTaskInput
): OptimisticTask => {
  return {
    id: input.id,
    isOptimistic: true,
    title: input.title,
    userId: input.userId,
    projectId: input.projectId,
    description: input.description,
    color: input.color ?? DEFAULT_TASK_COLOR,
  };
};
