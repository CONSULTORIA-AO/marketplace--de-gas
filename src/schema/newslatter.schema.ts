import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Por favor, insira um email válido')
    .max(100, 'Email muito longo'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
