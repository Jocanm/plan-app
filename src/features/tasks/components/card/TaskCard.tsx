"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { BaseLoader } from "@/shared/components/custom/BaseLoader";
import clsx from "clsx";
import { GripVertical } from "lucide-react";
import { useDraggableTask } from "../../app/hooks/useDraggableTask";
import { OptimisticTask } from "../../domain/types/task";

interface TaskCardProps {
  task: OptimisticTask;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, color, projectId, isOptimistic } = task;
  const { mainRef, dragHandleRef, isDragging } = useDraggableTask({
    id,
    title,
    color,
    projectId,
    isOptimistic: isOptimistic ?? false,
  });

  return (
    <article
      ref={mainRef}
      data-testid={`task-card-${id}`}
      style={{ borderLeftColor: color }}
      aria-labelledby={`task-card-title-${id}`}
      className={clsx(
        "p-4 border bg-card rounded-lg w-full text-card-foreground border-l-4 flex items-start gap-4",
        isOptimistic && "opacity-50 cursor-progress",
        isDragging && "opacity-75 shadow-lg"
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
        data-testid={`task-card-content-${id}`}
        className="flex flex-col flex-1 items-start"
      >
        <h3 className="text-left" id={`task-card-title-${id}`}>
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </button>

      <div
        ref={dragHandleRef}
        className={clsx("cursor-grab my-auto", isOptimistic && "hidden")}
        data-testid={`task-card-drag-handle-${id}`}
      >
        <GripVertical className="my-auto text-muted-foreground" />
      </div>

      {isOptimistic && (
        <div
          className="my-auto ml-auto"
          data-testid={`task-card-optimistic-indicator-${id}`}
        >
          <BaseLoader />
        </div>
      )}
    </article>
  );
};
