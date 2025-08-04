import Link from "next/link";
import { getImageProps } from "next/image";

import { IconArrowRight, IconHome } from "@tabler/icons-react";

import { getBackgroundImage } from "@/utils/image";
import Button from "@/components/ui/button";

import "./styles.css";

type CallToActionProps = {
  className?: string;
};

export const CallToAction = ({ className }: CallToActionProps) => {
  // Otimização de imagem usando Next.js v15
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 1920,
    height: 1080,
    src: "/background-footer.svg",
    quality: 85,
    sizes: "100vw",
  });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <section
      className={`relative cta-container flex items-center justify-center ${
        className || ""
      }`.trim()}
      aria-labelledby="cta-title"
      role="region"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage }}
      />

      <div
        className="cta-icon-container absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <IconHome className="cta-icon" />
      </div>

      <div className="relative container">
        <div className="cta-animate-in cta-content">
          <h2 id="cta-title" className="font-heading cta-title">
            Crie uma loja online e inicie suas vendas ainda hoje
          </h2>

          <div className="cta-button-container">
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

        {/* Descrição para leitores de tela */}
        <p id="cta-description" className="sr-only">
          Comece a criar sua loja online gratuitamente, sem necessidade de
          cartão de crédito. Plataforma simples e intuitiva para iniciar suas
          vendas hoje mesmo.
        </p>
      </div>
    </section>
  );
};
