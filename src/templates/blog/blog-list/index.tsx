"use client";

import { useState, useMemo, useCallback } from "react";
import { IconCircleX, IconSearch } from "@tabler/icons-react";

import { PostCard } from "@/templates/blog/components/post-card";

import { cn } from "@/utils/cn";
import { useDebounce } from "@/utils/debounce";

import "./styles.css";

interface ProcessedPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface ClientBlogSearchProps {
  posts: ProcessedPost[];
}

export function BlogList({ posts }: ClientBlogSearchProps) {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const postsData = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      searchContent: `${post.title} ${post.excerpt}`.toLowerCase(),
    }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return postsData;

    const lowercaseQuery = query.toLowerCase();
    return postsData.filter((post) =>
      post.searchContent.includes(lowercaseQuery)
    );
  }, [postsData, query]);

  const debouncedSetQuery = useDebounce((searchQuery: string) => {
    setQuery(searchQuery);
    setIsTyping(false);
  }, 500);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);

      if (newValue === "") {
        setQuery("");
        setIsTyping(false);
      } else {
        setIsTyping(true);
        debouncedSetQuery(newValue);
      }
    },
    [debouncedSetQuery]
  );

  const handleReset = useCallback(() => {
    setInputValue("");
    setQuery("");
    setIsTyping(false);
  }, []);

  const pageTitle = query
    ? `Resultados de busca para "${query}"`
    : "Dicas e estratégias para impulsionar seu negócio";

  const getStateMessage = () => {
    if (query)
      return `${filteredPosts.length} ${
        filteredPosts.length === 1 ? "post encontrado" : "posts encontrados"
      }`;
    return null;
  };

  return (
    <div className="flex flex-col py-6 md:py-20 flex-grow h-full">
      <header className="pb-14">
        <div className="container space-y-6 md:space-y-0 flex flex-col items-start justify-between md:flex-row md:items-end lg:items-end">
          <div className="flex flex-col gap-4 md:px-0">
            <span className="feature-tag" aria-label="blog">
              BLOG
            </span>

            <h2 className="feature-title text-balance text-start md:text-left text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl text-(--color-content-primary)">
              {pageTitle}
            </h2>

            {getStateMessage() && (
              <p className="text-sm text-gray-400" aria-live="polite">
                {getStateMessage()}
              </p>
            )}
          </div>

          <div className="relative group w-full md:w-60">
            <IconSearch
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 size-4 transition-colors duration-200 group-focus-within:text-blue-300",
                query ? "text-blue-300" : "text-gray-300",
                isTyping && "animate-pulse"
              )}
              aria-hidden="true"
            />

            <input
              type="text"
              value={inputValue}
              placeholder="Buscar posts..."
              onChange={handleInputChange}
              aria-label="Campo de busca de posts"
              aria-describedby={isTyping ? "search-status" : undefined}
              autoComplete="off"
              spellCheck="false"
              className={cn(
                "h-10 w-full rounded-md border bg-transparent pl-9 pr-9 text-gray-100 text-body-sm outline-hidden transition-colors duration-200 placeholder:text-gray-300 placeholder:text-body-sm focus:border-blue-300 focus:ring-1 focus:ring-blue-300 md:w-60",
                isTyping && "opacity-70"
              )}
            />

            {inputValue && (
              <button
                type="button"
                onClick={handleReset}
                aria-label="Limpar busca"
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-300 transition-colors duration-200 hover:text-gray-100 focus:text-gray-100 focus:outline-hidden"
                )}
              >
                <IconCircleX className="size-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCards key={post.slug} post={post} priority={index === 0} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">
              {query
                ? `Nenhum post encontrado para "${query}"`
                : "Nenhum post disponível"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
