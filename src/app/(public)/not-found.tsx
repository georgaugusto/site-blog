import { Button } from "@/components/ui/button";
import { IconFile, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Página não encontrada",
  description: "A página que você está procurando não foi encontrada.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 flex-col bg-gradient-to-br from-[var(--color-background-primary)] to-[var(--color-background-secondary)]">
      <section className="max-w-md w-full text-center">
        <IconFile
          size={48}
          className="text-[var(--color-content-primary)] mx-auto mb-6 drop-shadow-md drop-shadow-[var(--color-background-primary)]"
          aria-hidden="true"
        />
      </section>

      <section className="relative inline-block mb-3 font-sans">
        <h1 className="sr-only">Erro 404</h1>
        <div
          className="text-8xl font-bold text-[var(--color-content-primary)]"
          aria-label="404"
          role="img"
        >
          <span className="inline-block transform -rotate-12 -translate-y-2 -translate-x-1 text-shadow-lg text-shadow-[var(--color-background-primary)]">
            4
          </span>
          <span className="inline-block text-shadow-md">0</span>
          <span className="inline-block text-shadow-md">4</span>
        </div>
      </section>

      <p className="text-[var(--color-content-secondary)] mb-8 text-lg text-center">
        Página não encontrada
      </p>

      <nav
        className="mt-6 flex justify-center gap-4 pointer-coarse:gap-6 pointer-coarse:flex-col pointer-coarse:w-full pointer-coarse:max-w-xs"
        aria-label="Navegação de recuperação"
      >
        <Link href="/">
          <Button
            variant="primary"
            className="pointer-coarse:py-4 transition-all duration-200 hover:scale-105 focus:scale-105"
          >
            Home
          </Button>
        </Link>

        <Link href="/blog">
          <Button
            variant="secondary"
            className="pointer-coarse:py-4 transition-all duration-200 hover:scale-105 focus:scale-105"
          >
            <IconSearch size={16} aria-hidden="true" />
            Pesquisar posts
          </Button>
        </Link>
      </nav>
    </main>
  );
}
