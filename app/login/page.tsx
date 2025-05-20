// app/login/page.js
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import logo from '../../public/feelnazare-horizontal_smallish-1 2.svg'
import { LoginFormData, loginSchema } from './schema'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao fazer login')
      }

      toast.success('Login realizado com sucesso!')
      router.push('/backoffice')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao fazer login'
      setError(message)
      toast.error(message)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Image src={logo} alt="Feel Nazaré Logo" width={200} height={50} />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Login
        </h2>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-600"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Insira seu nome"
              {...register('nome')}
            />
            {errors.nome && (
              <span className="mt-1 text-sm text-red-500">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Insira sua password"
              {...register('password')}
            />
            {errors.password && (
              <span className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'A iniciar sessão...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 w-full text-center">
          <Link href="/register">
            <button className="w-full rounded-lg bg-gray-600 py-2 text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Registar
            </button>
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 transition hover:text-blue-600 hover:underline"
          >
            Recuperar Password?
          </Link>
        </div>
      </div>
    </div>
  )
}
