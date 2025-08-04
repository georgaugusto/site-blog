# Fumadocs Blog Source - Melhores Práticas

Este arquivo contém a implementação das melhores práticas para carregar e gerenciar posts do blog usando Fumadocs.

## 🏗️ Estrutura

```
src/lib/
├── source.ts           # Loader principal e funções utilitárias
├── example-usage.ts    # Exemplos de uso
└── README.md          # Esta documentação
```

## 📚 Funções Disponíveis

### `getAllPosts()`

Retorna todos os posts ordenados por data (mais recentes primeiro).

```typescript
import { getAllPosts } from "@/lib/source";

const posts = getAllPosts();
console.log(posts.length); // Número de posts
```

### `getPostBySlug(slug: string)`

Busca um post específico pelo slug.

```typescript
import { getPostBySlug } from "@/lib/source";

const post = getPostBySlug("meu-post");
if (post) {
  console.log(post.data.title);
}
```

### `searchPosts(query: string)`

Busca posts por termo nos campos título, descrição e excerpt.

```typescript
import { searchPosts } from "@/lib/source";

const results = searchPosts("React");
console.log(`Encontrados ${results.length} posts`);
```

### `generatePostParams()`

Gera parâmetros para `generateStaticParams` do Next.js.

```typescript
import { generatePostParams } from "@/lib/source";

export function generateStaticParams() {
  return generatePostParams();
}
```

### `getBlogPostData(post: BlogPost)`

Helper type-safe para acessar dados do post.

```typescript
import { getBlogPostData } from "@/lib/source";

const post = getPostBySlug("exemplo");
if (post) {
  const data = getBlogPostData(post);
  console.log(data.title, data.author, data.publishedAt);
}
```

## 🔧 Configuração

### 1. Schema do Frontmatter

Definido em `source.config.ts`:

```typescript
export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});
```

### 2. Exemplo de Post MDX

```markdown
---
title: Meu Post Incrível
description: Uma descrição breve do post
author: João Silva
date: 2024-12-20
excerpt: Um resumo do que o leitor vai aprender
coverImage: /assets/post-image.jpg
---

# Conteúdo do Post

Aqui vai o conteúdo em Markdown/MDX...
```

## 🚀 Uso em Páginas Next.js

### Página de Listagem (`/blog`)

```typescript
import { getAllPosts, searchPosts, getBlogPostData } from "@/lib/source";

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q;

  // Busca posts baseado na query ou retorna todos
  const posts = query ? searchPosts(query) : getAllPosts();

  return (
    <div>
      {posts.map((post) => {
        const postData = getBlogPostData(post);
        return (
          <article key={post.url}>
            <h2>{postData.title}</h2>
            <p>
              Por {postData.author} em {postData.date}
            </p>
            <p>{postData.excerpt}</p>
          </article>
        );
      })}
    </div>
  );
}
```

### Página Individual (`/blog/[slug]`)

```typescript
import { getPostBySlug, generatePostParams } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const Content = post.data.body;

  return (
    <article>
      <h1>{post.data.title}</h1>
      <p>Por {post.data.author}</p>
      <Content />
    </article>
  );
}

export function generateStaticParams() {
  return generatePostParams();
}
```

## 📝 Melhores Práticas

### 1. **Ordenação por Data**

Os posts são automaticamente ordenados por data (mais recentes primeiro) na função `getAllPosts()`.

### 2. **Busca Type-Safe**

Use sempre `getBlogPostData()` para acessar propriedades do frontmatter de forma type-safe.

### 3. **Fallbacks**

Todas as funções incluem fallbacks seguros para propriedades opcionais.

### 4. **Performance**

- Use `generateStaticParams()` para pre-rendering
- Os dados são carregados no build time com Fumadocs

### 5. **SEO**

```typescript
export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.data.title,
    description: post.data.description,
    authors: [{ name: post.data.author }],
  };
}
```

## 🔄 Regeneração de Conteúdo

Quando adicionar novos posts ou modificar o schema:

```bash
npx fumadocs-mdx
```

Isso regenerará os arquivos `.source/` com o novo conteúdo.

## ⚡ Performance

- **Build Time**: Todo conteúdo é processado no build time
- **Type Safety**: TypeScript completo com inferência de tipos
- **Tree Shaking**: Apenas as funções usadas são incluídas no bundle
- **Caching**: Next.js automaticamente faz cache das páginas estáticas

## 🐛 Troubleshooting

### Erro: "Property 'author' does not exist"

Certifique-se de que:

1. O frontmatter do post inclui a propriedade `author`
2. Executou `npx fumadocs-mdx` após mudanças
3. Está usando `getBlogPostData()` para acesso type-safe

### Posts não aparecem

Verifique:

1. Se os arquivos estão em `content/blog/`
2. Se têm extensão `.mdx`
3. Se o frontmatter está válido
4. Se executou `npx fumadocs-mdx`

---

_Criado seguindo as melhores práticas do Fumadocs v15._
