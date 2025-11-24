"use client";

import { OptimisticTask, Task } from "@/features/tasks/domain/types/task";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

type ProjectTasksContextType = {
  tasks: OptimisticTask[];
  removeOptimisticTask: (taskId: string) => void;
  addOptimisticTask: (task: OptimisticTask) => void;
};

const ProjectTasksContext = createContext<ProjectTasksContextType | null>(null);

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "REMOVE_TASK"; payload: string };

const projectTasksReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.payload, ...state];
    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export const ProjectTasksProvider = ({
  children,
  initialTasks,
}: {
  initialTasks: Task[];
  children: React.ReactNode;
}) => {
  const [optimisticTasks, dispatch] = useOptimistic(
    initialTasks,
    projectTasksReducer
  );

  const addOptimisticTask = useCallback(
    (task: Task) => {
      dispatch({ type: "ADD_TASK", payload: task });
    },
    [dispatch]
  );

  const removeOptimisticTask = useCallback(
    (taskId: string) => {
      dispatch({ type: "REMOVE_TASK", payload: taskId });
    },
    [dispatch]
  );

  const value = useMemo(
    () => ({ tasks: optimisticTasks, addOptimisticTask, removeOptimisticTask }),
    [optimisticTasks, addOptimisticTask, removeOptimisticTask]
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
