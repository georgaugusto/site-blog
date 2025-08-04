import Image from "next/image";

import { IconClock, IconArrowRight, IconStorm } from "@tabler/icons-react";

import Button from "@/components/ui/button";

import "./styles.css";

type HeroSectionProps = {
  className?: string;
};

export const HeroSection = ({ className }: HeroSectionProps) => {
  return (
    <section
      className={`hero-container relative flex items-center justify-center py-16 px-4 ${
        className || ""
      }`.trim()}
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="hero-animate-in grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 min-h-[20rem] md:h-[36rem] items-center max-w-7xl mx-auto">
        {/* Conteúdo Principal */}
        <div className="flex flex-col items-center justify-center gap-6 md:items-start lg:items-start">
          <h1 id="hero-title" className="hero-title text-center md:text-left">
            Venda seus produtos como afiliado em um único lugar
          </h1>

          <div className="flex flex-col items-center justify-center gap-6 md:items-start lg:items-start">
            {/* Features List */}
            <ul className="space-y-3" role="list">
              <li className="flex items-center gap-3">
                <IconClock
                  className="hero-icon flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="hero-feature-text">
                  Crie o seu site em menos de 5 minutos
                </span>
              </li>

              <li className="flex items-center gap-3">
                <IconStorm
                  className="hero-icon flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="hero-feature-text">
                  Acompanhe e otimize seu negócio online
                </span>
              </li>
            </ul>

            {/* Call to Action */}
            <div className="flex flex-col gap-3 mt-6 items-center md:items-start lg:items-start">
              <Button
                variant="primary"
                color="default"
                className="inline-flex items-center gap-2"
                aria-describedby="hero-disclaimer"
              >
                Criar loja grátis
                <IconArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              <p
                id="hero-disclaimer"
                className="hero-disclaimer text-center md:text-left"
              >
                Não precisa de cartão de crédito
              </p>
            </div>
          </div>
        </div>

        {/* Imagem Hero */}
        <div className="relative h-[20rem] hidden md:h-full order-first md:order-last items-center justify-center md:flex lg:flex">
          <Image
            src="/hero-section.svg"
            alt="Ilustração representando uma plataforma de vendas online com ícones de loja, etiquetas de preço e sacola de compras"
            width={400}
            height={600}
            priority
            className="h-full w-auto object-contain drop-shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};
