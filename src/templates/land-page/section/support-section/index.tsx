import { getImageProps } from "next/image";

import {
  IconBackpack,
  IconHeartHandshake,
  IconPaint,
} from "@tabler/icons-react";

import { getBackgroundImage } from "@/utils/image";

import "./styles.css";

type SupportSectionProps = {
  className?: string;
};

type SupportCard = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant: "primary" | "secondary";
  iconVariant: "primary" | "secondary";
};

const supportCards: SupportCard[] = [
  {
    icon: IconPaint,
    title: "Personalize seu site",
    description:
      "Adicione sua logo, favicon, cores no seu catálogo e tenha tudo com a sua cara.",
    variant: "primary",
    iconVariant: "primary",
  },
  {
    icon: IconBackpack,
    title: "Venda de qualquer loja",
    description:
      "Não importa a loja, o Site.Set permite que você insira qualquer link de afiliado.",
    variant: "secondary",
    iconVariant: "secondary",
  },
  {
    icon: IconHeartHandshake,
    title: "Receba suporte amigável",
    description:
      "Nossa equipe estará sempre pronta para te atender para ajudar no que for preciso.",
    variant: "primary",
    iconVariant: "primary",
  },
];

export const SupportSection = ({ className }: SupportSectionProps) => {
  // Otimização de imagem usando Next.js v15
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 1920,
    height: 1080,
    src: "/background-features.svg",
    quality: 85,
    sizes: "100vw",
  });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <section
      className={`support-container relative flex items-center justify-center ${
        className || ""
      }`.trim()}
      aria-labelledby="support-title"
      role="region"
    >
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage }}
      />

      <div className="container">
        <div className="support-animate-in flex flex-col items-center gap-12">
          <h2
            id="support-title"
            className="font-heading support-title text-balance"
          >
            Sua loja de afiliados, simples, do jeito que deveria ser
          </h2>

          <div className="support-grid" role="list">
            {supportCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <article
                  key={card.title}
                  className={`support-card ${
                    card.variant === "secondary"
                      ? "support-card--variant-secondary"
                      : ""
                  }`}
                  role="listitem"
                  aria-labelledby={`support-card-title-${index}`}
                  aria-describedby={`support-card-desc-${index}`}
                >
                  <div
                    className={`support-icon-container ${
                      card.iconVariant === "secondary"
                        ? "support-icon-container--secondary"
                        : "support-icon-container--primary"
                    }`}
                    aria-hidden="true"
                  >
                    <IconComponent className="support-icon" />
                  </div>
                  <h3
                    id={`support-card-title-${index}`}
                    className="support-card-title"
                  >
                    {card.title}
                  </h3>
                  <p
                    id={`support-card-desc-${index}`}
                    className="support-card-description"
                  >
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Descrição para leitores de tela */}
        <p className="sr-only">
          Seção destacando os principais benefícios da plataforma:
          personalização, flexibilidade de vendas e suporte dedicado
        </p>
      </div>
    </section>
  );
};
