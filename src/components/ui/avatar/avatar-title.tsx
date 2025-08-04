import * as React from "react";

import { cn } from "@/utils/cn";

interface AvatarTitleProps extends React.ComponentPropsWithoutRef<"strong"> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

export const AvatarTitle = ({
  children,
  className,
  ref,
  ...props
}: AvatarTitleProps) => {
  return (
    <strong
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none",
        "text-(--color-content-primary)",
        className
      )}
      {...props}
    >
      {children}
    </strong>
  );
};
