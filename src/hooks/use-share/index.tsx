"use client";

import { useCallback, useMemo, useId } from "react";

import { useClipboard } from "../use-clipboard";
import {
  IconLink,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandSlack,
  IconBrandTwitter,
  IconShare,
} from "@tabler/icons-react";

export type ShareConfig = {
  url: string;
  title?: string;
  text?: string;
};

export type SocialProvider =
  | "linkedin"
  | "facebook"
  | "slack"
  | "twitter"
  | "threads"
  | "clipboard";

export type ShareButton = {
  id: string;
  provider: string;
  name: string;
  icon: React.ReactNode;
  action: () => Promise<boolean>;
};

export const SOCIAL_PROVIDERS = {
  linkedin: {
    name: "LinkedIn",
    icon: <IconBrandLinkedin className="lg:h-4 lg:w-4 h-6 w-6" />,
    shareUrl: (config: ShareConfig) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        config.url
      )}`,
  },
  facebook: {
    name: "Facebook",
    icon: <IconBrandFacebook className="lg:h-4 lg:w-4 h-6 w-6" />,
    shareUrl: (config: ShareConfig) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        config.url
      )}`,
  },
  slack: {
    name: "Slack",
    icon: <IconBrandSlack className="lg:h-4 lg:w-4 h-6 w-6" />,
    shareUrl: (config: ShareConfig) =>
      `https://slack.com/share?url=${encodeURIComponent(
        config.url
      )}&text=${encodeURIComponent(config.title || "")}`,
  },
  twitter: {
    name: "Twitter",
    icon: <IconBrandTwitter className="lg:h-4 lg:w-4 h-6 w-6" />,
    shareUrl: (config: ShareConfig) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(
        config.url
      )}&text=${encodeURIComponent(config.title || "")}`,
  },
  threads: {
    name: "Threads",
    icon: <IconShare className="lg:h-4 lg:w-4 h-6 w-6" />,
    shareUrl: (config: ShareConfig) =>
      `https://threads.net/intent/post?text=${encodeURIComponent(
        `${config.title || ""} ${config.url}`
      )}`,
  },
};

type UseShareProps = ShareConfig & {
  clipboardTimeout?: number;
};

type UseShareReturn = {
  shareButtons: ShareButton[];
};

const getAbsoluteUrl = (url: string): string => {
  // Se já é uma URL absoluta, retorna como está
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Se é uma URL relativa, converte para absoluta
  if (typeof window !== "undefined") {
    return `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
  }

  // Fallback para server-side (não deveria ser usado para compartilhamento)
  return url;
};

export const useShare = ({
  url,
  title,
  text,
  clipboardTimeout = 1000,
}: UseShareProps): UseShareReturn => {
  const id = useId();
  const { isCopied, handleCopy } = useClipboard({ timeout: clipboardTimeout });

  const shareConfig = useMemo(
    () => ({
      url: getAbsoluteUrl(url),
      ...(title && { title }),
      ...(text && { text }),
    }),
    [url, title, text]
  );

  const share = useCallback(
    async (provider: SocialProvider) => {
      try {
        if (provider === "clipboard") {
          return await handleCopy(shareConfig.url);
        }

        const providerConfig = SOCIAL_PROVIDERS[provider];
        if (!providerConfig) {
          console.warn(`Provider não suportado: ${provider}`);
          return false;
        }

        // Abrir diretamente a URL do social provider
        const shareUrl = providerConfig.shareUrl(shareConfig);
        const shareWindow = window.open(
          shareUrl,
          "_blank",
          "width=600,height=600,location=yes,status=yes,noopener=yes,noreferrer=yes"
        );

        return !!shareWindow;
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
        return false;
      }
    },
    [shareConfig, handleCopy]
  );

  const shareButtons = useMemo(
    () => [
      ...Object.entries(SOCIAL_PROVIDERS).map(([key, provider]) => ({
        id: `${id}-${key}`,
        provider: key,
        name: provider.name,
        icon: provider.icon,
        action: () => share(key as SocialProvider),
      })),
      {
        id: `${id}-clipboard`,
        provider: "clipboard",
        name: isCopied ? "Link copiado!" : "Copiar link",
        icon: <IconLink className="lg:h-4 lg:w-4 h-6 w-6" />,
        action: () => share("clipboard"),
      },
    ],
    [id, isCopied, share]
  );

  return { shareButtons };
};
