import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main
      className="min-h-[400px] flex flex-col items-center justify-center px-4 bg-background-primary"
      role="status"
      aria-label="Carregando conteúdo"
      aria-live="polite"
    >
      <section className="text-center space-y-4">
        <div className="relative flex items-center justify-center">
          <Spinner
            size="lg"
            className="pointer-coarse:w-12 pointer-coarse:h-12 drop-shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <p className="text-content-secondary text-sm font-medium">
            Carregando...
          </p>
        </div>
      </section>

      <span className="sr-only">Carregando conteúdo da página...</span>
    </main>
  );
}
