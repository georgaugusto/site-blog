import * as React from "react";
import { IconChevronRight, IconDots } from "@tabler/icons-react";

import { cn } from "@/utils/cn";

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

const Breadcrumb = ({ className, ref, ...props }: BreadcrumbProps) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className={cn("", className)}
    {...props}
  />
);
Breadcrumb.displayName = "Breadcrumb";

interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  ref?: React.Ref<HTMLOListElement>;
}

const BreadcrumbList = ({ className, ref, ...props }: BreadcrumbListProps) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words",
      "text-sm",
      "text-(--color-content-secondary)",
      "sm:gap-2.5",
      className
    )}
    {...props}
  />
);
BreadcrumbList.displayName = "BreadcrumbList";

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  ref?: React.Ref<HTMLLIElement>;
}

const BreadcrumbItem = ({ className, ref, ...props }: BreadcrumbItemProps) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
}

const BreadcrumbLink = ({
  asChild,
  className,
  children,
  ref,
  ...props
}: BreadcrumbLinkProps) => {
  const linkClasses = cn(
    "transition-[color] duration-[var(--transition-duration-300)] ease-[var(--transition-timing-function-ease)]",
    "text-(--color-content-tertiary)",
    "hover:text-(--color-content-primary)",
    "focus:outline-none focus:ring-2 focus:ring-(--color-border-accent) focus:ring-offset-2 rounded-sm",
    className
  );

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<
      React.ComponentPropsWithoutRef<"a"> & {
        ref?: React.Ref<HTMLAnchorElement>;
      }
    >;

    return React.cloneElement(child, {
      ...props,
      className: cn(linkClasses, child.props.className),
      ref: ref as React.Ref<HTMLAnchorElement>,
    });
  }

  return (
    <a ref={ref} className={linkClasses} {...props}>
      {children}
    </a>
  );
};
BreadcrumbLink.displayName = "BreadcrumbLink";

interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
  ref?: React.Ref<HTMLSpanElement>;
}

const BreadcrumbPage = ({ className, ref, ...props }: BreadcrumbPageProps) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal", "text-(--color-content-primary)", className)}
    {...props}
  />
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(
      "[&>svg]:w-3.5 [&>svg]:h-3.5",
      "[&>svg]:text-(--color-content-tertiary)",
      className
    )}
    {...props}
  >
    {children ?? <IconChevronRight size={14} />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex w-9 h-9 items-center justify-center",
      "text-(--color-content-tertiary)",
      className
    )}
    {...props}
  >
    <IconDots size={16} />
    <span className="sr-only">Mais páginas</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
