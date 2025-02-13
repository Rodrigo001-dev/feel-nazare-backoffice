import type { CarSpotting } from '@prisma/client'

import { env } from '@/env'

export async function getCarSpottings(): Promise<CarSpotting[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/car-spottings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: {
        tags: ['api/car-spottings'],
      },
    })

    if (!response.ok) {
      throw new Error('Falha ao carregar car spottings')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao buscar car spottings:', error)
    throw new Error('Falha ao carregar car spottings')
  }
}
