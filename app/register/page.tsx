// app/register/page.js
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { RegisterFormData, registerSchema } from './schema'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null)

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao registrar usuário')
      }

      toast.success('Registro realizado com sucesso!')
      router.push('/login')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao registrar usuário'
      setError(message)
      toast.error(message)
    }
  }

  const formFields = [
    {
      name: 'nome' as const,
      label: 'Nome',
      type: 'text',
      placeholder: 'Digite seu nome',
    },
    {
      name: 'email' as const,
      label: 'E-mail',
      type: 'email',
      placeholder: 'Digite seu e-mail',
    },
    {
      name: 'password' as const,
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
    },
    {
      name: 'cargo' as const,
      label: 'Cargo',
      type: 'text',
      placeholder: 'Digite seu cargo',
    },
    {
      name: 'contacto' as const,
      label: 'Contato',
      type: 'text',
      placeholder: 'Digite seu contato',
    },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">Registrar</h2>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                placeholder={field.placeholder}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register(field.name)}
              />
              {errors[field.name] && (
                <span className="mt-1 text-sm text-red-500">
                  {errors[field.name]?.message}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Já possui uma conta?{' '}
          <Link
            href="/login"
            className="text-blue-500 transition hover:text-blue-600 hover:underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
