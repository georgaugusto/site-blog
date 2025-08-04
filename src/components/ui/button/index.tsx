"use client";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/cn";

import { getButtonClasses } from "./getButtonClasses";
import { ButtonProps } from "./types";

export function Button({
  children,
  variant = "primary",
  size = "sm",
  color = "default",
  auto = false,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        getButtonClasses({ variant, size, color, auto, loading }),
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner size={size} /> : children}
    </button>
  );
}

export default Button;

Button.displayName = "Button";
