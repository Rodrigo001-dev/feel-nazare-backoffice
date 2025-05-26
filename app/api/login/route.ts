// app/api/login/route.js

import bcrypt from 'bcryptjs' // Para verificar a senha criptografada
import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { nome, password } = await req.json() // Obtém os dados da requisição

  try {
    // Buscar usuário no banco de dados usando Prisma
    const user = await prisma.users.findFirst({
      where: {
        nome,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Utilizador não encontrado' },
        { status: 401 },
      )
    }

    // Verificar se a senha é válida
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ message: 'Senha inválida' }, { status: 401 })
    }

    // Se a senha for válida, retornar sucesso
    return NextResponse.json({ message: 'Login bem-sucedido' }, { status: 200 })
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
