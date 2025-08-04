import type { Metadata } from "next";

import LandingPage from "@/templates/land-page";

export const metadata: Metadata = {
  title: "Site.Set",
  description: "Venda seus produtos como afiliado em um único lugar",
  robots: "index, follow",
  keywords: [
    "afiliado",
    "vendas online",
    "plataforma de vendas",
    "e-commerce",
    "marketing digital",
    "loja online",
    "catálogo de produtos",
  ],
  openGraph: {
    title: "Site.Set",
    description: "Venda seus produtos como afiliado em um único lugar",
    url: "https://nextjs-fundamentos.vercel.app/og-image.jpg",
    siteName: "Site.Set",
    locale: "pt-BR",
    type: "website",
    images: [
      {
        url: "https://nextjs-fundamentos.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Site.Set",
      },
    ],
  },
};

export default function HomePage() {
  return <LandingPage />;
}
