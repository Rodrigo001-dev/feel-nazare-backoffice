/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/car-spottings/route.js

import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const spottings = await prisma.carSpotting.findMany()
    return new Response(JSON.stringify(spottings), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro ao buscar os car spottings' }),
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Corpo da requisição:', body)

    // Verifique se os campos obrigatórios estão presentes
    if (!body.morada || !body.nome || !body.tempoEstimado) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios não fornecidos' }),
        { status: 400 },
      )
    }

    // Crie o car spotting no banco de dados
    const newSpotting = await prisma.carSpotting.create({
      data: {
        morada: body.morada,
        nome: body.nome,
        imageUrl: body.imageUrl, // Agora recebemos a URL diretamente
        tempoEstimado: body.tempoEstimado,
        mapLink: body.mapLink,
      },
    })

    return new Response(JSON.stringify(newSpotting), { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar car spotting:', error)
    return new Response(
      JSON.stringify({ error: 'Erro ao salvar o car spotting' }),
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    await prisma.carSpotting.delete({
      where: { id: Number(id) },
    })

    return new Response(
      JSON.stringify({ message: 'Car spotting excluído com sucesso' }),
      { status: 200 },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro ao excluir o car spotting' }),
      { status: 500 },
    )
  }
}
