import { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export interface SpinnerProps extends ComponentProps<"div"> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-[3px]",
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full",
        "animate-spin",
        "border-border-opaque",
        "border-t-border-inverse-opaque",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
      aria-live="polite"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

Spinner.displayName = "Spinner";
