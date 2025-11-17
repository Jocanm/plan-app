import { TaskCard } from "@/features/tasks/components/card/TaskCard";
import { Task } from "@/features/tasks/domain/types/task";
import { useTranslations } from "next-intl";

interface ProjectTasksProps {
  tasks: Task[];
}

export const ProjectTasks = ({ tasks }: ProjectTasksProps) => {
  const t = useTranslations("project");

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">{t("tasks_heading")}</h2>
      <ul className="space-y-4 mt-4">
        {tasks.map(task => (
          <li key={task.id}>
            <TaskCard
              id={task.id}
              color={task.color}
              title={task.title}
              description={task.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
