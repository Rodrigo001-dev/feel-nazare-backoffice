// app/forgot-password/page.js
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ForgotPasswordFormData, forgotPasswordSchema } from './schema'

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao recuperar a senha')
      }

      toast.success(responseData.message || 'Instruções enviadas com sucesso!')
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Erro ao processar solicitação de recuperação',
      )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">Recuperar Senha</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Insira o seu email"
              {...register('email')}
            />
            {errors.email && (
              <span className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Instruções'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link
            href="/login"
            className="text-blue-500 transition hover:text-blue-600"
          >
            Voltar para Login
          </Link>
        </p>
      </div>
    </div>
  )
}
