import {z} from "zod";
import {RoleEnum} from "./createWorker";

export const updateProfessionalInputSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(50)
        .trim()
        .optional(),

    email: z
        .string()
        .email()
        .max(100)
        .toLowerCase()
        .trim()
        .optional(),

    phone: z
        .string()
        .max(20)
        .trim()
        .optional()
        .or(z.literal(''))
        .optional(),

    photoUrl: z
        .string()
        .url()
        .max(500)
        .trim()
        .optional()
        .or(z.literal(''))
        .optional(),

    description: z
        .string()
        .max(300)
        .trim()
        .optional()
        .or(z.literal(''))
        .optional(),

    biography: z
        .string()
        .trim()
        .optional()
        .or(z.literal(''))
        .optional(),

    role: RoleEnum.optional(),
})

export type UpdateProfessionalInput = z.infer<typeof updateProfessionalInputSchema>
