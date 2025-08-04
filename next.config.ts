import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    // Permite otimização de SVGs com segurança
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Formatos de imagem otimizados
    formats: ["image/avif", "image/webp"],

    // Qualidades permitidas para otimização
    qualities: [25, 50, 75, 85, 90, 100],

    // Tamanhos de dispositivos para responsividade
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Cache TTL mínimo (1 hora)
    minimumCacheTTL: 3600,
  },
};

export default withMDX(nextConfig);
