import { z } from 'zod'

export const RoleEnum = z.enum([
    'DOCTOR',
    'NUTRITIONIST',
    'PSYCHOLOGIST',
    'PHYSIOTHERAPIST',
    'OWNER',
])

export const createProfessionalInputSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(50)
        .trim(),

    email: z
        .string()
        .email()
        .max(100)
        .toLowerCase()
        .trim(),

    phone: z
        .string()
        .max(20)
        .trim()
        .optional()
        .or(z.literal('')),

    photoUrl: z
        .string()
        .url()
        .max(500)
        .trim()
        .optional()
        .or(z.literal('')),

    description: z
        .string()
        .max(300)
        .trim()
        .optional()
        .or(z.literal('')),

    biography: z
        .string()
        .trim()
        .optional()
        .or(z.literal('')),

    role: RoleEnum,
})

export type CreateProfessionalInput = z.infer<
    typeof createProfessionalInputSchema
>
