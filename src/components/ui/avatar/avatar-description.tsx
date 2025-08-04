import * as React from "react";

import { cn } from "@/utils/cn";

interface AvatarDescriptionProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const AvatarDescription = ({
  children,
  className,
  ref,
  ...props
}: AvatarDescriptionProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-xs leading-relaxed",
        "text-(--color-content-tertiary)",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
