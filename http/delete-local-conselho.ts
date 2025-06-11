import type { locais } from '@prisma/client'

import { env } from '@/env'

export async function deleteLocalConselho(id: number): Promise<locais[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/locais-concelho`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw new Error('Falha ao excluir local conselho')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao excluir local conselho:', error)
    throw new Error('Falha ao excluir local conselho')
  }
}
