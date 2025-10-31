import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../../utils/cn";
type CheckboxProps = RadixCheckbox.CheckboxProps;

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <RadixCheckbox.Root
      {...props}
      className={cn(
        "w-5 h-5 rounded border border-input",
        "flex items-center justify-center",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        "focus-visible:ring-2 focus-visible:ring-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <RadixCheckbox.Indicator>
        <Check size={14} strokeWidth={3} className="text-white" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};
