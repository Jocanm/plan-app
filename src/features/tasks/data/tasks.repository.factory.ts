import { repositoryConfig } from "@/lib/config/repositories";
import { ITaskRepository } from "../domain/types/repository";
import { createTask } from "./tasks.repository";
import { createFakeTasksRepository } from "./tasks.repository.fake";

const createTasksRepository = (config = repositoryConfig): ITaskRepository => {
  if (config.isTest) {
    return createFakeTasksRepository();
  }

  return {
    createTask,
  };
};

export const tasksRepository = createTasksRepository();
