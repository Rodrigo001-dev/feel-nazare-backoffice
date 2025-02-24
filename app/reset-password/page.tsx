// app/reset-password/page.js
import Link from 'next/link'
import { Suspense } from 'react'

import { ResetPasswordForm } from './reset-password-form'

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">Redefinir Senha</h2>

        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>

        <p className="mt-4 text-center text-sm">
          <Link
            href="/login"
            className="text-blue-500 transition hover:text-blue-600 hover:underline"
          >
            Voltar para Login
          </Link>
        </p>
      </div>
    </div>
  )
}
