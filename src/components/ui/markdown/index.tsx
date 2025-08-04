import { ReactNode } from "react";

import { cn } from "@/utils/cn";

import "./styles.css";

interface MarkdownProps {
  children: ReactNode;
  variant?: "default" | "compact";
  className?: string;
}

export function Markdown({
  children,
  variant = "default",
  className,
}: MarkdownProps) {
  const baseClasses = cn(
    "markdown-content",
    variant === "default" ? "markdown-default" : "markdown-compact",
    className
  );

  return <article className={baseClasses}>{children}</article>;
}
