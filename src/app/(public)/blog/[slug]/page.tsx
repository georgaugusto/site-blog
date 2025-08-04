import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getPostBySlug,
  generatePostParams,
  getBlogPostData,
} from "@/lib/source";

import { BlogDetail } from "@/templates/blog/blog-detail";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
}

export async function generateStaticParams() {
  return generatePostParams();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
    };
  }

  const postData = getBlogPostData(post);

  return {
    title: postData.title,
    description: postData.summary,
    authors: [{ name: postData.author.name }],
    robots: "index, follow",
    openGraph: {
      title: postData.title,
      description: postData.summary,
      images: postData.coverImage ? [postData.coverImage] : [],
      type: "article",
      publishedTime: postData.publishedAt,
      authors: [postData.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.summary,
      images: postData.coverImage ? [postData.coverImage] : [],
    },
  };
}
