'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { type ResetPasswordFormData, resetPasswordSchema } from './schema'

export function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const resetToken = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (!resetToken) {
        throw new Error('Token inválido')
      }

      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          password: data.password,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao redefinir senha')
      }

      toast.success('Senha redefinida com sucesso!')
      router.push('/login')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao redefinir senha'
      setError(message)
      toast.error(message)
    }
  }

  return (
    <>
      {error && <div className="mb-4 text-center text-red-500">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Nova Senha
          </label>

          <input
            type="password"
            id="password"
            placeholder="Insira sua nova senha"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('password')}
          />

          {errors.password && (
            <span className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium"
          >
            Confirmar Senha
          </label>

          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme sua nova senha"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('confirmPassword')}
          />

          {errors.confirmPassword && (
            <span className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        >
          {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
        </button>
      </form>
    </>
  )
}
