import { Footer, Header } from "../components";

import "./styles.css";

type PublicLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const PublicLayout = ({ children, className }: PublicLayoutProps) => {
  return (
    <div
      className={`layout-container relative flex min-h-screen flex-col ${
        className || ""
      }`.trim()}
    >
      {/* Skip link para acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 z-50 px-4 py-2 bg-[var(--color-background-accent)] text-[var(--color-content-on-color)] rounded-br-md focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main
        className="layout-main flex-1 flex flex-col"
        id="main-content"
        role="main"
        aria-label="Conteúdo principal"
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};
