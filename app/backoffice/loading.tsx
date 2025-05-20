import { Loader2 } from 'lucide-react'

export default function BackofficePageLoading() {
  return (
    <main
      className="min-h-screen p-6"
      aria-label="Dashboard principal carregando"
    >
      <h1 className="sr-only">Carregando Dashboard Feel Nazaré</h1>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Skeleton Car Spottings */}
          <section className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200" />
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            </div>

            <ul className="space-y-4">
              {/* Repetir 5 vezes para simular os itens */}
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center space-x-4">
                  {/* Skeleton para imagem */}
                  <div className="relative h-16 w-16">
                    <div className="h-full w-full animate-pulse rounded-lg bg-gray-200" />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* Skeleton para título */}
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                    {/* Skeleton para morada */}
                    <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />

                    {/* Skeleton para tempo estimado */}
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Skeleton Locais de Aconselhamento */}
          <section className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-8 w-40 animate-pulse rounded-md bg-gray-200" />
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            </div>

            <ul className="space-y-4">
              {/* Repetir 5 vezes para simular os itens */}
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center space-x-4">
                  {/* Skeleton para imagem */}
                  <div className="relative h-16 w-16">
                    <div className="h-full w-full animate-pulse rounded-lg bg-gray-200" />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* Skeleton para título */}
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                    {/* Skeleton para morada */}
                    <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />

                    {/* Skeleton para tempo estimado */}
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
