import * as React from "react";

import { cn } from "@/utils/cn";

interface AvatarContentProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const AvatarContent = ({
  children,
  className,
  ref,
  ...props
}: AvatarContentProps) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 min-w-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};
