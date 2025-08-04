import { Metadata } from "next";

import { getAllPosts, getBlogPostData } from "@/lib/source";

import { BlogList } from "@/templates/blog/blog-list";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas e estratégias para impulsionar seu negócio",
  robots: "index, follow",
  openGraph: {
    title: "Blog",
    description: "Dicas e estratégias para impulsionar seu negócio",
    url: "https://site-blog-92u5.vercel.app/og-image.jpg",
    siteName: "Site.Set",
    locale: "pt-BR",
    type: "website",
    images: [
      {
        url: "https://site-blog-92u5.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Site.Set",
      },
    ],
  },
};

export default async function BlogPage() {
  const allPosts = getAllPosts();

  const processedPosts = allPosts.map((post) => {
    const postData = getBlogPostData(post);
    return {
      slug: postData.slug,
      title: postData.title,
      excerpt: postData.summary,
      coverImage: postData.coverImage,
      publishedAt: postData.publishedAt,
      author: postData.author,
    };
  });

  return <BlogList posts={processedPosts} />;
}
