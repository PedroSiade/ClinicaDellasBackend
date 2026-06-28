import { z } from "zod";

export const RoleEnum = z.enum([
  "DOCTOR",
  "NUTRITIONIST",
  "PSYCHOLOGIST",
  "PHYSIOTHERAPIST",
  "OWNER",
]);

export const codeProfessionalSchema = z
  .string()
  .max(50)
  .trim()
  .default("");

export const createProfessionalInputSchema = z.object({
  name: z.string().min(1).max(50).trim(),

  email: z.string().email().max(100).toLowerCase().trim().optional(),

  phone: z.string().max(20).trim().optional().or(z.literal("")),

  description: z.string().max(300).trim(),

  biography: z.string().trim(),

  role: RoleEnum,

  codeProfessional: codeProfessionalSchema,
});

export type CreateProfessionalInput = z.infer<
  typeof createProfessionalInputSchema
>;
