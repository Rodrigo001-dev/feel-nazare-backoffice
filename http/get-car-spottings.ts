import type { CarSpotting } from '@prisma/client'

import { env } from '@/env'

export async function getCarSpottings(): Promise<CarSpotting[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/car-spottings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60, // Revalidate every 60 seconds
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
