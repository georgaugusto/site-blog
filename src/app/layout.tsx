import type { Metadata } from "next";
import { Inter, PT_Sans_Caption } from "next/font/google";

import Providers from "@/providers";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const ptSansCaption = PT_Sans_Caption({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SLC Blog",
    template: "%s | SLC Blog",
  },
  description:
    "Um blog moderno construído com Next.js 15, React 19 e Tailwind CSS v4",
  keywords: ["Next.js", "React", "Blog", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "SLC Team" }],
  creator: "SLC",
  publisher: "SLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://slc-blog.vercel.app"), // Ajustar URL
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://slc-blog.vercel.app", // Ajustar URL
    siteName: "SLC Blog",
    title: "SLC Blog",
    description:
      "Um blog moderno construído com Next.js 15, React 19 e Tailwind CSS v4",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLC Blog",
    description:
      "Um blog moderno construído com Next.js 15, React 19 e Tailwind CSS v4",
    creator: "@slc", // Ajustar handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ptSansCaption.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
