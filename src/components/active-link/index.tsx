"use client";

import { ComponentProps } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

import "./styles.css";

type ActiveLinkProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<LinkProps, "href"> &
  Omit<ComponentProps<"a">, "href"> & {
    href: string;
  };

export const ActiveLink = ({
  children,
  href,
  className,
  ...rest
}: ActiveLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "active-link text-sm font-medium",
        isActive && "active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background-accent)] focus-visible:ring-offset-2",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
