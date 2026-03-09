import { z } from 'zod';

export const loginSchema = z.object({
  emailCliente: z.string().email('Email inválido'),
  senhaCliente: z.string().min(8, 'A senha deve ter no mínimo 6 caracteres'),
});

// Schema de registro
export const registerSchema = z
  .object({
    nomeCliente: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    emailCliente: z.string().email('Email inválido'),
    senhaCliente: z.string().min(8, 'A senha deve ter no mínimo 6 caracteres'),
    confirmar_senha: z
      .string()
      .min(8, 'A senha deve ter no mínimo 6 caracteres'),
    telefoneCliente: z.string().min(9, 'Telefone inválido'),
    telefoneClienteAlt: z.string().min(9, 'Telefone inválido'),
    enderecoCliente: z.string(),
  })
  .refine((data) => data.senhaCliente === data.confirmar_senha, {
    message: 'As senhas não coincidem',
    path: ['confirmar_senha'],
  });

// Schema de recuperação de senha
export const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

// Schema de endereço
export const addressSchema = z.object({
  street: z.string().min(3, 'A rua deve ter no mínimo 3 caracteres'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, 'O bairro deve ter no mínimo 3 caracteres'),
  city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres'),
  state: z.string().length(2, 'Estado inválido'),
  zipCode: z.string().min(8, 'CEP inválido'),
  isDefault: z.boolean().optional(),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        'A senha deve conter letra maiúscula, minúscula, número e caractere especial'
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const recoveryContactSchema = z.object({
  contact: z
    .string()
    .min(1, 'Campo obrigatório')
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || // email
        /^\+?[0-9]{9,15}$/.test(value.replace(/\s/g, '')), // telefone
      'Insira um e-mail ou telefone válido'
    ),
});

export const reviewSchema = z.object({
  productQuality: z.number().min(1, 'Avalie a qualidade do produto').max(5),

  serviceQuality: z.number().min(1, 'Avalie o atendimento e entrega').max(5),

  comment: z.string().max(500).optional(),
});

export const profileSchema = z.object({
  emailCliente: z.string().email('E-mail inválido'),
  nomeCliente: z.string().min(3, 'Nome muito curto'),
  telefoneCliente: z.string().min(9).max(9),
  telefoneClienteAlt: z.string().min(9).max(9),
  enderecoCliente: z.string(),
});

export const passwordProfileSchema = z
  .object({
    currentPassword: z.string().min(8, 'Senha obrigatória'),
    newPassword: z.string().min(8, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const verificationCodeSchema = z.object({
  codigo_seguranca: z
    .string()
    .length(6, 'O código deve ter 6 dígitos')
    .regex(/^\d+$/, 'O código deve conter apenas números'),
});

export const recoveryAccount = z
  .object({
    newPassword: z.string().min(6, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RecoveryAccout = z.infer<typeof recoveryAccount>;
export type VerificationCodeFormData = z.infer<typeof verificationCodeSchema>;
export type PasswordProfileFormData = z.infer<typeof passwordProfileSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type RecoveryContactFormData = z.infer<typeof recoveryContactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type RecoveryPasswordSchema = z.infer<typeof passwordSchema>;
