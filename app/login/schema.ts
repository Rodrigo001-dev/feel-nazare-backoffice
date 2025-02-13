import { z } from 'zod'

export const loginSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
