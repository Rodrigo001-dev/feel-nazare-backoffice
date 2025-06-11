import type { CarSpotting } from '@prisma/client'

import { env } from '@/env'

export async function deleteCarSpottings(id: number): Promise<CarSpotting[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/car-spottings`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw new Error('Falha ao excluir car spottings')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao excluir car spottings:', error)
    throw new Error('Falha ao excluir car spottings')
  }
}
