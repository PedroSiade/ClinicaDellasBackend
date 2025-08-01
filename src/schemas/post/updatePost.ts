import { z } from "zod";
import { PostStatusEnum } from "./createPost";

export const updatePostSchema = z
  .object({
    title: z.string().min(1).max(150).trim().optional(),
    description: z.string().min(1).max(250).trim().optional(),
    content: z.string().min(1).trim().optional(),
    status: PostStatusEnum.optional(),
    professionalId: z.number().int().positive().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Pelo menos um campo deve ser fornecido para atualização",
  );

export type UpdatePostInput = z.infer<typeof updatePostSchema>;
