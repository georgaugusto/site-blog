import * as React from "react";

import { cn } from "@/utils/cn";

interface AvatarContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const AvatarContainer = ({
  children,
  className,
  ref,
  ...props
}: AvatarContainerProps) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-3", "group", className)}
      {...props}
    >
      {children}
    </div>
  );
};
