import { useId } from "react";
import { BaseLoader } from "../loaders/BaseLoader";
import { Input, InputProps } from "./Input";

interface CustomInputProps extends InputProps {
  label?: string;
  errorMessage?: string;
  showBaseLoader?: boolean;
}

export const CustomInput = ({
  id,
  label,
  errorMessage,
  showBaseLoader,
  ...props
}: CustomInputProps) => {
  const customId = useId();
  const inputId = id || `custom-input-${customId}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label htmlFor={inputId} className="block font-medium">
          {label}
        </label>
      )}
      <Input
        id={inputId}
        aria-invalid={!!errorMessage}
        variant={errorMessage ? "error" : "default"}
        aria-describedby={errorMessage ? errorId : undefined}
        {...props}
      />
      {errorMessage && (
        <p id={errorId} className="text-xs text-red-600">
          {errorMessage}
        </p>
      )}
      {showBaseLoader && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <BaseLoader className="w-4 h-4" />
        </span>
      )}
    </div>
  );
};
