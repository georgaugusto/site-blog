import { ButtonVariant, ButtonSize, ButtonColor } from "./types";

export function getButtonClasses({
  variant = "primary",
  size = "md",
  color = "white",
  auto = false,
  loading = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  auto?: boolean;
  loading?: boolean;
}) {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "text-sm",
    "font-medium",
    "font-sans",
    "rounded-sm",
    "border-0",
    "px-6",
    "min-w-[120px]",
    "cursor-pointer",
    "transition-colors",
    "duration-300",
    "ease-in-out",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed",
  ];

  const sizeClasses = {
    sm: "h-9",
    md: "h-12",
    lg: "h-14",
  };

  const conditionalClasses = [];
  if (auto) conditionalClasses.push("w-full");
  if (loading) conditionalClasses.push("cursor-not-allowed");

  const getVariantClasses = (variant: ButtonVariant, color: ButtonColor) => {
    const variantColorMap = {
      "primary-default": [
        "bg-background-inverse-primary",
        "text-content-inverse-primary",
        "enabled:hover:brightness-90",
        "focus-visible:outline-content-primary",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],
      "primary-white": [
        "bg-background-tertiary",
        "text-content-primary",
        "enabled:hover:brightness-95",
        "focus-visible:outline-content-primary",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],
      "primary-black": [
        "bg-background-inverse-primary",
        "text-content-inverse-primary",
        "enabled:hover:brightness-90",
        "focus-visible:outline-background-inverse-primary",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],
      "primary-red": [
        "bg-background-negative",
        "text-content-on-color",
        "enabled:hover:brightness-90",
        "focus-visible:outline-background-negative",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],
      "primary-yellow": [
        "bg-background-warning",
        "text-content-always-dark",
        "enabled:hover:brightness-90",
        "focus-visible:outline-background-warning",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],
      "primary-green": [
        "bg-background-positive",
        "text-content-on-color",
        "enabled:hover:brightness-90",
        "focus-visible:outline-background-positive",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],
      "primary-blue": [
        "bg-background-accent",
        "text-content-on-color",
        "enabled:hover:brightness-90",
        "focus-visible:outline-background-accent",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
      ],

      "secondary-default": [
        "bg-transparent",
        "text-content-inverse-opaque",
        "border-2",
        "border-border-inverse-opaque",
        "enabled:hover:bg-background-inverse-tertiary",
        "enabled:hover:brightness-80",
        "focus-visible:outline-content-inverse-tertiary",
        "disabled:bg-transparent",
        "disabled:text-content-inverse-disabled",
        "disabled:border-border-inverse-disabled",
      ],
      "secondary-white": [
        "bg-transparent",
        "text-content-tertiary",
        "border-2",
        "border-border-opaque",
        "enabled:hover:bg-background-tertiary",
        "enabled:hover:brightness-95",
        "focus-visible:outline-content-tertiary",
        "disabled:bg-background-state-disabled",
        "disabled:text-content-state-disabled",
        "disabled:border-border-state-disabled",
      ],
      "secondary-black": [
        "bg-transparent",
        "text-content-primary",
        "border-2",
        "border-content-primary",
        "enabled:hover:bg-background-state-disabled",
        "focus-visible:outline-content-primary",
        "disabled:text-content-state-disabled",
        "disabled:border-border-opaque",
      ],
      "secondary-red": [
        "bg-transparent",
        "text-content-negative",
        "border-2",
        "border-content-negative",
        "enabled:hover:bg-background-negative",
        "enabled:hover:text-content-on-color",
        "enabled:hover:border-border-negative",
        "focus-visible:outline-content-negative",
        "disabled:text-content-state-disabled",
        "disabled:border-border-state-disabled",
      ],
      "secondary-yellow": [
        "bg-transparent",
        "text-content-warning",
        "border-2",
        "border-content-warning",
        "enabled:hover:bg-background-warning",
        "enabled:hover:text-content-primary",
        "enabled:hover:border-border-warning",
        "focus-visible:outline-content-warning",
        "disabled:text-content-state-disabled",
        "disabled:border-border-state-disabled",
      ],
      "secondary-green": [
        "bg-transparent",
        "text-content-positive",
        "border-2",
        "border-content-positive",
        "enabled:hover:bg-background-positive",
        "enabled:hover:text-content-on-color",
        "enabled:hover:border-border-positive",
        "focus-visible:outline-content-positive",
        "disabled:text-content-state-disabled",
        "disabled:border-border-state-disabled",
      ],
      "secondary-blue": [
        "bg-transparent",
        "text-content-accent",
        "border-2",
        "border-content-accent",
        "enabled:hover:bg-background-accent",
        "enabled:hover:text-content-on-color",
        "enabled:hover:border-border-accent-light",
        "focus-visible:outline-content-accent",
        "disabled:text-content-state-disabled",
        "disabled:border-border-state-disabled",
      ],

      "tertiary-white": [
        "bg-transparent",
        "text-background-tertiary",
        "enabled:hover:bg-background-primary/10",
        "focus-visible:outline-background-tertiary",
        "disabled:text-content-state-disabled",
      ],
      "tertiary-black": [
        "bg-transparent",
        "text-background-inverse-primary",
        "enabled:hover:bg-background-primary/10",
        "focus-visible:outline-background-inverse-primary",
        "disabled:text-content-state-disabled",
      ],
      "tertiary-red": [
        "bg-transparent",
        "text-background-negative",
        "enabled:hover:bg-background-primary/10",
        "focus-visible:outline-background-negative",
        "disabled:text-content-state-disabled",
      ],
      "tertiary-yellow": [
        "bg-transparent",
        "text-background-warning",
        "enabled:hover:bg-background-primary/10",
        "focus-visible:outline-background-warning",
        "disabled:text-content-state-disabled",
      ],
      "tertiary-green": [
        "bg-transparent",
        "text-background-positive",
        "enabled:hover:bg-background-primary/10",
        "focus-visible:outline-background-positive",
        "disabled:text-content-state-disabled",
      ],
      "tertiary-blue": [
        "bg-transparent",
        "text-background-accent",
        "enabled:hover:bg-background-primary/10",
        "focus-visible:outline-background-accent",
        "disabled:text-content-state-disabled",
      ],
    };

    const variantKey = `${variant}-${color}` as keyof typeof variantColorMap;
    return variantColorMap[variantKey] || [];
  };

  const variantClasses = getVariantClasses(variant, color);

  const allClasses = [
    ...baseClasses,
    sizeClasses[size],
    ...conditionalClasses,
    ...variantClasses,
  ];

  return allClasses.filter(Boolean).join(" ");
}
