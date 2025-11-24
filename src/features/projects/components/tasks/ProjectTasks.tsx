"use client";

import { TaskCard } from "@/features/tasks/components/card/TaskCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";
import { useProjectTasks } from "../providers/ProjectTasksProvider";
import { NoTasks } from "./NoTasks";

export const ProjectTasks = () => {
  const { tasks } = useProjectTasks();
  const t = useTranslations("project");
  const [tasksParent] = useAutoAnimate();

  if (tasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">{t("tasks_heading")}</h2>
      <ul className="space-y-4 mt-4" ref={tasksParent}>
        {tasks.map(task => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </section>
  );
};
