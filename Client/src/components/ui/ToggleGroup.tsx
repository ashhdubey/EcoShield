import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, options, value, onValueChange }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              value === option.value && "bg-background text-foreground shadow-sm"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

export default ToggleGroup;