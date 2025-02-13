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

    // Converte o tempo (HH:mm) para um objeto Date
    const [hours, minutes] = body.tempoEstimado.split(':')
    const tempoEstimadoDate = new Date()
    tempoEstimadoDate.setHours(parseInt(hours, 10))
    tempoEstimadoDate.setMinutes(parseInt(minutes, 10))
    tempoEstimadoDate.setSeconds(0)
    tempoEstimadoDate.setMilliseconds(0)

    // Crie o car spotting no banco de dados
    const newSpotting = await prisma.carSpotting.create({
      data: {
        morada: body.morada,
        nome: body.nome,
        imageUrl: body.imageUrl, // Agora recebemos a URL diretamente
        tempoEstimado: tempoEstimadoDate,
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
