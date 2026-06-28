import { z } from "zod";

export const updatePostSchema = z
  .object({
    photo: z.string().nullable().optional(),
    title: z.string().min(1).max(150).trim().optional(),
    dropImage: z.preprocess((val) => {
      if (typeof val === "string") {
        return val === "true";
      }
      return val;
    }, z.boolean().optional()),
    description: z.string().min(1).max(250).trim().optional(),
    content: z.string().min(1).trim().optional(),
    professionalId: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (val) => val === undefined || (Number.isInteger(val) && val > 0),
        { message: "O ID deve ser um número inteiro positivo" },
      ),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Pelo menos um campo deve ser fornecido para atualização",
  );

export type UpdatePostInput = z.infer<typeof updatePostSchema>;
