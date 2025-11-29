import { Checkbox } from "@/components/ui/checkbox";
import { BaseLoader } from "@/shared/components/custom/BaseLoader";
import clsx from "clsx";
import { OptimisticTask } from "../../domain/types/task";

interface TaskCardProps {
  task: OptimisticTask;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, color, isOptimistic } = task;
  return (
    <article
      data-testid={`task-card-${id}`}
      style={{ borderLeftColor: color }}
      aria-labelledby={`task-card-title-${id}`}
      className={clsx(
        "p-4 border bg-card rounded-lg w-full text-card-foreground border-l-4 flex items-start gap-4",
        isOptimistic && "opacity-50 cursor-progress"
      )}
    >
      <div data-testid={`task-card-checkbox-${id}`} className="my-auto">
        <Checkbox
          disabled={isOptimistic}
          id={`task-checkbox-${id}`}
          aria-labelledby={`task-card-title-${id}`}
        />
      </div>

      <button
        disabled={isOptimistic}
        className="flex flex-col items-start"
        data-testid={`task-card-content-${id}`}
      >
        <h3 className="text-left" id={`task-card-title-${id}`}>
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </button>

      <div data-testid={`task-card-metadata-${id}`} />
      <div
        className="my-auto ml-auto"
        data-testid={`task-card-optimistic-indicator-${id}`}
      >
        {isOptimistic && <BaseLoader />}
      </div>
    </article>
  );
};
