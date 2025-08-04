import { LogoIcon } from "@/components/logo/LogoIcon";
import { ActiveLink } from "@/components/active-link";

import "./styles.css";

export const Footer = () => {
  return (
    <footer
      className="border-t py-8"
      style={{
        borderColor: "var(--color-border-opaque)",
        backgroundColor: "var(--color-background-secondary)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <LogoIcon />

          <nav
            className="flex flex-col md:flex-row items-center gap-6"
            aria-label="Links do rodapé"
          >
            <ActiveLink href="/termos-de-uso" className="footer-link">
              Termos de uso
            </ActiveLink>
            <ActiveLink href="/politica-de-privacidade" className="footer-link">
              Política de privacidade
            </ActiveLink>
            <ActiveLink href="/feedback" className="footer-link">
              Feedback
            </ActiveLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};
