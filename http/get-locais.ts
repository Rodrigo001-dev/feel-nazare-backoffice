import type { locais } from '@prisma/client'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

export async function getLocais(): Promise<locais[]> {
  try {
    // const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/locais-concelho`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   next: {
    //     revalidate: 60, // Revalidate every 60 seconds
    //     tags: ['api/locais-concelho'],
    //   },
    // })

    // if (!response.ok) {
    //   throw new Error('Falha ao carregar locais')
    // }

    // return response.json()

    const locais = await prisma.locais.findMany()
    return locais
  } catch (error) {
    console.error('Erro ao buscar locais:', error)
    throw new Error('Falha ao carregar locais')
  }
}
