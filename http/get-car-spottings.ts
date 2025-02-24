import { prisma } from '@/lib/prisma'

export async function getCarSpottings() {
  try {
    return await prisma.carSpotting.findMany({
      orderBy: { id: 'desc' },
    })
  } catch (error) {
    console.error('Erro ao buscar car spottings:', error)
    throw new Error('Falha ao carregar car spottings')
  }
}
