export type Task = {
  id: string;
  title: string;
  color: string;
  userId: string;
  projectId?: string | null;
  description?: string | null;
};

export type CalendarEventTask = Pick<
  Task,
  "id" | "title" | "projectId" | "color"
>;

export type OptimisticTask = Task & {
  isOptimistic?: boolean;
};

export type CreateTaskInput = {
  id?: string;
  title: string;
  userId: string;
  color?: string;
  projectId?: string;
  description?: string;
};

export type CreateOptimisticTaskInput = {
  id: string;
  title: string;
  userId: string;
  color?: string;
  projectId?: string;
  description?: string;
};

export type CreateTaskData = {
  id?: string;
  color: string;
  title: string;
  userId: string;
  projectId?: string;
  description?: string;
};
