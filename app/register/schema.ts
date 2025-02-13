import { z } from 'zod'

export const registerSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  cargo: z.string().min(1, 'O cargo é obrigatório'),
  contacto: z.string().min(1, 'O contato é obrigatório'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
