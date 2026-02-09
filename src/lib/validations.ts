import { z } from 'zod';

// Schema de login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 6 caracteres'),
});

// Schema de registro
export const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
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

// Schema de perfil
export const profileSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
});

// Schema de avaliação
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Selecione uma nota').max(5, 'Nota máxima é 5'),
  comment: z.string().min(10, 'O comentário deve ter no mínimo 10 caracteres'),
});

// Schema de checkout
export const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Selecione um endereço'),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'pix', 'money'], {
    required_error: 'Selecione uma forma de pagamento',
  }),
  deliveryTime: z.enum(['morning', 'afternoon', 'evening'], {
    required_error: 'Selecione um horário de entrega',
  }),
});

// Schema de password
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        'A senha deve conter letra maiúscula, minúscula, número e caractere especial'
      ),

    confirmPassword: z.string()
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

export type RecoveryContactFormData = z.infer<typeof recoveryContactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type RecoveryPasswordSchema = z.infer<typeof passwordSchema>;