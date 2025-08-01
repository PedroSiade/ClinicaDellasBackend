import { z } from "zod";

export const PostStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createPostSchema = z.object({
  title: z.string().min(1).max(150).trim(),
  description: z.string().min(1).max(250).trim(),
  content: z.string().min(1).trim(),
  status: PostStatusEnum.optional(),
  //professionalId: z.number().int().positive(),
  professionalId: z.preprocess((val) => Number(val), z.number().int()),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
