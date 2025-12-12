"use client";

import { TaskCard } from "@/features/tasks/components/card/TaskCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";
import { ProjectDetail } from "../../domain/types/project";
import { useProjectTasks } from "../providers/ProjectTasksProvider";
import { NoTasks } from "./NoTasks";

interface ProjectTasksProps {
  project: ProjectDetail;
}

export const ProjectTasks = ({ project }: ProjectTasksProps) => {
  const { tasks } = useProjectTasks();
  const t = useTranslations("project");
  const [tasksParent] = useAutoAnimate();

  if (tasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <section className="min-h-0 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{t("tasks_heading")}</h2>
      <ul
        ref={tasksParent}
        className="space-y-4 overflow-y-auto h-full scrollbar-invisible"
      >
        {tasks.map(task => (
          <li key={task.id}>
            <TaskCard task={task} projectColor={project.color} />
          </li>
        ))}
      </ul>
    </section>
  );
};
