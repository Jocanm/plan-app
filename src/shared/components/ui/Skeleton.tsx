import { cn } from "@/shared/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      role="status"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      {...props}
    />
  );
};
