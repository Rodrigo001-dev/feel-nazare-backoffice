// app/api/locais-concelho/route.js

import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

interface LocalData {
  morada: string
  nome: string
  imageUrl?: string
  tempoEstimado?: Date
}

// Manipulador de GET (Exemplo)
export async function GET() {
  try {
    const locais = await prisma.locais.findMany()
    return NextResponse.json(locais)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao buscar locais' },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Corpo da requisição:', body)

    // Verifica campos obrigatórios
    if (!body.morada || !body.nome) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não fornecidos' },
        { status: 400 },
      )
    }

    // Prepara os dados base
    const data: LocalData = {
      morada: body.morada,
      nome: body.nome,
    }

    // Adiciona imageUrl se fornecida
    if (body.imageUrl) {
      data.imageUrl = body.imageUrl
    }

    // Processa o tempo estimado se fornecido
    if (body.tempoEstimado) {
      const [hours, minutes] = body.tempoEstimado.split(':')
      const tempoEstimadoDate = new Date()
      tempoEstimadoDate.setHours(parseInt(hours, 10))
      tempoEstimadoDate.setMinutes(parseInt(minutes, 10))
      tempoEstimadoDate.setSeconds(0)
      tempoEstimadoDate.setMilliseconds(0)
      data.tempoEstimado = tempoEstimadoDate
    }

    // Cria o novo local no banco de dados
    const newLocal = await prisma.locais.create({
      data,
    })

    return NextResponse.json(newLocal, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar local:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar o local' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    await prisma.locais.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json(
      { message: 'Local excluído com sucesso' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro ao excluir local:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir local' },
      { status: 500 },
    )
  }
}
