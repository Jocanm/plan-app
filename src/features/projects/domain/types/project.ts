import { Task } from "../../../tasks/domain/types/task";

export type Project = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type ProjectDetail = Project & {
  tasks: Task[];
};

export type ProjectSidebar = Pick<Project, "id" | "name" | "color">;

export type CreateProjectInput = {
  id?: string;
  name: string;
  userId: string;
  color?: string;
};

export type CreateProjectData = {
  id: string;
  name: string;
  color: string;
  userId: string;
};
