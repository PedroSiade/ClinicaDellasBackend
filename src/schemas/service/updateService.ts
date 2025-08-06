import { z } from "zod";

export const updateServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim()
    .optional(),

  summary: z
    .string()
    .min(1, "Resumo é obrigatório")
    .max(200, "Resumo deve ter no máximo 200 caracteres")
    .trim()
    .optional(),

  description: z
    .string()
    .max(65535, "Descrição muito longa")
    .optional()
    .or(z.literal(""))
    .or(z.null()),
  dropImage: z.preprocess((val) => {
    if (typeof val === "string") {
      return val === "true";
    }
    return val;
  }, z.boolean().optional()),
  image: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
});

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
