"use client";

import { useCallback, useEffect, useState } from "react";

type UseClipboardProps = {
  timeout?: number;
};

type UseClipboardReturn = {
  isCopied: boolean;
  handleCopy: (text: string) => Promise<boolean>;
};

export const useClipboard = ({
  timeout = 1000,
}: UseClipboardProps = {}): UseClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      console.error("Clipboard não suportado");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      return true;
    } catch (error) {
      console.error("Falha ao copiar o texto: ", error);
      setIsCopied(false);
      return false;
    }
  }, []);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isCopied, timeout]);

  return { isCopied, handleCopy };
};
