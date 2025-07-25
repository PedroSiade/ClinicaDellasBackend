import { z } from 'zod';



export const createServiceSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  
  iconUrl: z.string()
    .url('URL do ícone deve ser válida')
    .max(500, 'URL do ícone deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  
  imageUrl: z.string()
    .url('URL da imagem deve ser válida')
    .max(500, 'URL da imagem deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  
  summary: z.string()
    .min(1, 'Resumo é obrigatório')
    .max(200, 'Resumo deve ter no máximo 200 caracteres')
    .trim(),
  
  description: z.string()
    .max(65535, 'Descrição muito longa') // Limite típico para TEXT
    .optional()
    .or(z.literal('')),
  
  isActive: z.boolean()
    .default(true)
    .optional()
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;