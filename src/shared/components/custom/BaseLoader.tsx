import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface BaseLoaderProps {
  className?: string;
}

export const BaseLoader = ({ className, ...props }: BaseLoaderProps) => {
  return (
    <Loader2
      aria-hidden="true"
      className={cn("animate-spin", className)}
      {...props}
    />
  );
};
