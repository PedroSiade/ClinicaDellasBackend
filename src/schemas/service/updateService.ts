import { z } from 'zod';



export const updateServiceSchema = z.object({
    name: z.string()
      .min(1, 'Nome é obrigatório')
      .max(100, 'Nome deve ter no máximo 100 caracteres')
      .trim()
      .optional(),
    
    iconUrl: z.string()
      .url('URL do ícone deve ser válida')
      .max(500, 'URL do ícone deve ter no máximo 500 caracteres')
      .optional()
      .or(z.literal(''))
      .or(z.null()),
    
    imageUrl: z.string()
      .url('URL da imagem deve ser válida')
      .max(500, 'URL da imagem deve ter no máximo 500 caracteres')
      .optional()
      .or(z.literal(''))
      .or(z.null()),
    
    summary: z.string()
      .min(1, 'Resumo é obrigatório')
      .max(200, 'Resumo deve ter no máximo 200 caracteres')
      .trim()
      .optional(),
    
    description: z.string()
      .max(65535, 'Descrição muito longa')
      .optional()
      .or(z.literal(''))
      .or(z.null()),
    
    isActive: z.boolean()
      .optional(),
  });
  
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;