import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import type { InferPageType } from "fumadocs-core/source";
import { blogPosts } from "@/source";

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts),
});

// Tipos inferidos do schema do fumadocs
export type BlogPost = InferPageType<typeof blog>;

// Interface para o post com as propriedades do frontmatter
export interface BlogPostData {
  title: string;
  summary: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  publishedAt: string;
}

/**
 * Helper para acessar dados do post de forma type-safe
 */
export function getBlogPostData(post: BlogPost): BlogPostData & {
  slug: string;
  url: string;
} {
  const data = post.data;
  return {
    title: data.title,
    summary: data.summary,
    author: data.author || {
      name: "Autor Desconhecido",
      avatar: "/avatar.jpg",
    },
    coverImage: data.coverImage,
    slug: post.slugs[0] || "",
    url: post.url,
    publishedAt: new Date(data.publishedAt || Date.now()).toISOString(),
  };
}

/**
 * Função para buscar todos os posts do blog
 * Retorna uma lista de todos os posts ordenados por data (mais recentes primeiro)
 */
export function getAllPosts() {
  const posts = blog.getPages();

  // Ordena os posts por data (mais recentes primeiro)
  return posts.sort((a, b) => {
    const dateA = new Date(a.data.publishedAt || Date.now());
    const dateB = new Date(b.data.publishedAt || Date.now());
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Função para buscar um post específico pelo slug
 * @param slug - O slug do post
 * @returns O post encontrado ou null se não existir
 */
export function getPostBySlug(slug: string) {
  return blog.getPage([slug]);
}

/**
 * Função para buscar posts por termo de busca
 * Busca no título e resumo
 * @param query - Termo de busca
 * @returns Lista de posts que correspondem à busca
 */
export function searchPosts(query: string) {
  if (!query.trim()) {
    return getAllPosts();
  }

  const lowercaseQuery = query.toLowerCase();
  const allPosts = getAllPosts();

  return allPosts.filter((post) => {
    const title = post.data.title?.toLowerCase() || "";
    const summary = post.data.summary?.toLowerCase() || "";

    return title.includes(lowercaseQuery) || summary.includes(lowercaseQuery);
  });
}

/**
 * Função para gerar os parâmetros estáticos para as páginas dos posts
 * Usado no generateStaticParams do Next.js
 */
export function generatePostParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
