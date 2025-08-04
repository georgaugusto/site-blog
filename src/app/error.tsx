"use client";

import { IconAlertTriangle, IconRefresh, IconHome } from "@tabler/icons-react";
import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error para serviços de monitoramento
    console.error("Error Boundary captured:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background-primary to-background-secondary"
      role="alert"
      aria-live="assertive"
      aria-labelledby="error-title"
      aria-describedby="error-description"
    >
      <section className="max-w-lg w-full text-center space-y-6">
        {/* Ícone de erro com animação */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full animate-pulse" />
          <IconAlertTriangle
            size={80}
            className="relative text-content-primary z-10"
            aria-hidden="true"
          />
          <div className="absolute h-1.5 w-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-90 rounded-full" />
        </div>

        {/* Título principal */}
        <div className="space-y-2">
          <h1
            id="error-title"
            className="text-4xl font-bold text-content-primary tracking-tight"
          >
            Ops! Algo deu errado
          </h1>
          <p id="error-description" className="text-content-secondary text-lg">
            Encontramos um erro inesperado. Nosso time foi notificado.
          </p>
        </div>

        {/* Detalhes do erro (apenas em desenvolvimento) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <details className="text-left bg-background-secondary/10 rounded-lg p-4 backdrop-blur-sm border border-border-opaque">
            <summary className="cursor-pointer text-content-secondary hover:text-content-primary font-medium mb-2">
              Detalhes técnicos (desenvolvimento)
            </summary>
            <code className="text-sm text-content-secondary break-words block mt-2 font-mono">
              {error.message}
            </code>
            {error.digest && (
              <p className="text-xs text-content-secondary/70 mt-2">
                ID do erro: {error.digest}
              </p>
            )}
          </details>
        )}

        {/* Ações */}
        <nav className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <Button
            variant="primary"
            onClick={reset}
            className="flex items-center gap-2 min-w-[140px] transition-all duration-200 hover:scale-105 focus:scale-105"
          >
            <IconRefresh size={16} aria-hidden="true" />
            Tentar novamente
          </Button>

          <Link href="/">
            <Button
              variant="secondary"
              className="flex items-center gap-2 min-w-[140px] transition-all duration-200 hover:scale-105 focus:scale-105"
            >
              <IconHome size={16} aria-hidden="true" />
              Voltar ao início
            </Button>
          </Link>
        </nav>

        {/* Screen reader only content */}
        <span className="sr-only">
          Erro na aplicação. Use os botões para tentar novamente ou voltar à
          página inicial.
        </span>
      </section>
    </main>
  );
}
