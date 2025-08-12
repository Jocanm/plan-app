import * as React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

import { Badge, type BadgeProps } from "../ui";
import { cn } from "@/lib/utils";

type TaskStatus = "pending" | "completed" | "overdue";

interface TaskStatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: TaskStatus;
  showIcon?: boolean;
}

function TaskStatusBadge({
  status,
  showIcon = true,
  className,
  children,
  ref,
  ...props
}: TaskStatusBadgeProps & { ref?: React.Ref<HTMLDivElement> }) {
  const statusConfig = {
    pending: {
      variant: "secondary" as const,
      label: "Pending",
      icon: Clock,
      className: "text-dark-light bg-dark-surface/20 border-dark-medium",
    },
    completed: {
      variant: "success" as const,
      label: "Completed",
      icon: CheckCircle,
      className: "text-success bg-success/10 border-success/20",
    },
    overdue: {
      variant: "destructive" as const,
      label: "Overdue",
      icon: AlertCircle,
      className: "text-danger bg-danger/10 border-danger/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div ref={ref}>
      <Badge
        variant="outline"
        className={cn(config.className, className)}
        {...props}
      >
        {showIcon && <Icon className="h-3 w-3 mr-1" />}
        {children || config.label}
      </Badge>
    </div>
  );
}

export { TaskStatusBadge, type TaskStatusBadgeProps, type TaskStatus };
