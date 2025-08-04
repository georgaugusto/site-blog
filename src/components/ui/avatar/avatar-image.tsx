import * as React from "react";
import Image, { ImageProps } from "next/image";

import { cn } from "@/utils/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarImageProps extends Omit<ImageProps, "height" | "width"> {
  size?: AvatarSize;
  ref?: React.Ref<HTMLDivElement>;
}

const avatarSizeClasses = {
  xs: "h-5 w-5",
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
} as const;

export const AvatarImage = ({
  src,
  alt,
  size = "sm",
  className,
  ref,
  ...rest
}: AvatarImageProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-full",
        "border border-(--color-border-opaque)",
        avatarSizeClasses[size],
        className
      )}
    >
      <Image
        {...rest}
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${avatarSizeClasses[size]}`}
      />
    </div>
  );
};
