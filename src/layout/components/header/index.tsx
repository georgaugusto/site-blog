import Button from "@/components/ui/button";

import { ThemeToggler } from "@/components/theme-toggler";
import { LogoIcon } from "@/components/logo/LogoIcon";
import { ActiveLink } from "@/components/active-link";

export const Header = () => {
  return (
    <header
      className="fixed top-0 z-50 w-full border-b backdrop-blur-sm"
      style={{
        backgroundColor: "var(--color-background-primary)",
        borderColor: "var(--color-border-opaque)",
      }}
    >
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <LogoIcon />

          <nav className="flex items-center gap-6">
            <ActiveLink href="/">Início</ActiveLink>
            <ActiveLink href="/blog">Blog</ActiveLink>

            <Button variant="primary" color="default">
              Começar
            </Button>
            <ThemeToggler />
          </nav>
        </div>
      </div>
    </header>
  );
};
