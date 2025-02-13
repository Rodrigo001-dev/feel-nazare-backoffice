// app/api/register/route.js
import bcrypt from 'bcryptjs'
import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { nome, email, password, cargo, contacto } = await req.json()

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // Inserir o usuário no banco de dados usando Prisma
    const user = await prisma.users.create({
      data: {
        nome,
        email,
        password: hashedPassword,
        cargo,
        contacto,
      },
    })

    return NextResponse.json(
      { message: 'Usuário registrado com sucesso', user },
      { status: 201 },
    )
  } catch (err) {
    console.log('Erro ao registrar usuário:', err)
    return NextResponse.json(
      { message: 'Erro ao registrar usuário' },
      { status: 500 },
    )
  }
}
