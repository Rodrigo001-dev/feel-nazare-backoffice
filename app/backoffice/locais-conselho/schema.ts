import { z } from 'zod'

export const localConselhoSchema = z.object({
  morada: z.string().min(3, 'A morada deve ter pelo menos 3 caracteres'),
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  tempoEstimado: z.string().min(1, 'O tempo estimado é obrigatório'),
})

export type LocalConselhoFormData = z.infer<typeof localConselhoSchema>
