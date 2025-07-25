import { z } from "zod";

export const PostStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createPostSchema = z.object({
  title: z.string().min(1).max(150).trim(),
  description: z.string().min(1).max(250).trim(),
  content: z.string().min(1).trim(),
  featuredImage: z.string().url().max(500).optional().or(z.literal("")),
  status: PostStatusEnum.optional(),
  professionalId: z.number().int().positive(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
