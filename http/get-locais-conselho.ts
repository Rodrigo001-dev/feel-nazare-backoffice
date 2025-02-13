import { prisma } from '@/lib/prisma'

export async function getLocaisConselho() {
  try {
    return await prisma.locais.findMany({
      orderBy: { id: 'desc' },
      take: 5, // Limita a 5 itens mais recentes
    })
  } catch (error) {
    console.error('Erro ao buscar locais:', error)
    throw new Error('Falha ao carregar locais')
  }
}
