import { Task } from "../../../tasks/domain/task";

export type Project = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tasks: Task[];
};

export type ProjectSidebar = Pick<Project, "id" | "name" | "color"> & {
  totalPendingTasks: number;
};
