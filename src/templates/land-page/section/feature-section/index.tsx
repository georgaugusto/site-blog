import Image from "next/image";
import Link from "next/link";

import { IconArrowRight } from "@tabler/icons-react";

import Button from "@/components/ui/button";

import "./styles.css";

type FeatureSectionProps = {
  className?: string;
};

type Feature = {
  tag: string;
  title: string;
  description?: string;
};

const features: Feature[] = [
  {
    tag: "Simples",
    title: "Crie um catálogo de produtos online em poucos minutos",
    description:
      "Interface intuitiva que permite criar sua loja sem conhecimento técnico.",
  },
  {
    tag: "Prático",
    title: "Venda para seu público através de uma plataforma única",
    description: "Gerencie todos os seus canais de venda em um só lugar.",
  },
  {
    tag: "Personalizável",
    title: "Tenha uma loja online personalizada com a cara da sua marca",
    description:
      "Customize cores, layout e funcionalidades de acordo com sua identidade visual.",
  },
];

export const FeatureSection = ({ className }: FeatureSectionProps) => {
  return (
    <section
      className={`features-container relative flex items-center justify-center ${
        className || ""
      }`.trim()}
      aria-labelledby="features-title"
      role="region"
    >
      <div className="container">
        <div className="features-animate-in grid gap-6 md:grid-cols-2">
          {/* Features Cards - Primeiros dois */}
          {features.slice(0, 2).map((feature) => (
            <article key={feature.tag} className="feature-card">
              <span
                className="feature-tag"
                aria-label={`Categoria: ${feature.tag}`}
              >
                {feature.tag}
              </span>
              <h2 className="feature-title">{feature.title}</h2>
              {feature.description && (
                <p className="feature-description">{feature.description}</p>
              )}
            </article>
          ))}

          {/* Feature Principal com Imagem */}
          <article className="col-span-full">
            <div className="feature-card grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col">
                <span
                  className="feature-tag"
                  aria-label={`Categoria: ${features[2].tag}`}
                >
                  {features[2].tag}
                </span>

                <h2 id="features-title" className="feature-title">
                  {features[2].title}
                </h2>

                {features[2].description && (
                  <p className="feature-description">
                    {features[2].description}
                  </p>
                )}

                {/* CTA Desktop */}
                <div className="feature-cta hidden md:block mt-auto">
                  <Link href="/criar-loja">
                    <Button
                      variant="primary"
                      color="default"
                      className="inline-flex items-center gap-2 rounded-full"
                      aria-describedby="cta-description"
                    >
                      Criar loja grátis
                      <IconArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Imagem */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full max-w-md">
                  <Image
                    src="/feature-section.svg"
                    alt="Ilustração mostrando interface de personalização da loja online com opções de cores, layout e branding"
                    width={440}
                    height={330}
                    className="object-contain w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>

                {/* CTA Mobile */}
                <div className="feature-cta w-full md:hidden mt-6">
                  <Link href="/criar-loja" className="block">
                    <Button
                      variant="primary"
                      color="default"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full"
                      aria-describedby="cta-description"
                    >
                      Criar loja grátis
                      <IconArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Descrição do CTA para acessibilidade */}
        <p id="cta-description" className="sr-only">
          Comece a criar sua loja online gratuitamente, sem necessidade de
          cartão de crédito
        </p>
      </div>
    </section>
  );
};
