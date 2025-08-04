"use client";

import { Button } from "@/components/ui/button";

import { useShare } from "@/hooks/use-share";

type PostShareProps = {
  url: string;
  title: string;
  description: string;
};

export const PostShare = ({ url, title, description }: PostShareProps) => {
  const { shareButtons } = useShare({
    url,
    title,
    text: description,
  });

  return (
    <aside className="space-y-6 w-fit" aria-label="Compartilhar post">
      <h2 className="mb-4 lg:mb-6 text-base lg:text-lg font-semibold text-(--color-content-primary)">
        Compartilhar
      </h2>

      <div className="flex sm:flex-row lg:flex-col lg:gap-4" role="list">
        {shareButtons.map((provider) => (
          <Button
            key={provider.provider}
            onClick={() => provider.action()}
            variant="tertiary"
            size="sm"
            className="!px-0 !min-w-[60px] sm:flex-1 w-fit justify-center lg:justify-start gap-3 h-12 lg:mx-4 border-(--color-border-opaque) hover:border-(--color-border-accent) text-(--color-content-secondary) hover:text-(--color-content-accent) transition-colors"
            aria-label={`Compartilhar via ${provider.name}`}
          >
            <span className="text-base shrink-0">{provider.icon}</span>
            <span className="font-medium hidden lg:block">{provider.name}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
};
