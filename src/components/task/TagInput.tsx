import { Tag, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge, Input } from "../ui";

interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

function TagInput({
  value = [],
  onChange,
  maxTags = 10,
  placeholder = "Add tags...",
  className,
  ref,
  ...props
}: TagInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const finalRef = ref || inputRef;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim().toLowerCase();
    if (
      trimmedValue &&
      !value.includes(trimmedValue) &&
      value.length < maxTags
    ) {
      onChange([...value, trimmedValue]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag();
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-[2.5rem] w-full flex-wrap gap-1 rounded-md border border-light-border bg-light-surface px-3 py-2 text-m ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        className
      )}
    >
      {value.map(tag => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1 text-xs animate-fade-in"
        >
          <Tag className="h-3 w-3" />
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        ref={finalRef}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={value.length >= maxTags}
        {...props}
      />
    </div>
  );
}

export { TagInput, type TagInputProps };
