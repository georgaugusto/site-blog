import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";

import { z } from "zod";

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    title: z.string(),
    summary: z.string(),
    coverImage: z.string(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
    }),
    publishedAt: z.string().or(z.date()),
  }),
});

export default defineConfig();
