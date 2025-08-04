import Image from "next/image";
import Link from "next/link";

import { PostShare } from "@/templates/blog/components/post-share";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Markdown } from "@/components/ui/markdown";
import Avatar from "@/components/ui/avatar";

import type { BlogPost } from "@/lib/source";

import "./styles.css";

interface BlogDetailProps {
  post: BlogPost;
}

export function BlogDetail({ post }: BlogDetailProps) {
  const postData = {
    title: post.data.title,
    summary: post.data.summary,
    author: post.data.author || {
      name: "Autor Desconhecido",
      avatar: "/avatar.jpg",
    },
    coverImage: post.data.coverImage,
    slug: post.slugs[0] || "",
    url: post.url,
    publishedAt: new Date(post.data.publishedAt || Date.now()).toISOString(),
  };

  const Content = post.data.body;

  return (
    <main className="py-5 md:py-12 text-gray-100">
      <div className="container space-y-8 px-4 md:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-action-sm">
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-action-sm">{postData.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12">
          <article className="bg-(--color-background-secondary) rounded-xl border-(--color-border-opaque) border">
            <figure className="relative h-[264px] w-full overflow-hidden rounded-lg">
              <Image
                src={postData.coverImage}
                alt={postData.title}
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                className="object-cover object-[0%_39.46%]"
              />
            </figure>

            <header className="p-4 md:p-6 lg:p-12 pb-0">
              <div className="flex flex-col gap-8 items-start">
                <h1 className="text-[32px] font-bold leading-[1.2] text-(--color-content-primary) text-balance">
                  {postData.title}
                </h1>

                <Avatar.Container>
                  <Avatar.Image
                    src={postData.author.avatar}
                    alt={`Foto de ${postData.author.name}`}
                    size="md"
                  />
                  <Avatar.Content>
                    <Avatar.Title>{postData.author.name}</Avatar.Title>
                    <Avatar.Description>
                      Publicado em{" "}
                      <time dateTime={postData.publishedAt}>
                        {new Date(postData.publishedAt).toLocaleDateString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </Avatar.Description>
                  </Avatar.Content>
                </Avatar.Container>
              </div>
            </header>

            <div className="prose prose-invert max-w-none px-4 mb-12 md:px-6 lg:px-12">
              <Markdown variant="default">
                <Content />
              </Markdown>
            </div>
          </article>

          <PostShare
            url={postData.url}
            title={postData.title}
            description={postData.summary}
          />
        </div>
      </div>
    </main>
  );
}
