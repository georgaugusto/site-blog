import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Suporte para next-themes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ✨ Configurações migradas para CSS usando @theme em tokens.css
  // Seguindo as melhores práticas do Tailwind v4: CSS-first configuration
  // - Typography tokens: --font-family-*
  // - Container utility: @utility container
  // - Breakpoints: --breakpoint-*
  // - Transitions: --transition-*
  plugins: [],
};

export default config;
