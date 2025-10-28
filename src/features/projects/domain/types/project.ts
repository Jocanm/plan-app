export type Project = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type ProjectSidebar = Pick<Project, "id" | "name" | "color"> & {
  totalPendingTasks: number;
};
