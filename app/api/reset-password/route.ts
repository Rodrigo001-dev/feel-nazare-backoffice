// app/api/reset-password/route.js
import bcrypt from 'bcryptjs'
import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()

  try {
    // Verificar se o token existe e ainda não expirou
    const user = await prisma.users.findFirst({
      where: {
        reset_token: token,
        reset_token_expiration: {
          gt: new Date(), // Verifica se a data de expiração é maior que agora
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Token inválido ou expirado' },
        { status: 400 },
      )
    }

    // Criptografar a nova senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Atualizar a senha do usuário e limpar os campos de reset
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiration: null,
      },
    })

    return NextResponse.json(
      { message: 'Senha atualizada com sucesso' },
      { status: 200 },
    )
  } catch (err) {
    console.error('Erro ao atualizar a senha:', err)
    return NextResponse.json(
      { message: 'Erro ao atualizar a senha' },
      { status: 500 },
    )
  }
}
