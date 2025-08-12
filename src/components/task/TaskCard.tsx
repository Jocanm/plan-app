import * as React from "react";
import { Calendar, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge, Card, CardContent, CardHeader, Checkbox } from "../ui";

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  tags?: string[];
  priority?: "low" | "medium" | "high";
  onToggleComplete?: (completed: boolean) => void;
  project?: {
    name: string;
    color: string;
  };
}

function TaskCard({
  className,
  title,
  description,
  completed = false,
  dueDate,
  tags = [],
  priority = "medium",
  onToggleComplete,
  project,
  ref,
  ...props
}: TaskCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const priorityColors = {
    low: "secondary",
    medium: "warning",
    high: "destructive",
  } as const;

  const isOverdue = dueDate && new Date() > dueDate && !completed;

  return (
    <Card
      ref={ref}
      className={cn(
        "transition-all hover:shadow-md",
        completed && "opacity-60",
        isOverdue && "border-danger",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex items-center space-x-2 flex-1">
          <Checkbox
            checked={completed}
            onCheckedChange={checked => {
              onToggleComplete?.(checked as boolean);
            }}
          />
          <div className="flex-1 space-y-1">
            <h3
              className={cn(
                "font-medium leading-none",
                completed && "line-through text-dark-light"
              )}
            >
              {title}
            </h3>
            {description && (
              <p className="text-s text-dark-light line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
        <Badge variant={priorityColors[priority]} className="ml-2">
          {priority}
        </Badge>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-s text-dark-light">
            {dueDate && (
              <div
                className={cn(
                  "flex items-center space-x-1",
                  isOverdue && "text-danger"
                )}
              >
                <Calendar className="h-4 w-4" />
                <span>{dueDate.toLocaleDateString()}</span>
              </div>
            )}

            {project && (
              <div className="flex items-center space-x-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span>{project.name}</span>
              </div>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag className="h-3 w-3 text-dark-light" />
              <div className="flex space-x-1">
                {tags.slice(0, 2).map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs px-1 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    +{tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { TaskCard, type TaskCardProps };
