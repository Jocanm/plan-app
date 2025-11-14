import { cn } from "@/shared/utils/cn";
import { cva, type VariantProps } from "cva";
import * as React from "react";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background text-foreground px-3 py-2 text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
      },
      inputSize: {
        lg: "h-11 px-4 py-3",
        default: "h-10 px-3 py-2",
        sm: "h-9 px-2 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = ({
  className,
  variant,
  inputSize,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...props}
    />
  );
};

export { inputVariants };
