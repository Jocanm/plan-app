"use client";

import { Task } from "@/features/tasks/domain/types/task";
import { createContext, useContext, useMemo, useOptimistic } from "react";

type ProjectTasksContextType = {
  tasks: Task[];
  addOptimisticTask: (task: Task) => void;
};

const ProjectTasksContext = createContext<ProjectTasksContextType | null>(null);

export const ProjectTasksProvider = ({
  children,
  initialTasks,
}: {
  initialTasks: Task[];
  children: React.ReactNode;
}) => {
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, newTask: Task) => [newTask, ...state]
  );

  const value = useMemo(
    () => ({ tasks: optimisticTasks, addOptimisticTask }),
    [optimisticTasks, addOptimisticTask]
  );

  return <ProjectTasksContext value={value}>{children}</ProjectTasksContext>;
};

export const useProjectTasks = () => {
  const context = useContext(ProjectTasksContext);
  if (!context) {
    throw new Error(
      "useProjectTasks must be used within a ProjectTasksProvider"
    );
  }
  return context;
};
