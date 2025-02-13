// app/api/forgot-password/route.js
import crypto from 'crypto' // Para gerar o token de recuperação de senha
import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { email } = await req.json() // Obtém o e-mail da requisição

  try {
    // Verificar se o e-mail existe no banco de dados usando o Prisma
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'E-mail não encontrado' }),
        { status: 404 },
      )
    }

    // Gerar um token de recuperação de senha
    const resetToken = crypto.randomBytes(20).toString('hex') // Token de 40 caracteres
    const tokenExpiration = new Date(Date.now() + 3600000) // O token expira em 1 hora

    // Atualizar o usuário com o token usando o Prisma
    await prisma.users.update({
      where: {
        email,
      },
      data: {
        reset_token: resetToken,
        reset_token_expiration: tokenExpiration,
      },
    })

    // Retornar o link de redefinição de senha com o token
    return new Response(
      JSON.stringify({
        message: `Clique no link para redefinir sua senha: http://localhost:3000/reset-password?token=${resetToken}`,
      }),
      { status: 200 },
    )
  } catch (err) {
    console.error('Erro ao recuperar senha:', err)
    return new Response(
      JSON.stringify({ message: 'Erro ao recuperar senha' }),
      { status: 500 },
    )
  }
}
