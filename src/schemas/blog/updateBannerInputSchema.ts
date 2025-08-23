import { z } from "zod";

export const updateBannerInputSchema = z.object({
  altText: z
    .string()
    .min(1, "O texto alternativo é obrigatório")
    .max(300, "O texto alternativo deve ter no máximo 300 caracteres")
    .optional(),

  linkUrl: z
    .string()
    .max(300, "A URL do link deve ter no máximo 300 caracteres")
    .url("A URL do link deve ser válida")
    .optional(),
});

export type UpdateBannerInputSchema = z.infer<typeof updateBannerInputSchema>;
