import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim(),

  summary: z
    .string()
    .min(1, "Resumo é obrigatório")
    .max(200, "Resumo deve ter no máximo 200 caracteres")
    .trim(),

  description: z
    .string()
    .max(65535, "Descrição muito longa")
    .optional()
    .or(z.literal("")),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
