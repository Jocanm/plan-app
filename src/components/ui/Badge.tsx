import * as React from "react";
import { cva, type VariantProps } from "cva";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-s font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-light-surface hover:bg-primary-hover",
        secondary:
          "border-transparent bg-dark-surface text-light-surface hover:bg-dark-medium",
        destructive:
          "border-transparent bg-danger text-light-surface hover:bg-danger-hover",
        success:
          "border-transparent bg-success text-light-surface hover:bg-success/80",
        warning: "border-transparent bg-warning text-dark hover:bg-warning/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
