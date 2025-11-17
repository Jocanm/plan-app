import { CreateTaskData, Task } from "./task";

export interface ITaskRepository {
  createTask: (data: CreateTaskData) => Promise<Task>;
}
