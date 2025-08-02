import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(150).trim(),
  description: z.string().min(1).max(250).trim(),
  content: z.string().min(1).trim(),
  //professionalId: z.number().int().positive(),
  professionalId: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || (Number.isInteger(val) && val > 0), {
      message: "O ID deve ser um número inteiro positivo",
    }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
