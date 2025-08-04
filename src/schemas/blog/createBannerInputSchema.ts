import { z } from "zod";

export const createBannerInputSchema = z.object({
  altText: z
    .string()
    .min(1, "O texto alternativo é obrigatório")
    .max(300, "O texto alternativo deve ter no máximo 300 caracteres"),

  linkUrl: z
    .string()
    .max(300, "A URL do link deve ter no máximo 300 caracteres")
    .url("A URL do link deve ser válida"),
  isActive: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.toLowerCase() === "true") return true;
      if (val.toLowerCase() === "false") return false;
    }
    return val;
  }, z.boolean().default(true)),
});

export type CreateBannerInput = z.infer<typeof createBannerInputSchema>;
