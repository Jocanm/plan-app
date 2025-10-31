import { Checkbox } from "@/shared/components/ui/checkbox/Checkbox";

interface TaskCardProps {
  id: string;
  title: string;
  color: string;
  description?: string;
}

export const TaskCard = ({ id, title, description, color }: TaskCardProps) => {
  return (
    <article
      data-testid={`task-card-${id}`}
      style={{ borderLeftColor: color }}
      aria-labelledby={`task-card-title-${id}`}
      className="p-4 border bg-card rounded-lg w-full text-card-foreground border-l-4 flex items-start gap-4"
    >
      <div data-testid={`task-card-checkbox-${id}`} className="my-auto">
        <Checkbox id={`task-checkbox-${id}`} />
      </div>

      <button
        disabled
        className="flex flex-col items-start"
        data-testid={`task-card-content-${id}`}
      >
        <h3 id={`task-card-title-${id}`}>{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </button>

      <div data-testid="task-card-metadata" />
    </article>
  );
};
