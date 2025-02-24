import { prisma } from '@/lib/prisma'

export async function getLocais() {
  try {
    return await prisma.locais.findMany({
      orderBy: { id: 'desc' },
    })
  } catch (error) {
    console.error('Erro ao buscar locais:', error)
    throw new Error('Falha ao carregar locais')
  }
}
