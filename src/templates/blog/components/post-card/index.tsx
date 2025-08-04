import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../../components/ui/avatar";

// **Next.js v15 + React v19**: Server Component por padrão (sem 'use client')
// **Tipagem TypeScript**: Interface para props reutilizáveis
interface PostCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    publishedAt: string;
    author: {
      name: string;
      avatar: string;
    };
  };
  priority?: boolean; // Para otimizar imagens LCP
}

export const PostCard = ({ post, priority = false }: PostCardProps) => {
  // **Melhores práticas**: Formatação de data localizada
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group w-full max-w-2xl rounded-[12px] border border-border-opaque bg-background-secondary overflow-hidden transition-all duration-300 hover:border-border-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent"
      aria-label={`Leia o artigo: ${post.title}`}
    >
      {/* Post Content */}
      <article className="p-2 rounded-md overflow-hidden">
        {/* Imagem Container */}
        <div className="relative">
          {/* **Next.js v15**: Otimização de imagem com sizes para responsividade */}
          <Image
            src={post.coverImage}
            alt={`Imagem de capa do artigo: ${post.title}`}
            width={640}
            height={320}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-40 object-cover object-center rounded-[8px] group-hover:scale-[1.02] transition-transform duration-300"
            priority={priority} // Otimização LCP para o primeiro post
          />

          {/* Data sobreposta */}
          <div className="absolute top-2 right-2 px-3 py-1 bg-background-primary/80 backdrop-blur-sm rounded-md">
            <time
              dateTime={post.publishedAt}
              className="text-xs text-content-secondary font-medium"
            >
              {formattedDate}
            </time>
          </div>
        </div>

        {/* Post info */}
        <div className="px-2 mt-4 space-y-4">
          {/* **Tailwind v4**: Usando design tokens do sistema */}
          <h2 className="text-lg font-semibold text-content-primary line-clamp-3 group-hover:text-content-accent transition-colors duration-200">
            {post.title}
          </h2>

          <p className="text-content-secondary text-sm line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Post footer */}
        <footer className="flex items-center gap-3 border-t border-border-opaque pt-4 mt-4">
          <Avatar.Container>
            <Avatar.Image src={post.author.avatar} alt={post.author.name} />
            <Avatar.Content>
              <Avatar.Title>{post.author.name}</Avatar.Title>
            </Avatar.Content>
          </Avatar.Container>
        </footer>
      </article>
    </Link>
  );
};
