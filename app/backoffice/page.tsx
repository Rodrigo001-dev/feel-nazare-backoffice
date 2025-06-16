import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getCarSpottings } from '@/http/get-car-spottings'
import { getLocaisConselho } from '@/http/get-locais-conselho'

export default async function BackofficePage() {
  const [carSpottings, locaisConselho] = await Promise.all([
    getCarSpottings(),
    getLocaisConselho(),
  ])

  return (
    <main className="min-h-screen p-6" aria-label="Dashboard principal">
      <h1 className="sr-only">Dashboard Feel Nazaré</h1>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Seção Car Spottings */}
          <section className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-2xl font-bold">Car Spottings</h2>

              <Link
                href="/backoffice/car-spottings"
                className="text-sm text-blue-500 hover:underline"
              >
                Ver Todos
              </Link>
            </div>

            {carSpottings.length === 0 ? (
              <p className="text-gray-500">Nenhum Car Spotting adicionado.</p>
            ) : (
              <ul className="space-y-4">
                {carSpottings.map((spotting) => (
                  <li key={spotting.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src={spotting.imageUrl || '/placeholder-image.jpg'}
                        alt={`Local ${spotting.nome}`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 64px) 100vw, 64px"
                      />
                    </div>

                    <div>
                      <p className="font-bold">{spotting.nome}</p>

                      <p className="text-sm text-gray-500">{spotting.morada}</p>

                      <p className="text-sm text-gray-400">
                        Tempo estimado: {spotting.tempoEstimado}
                      </p>

                      {spotting.mapLink && (
                        <a
                          href={spotting.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-500 px-2 py-1 text-white"
                        >
                          <MapPin className="size-5" />
                          Ver no mapa
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Seção Locais de Aconselhamento */}
          <section className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-2xl font-bold">
                Locais de Aconselhamento
              </h2>

              <Link
                href="/backoffice/locais-conselho"
                className="text-sm text-blue-500 hover:underline"
              >
                Ver Todos
              </Link>
            </div>

            {locaisConselho.length === 0 ? (
              <p className="text-gray-500">
                Nenhum Local de Conselho adicionado.
              </p>
            ) : (
              <ul className="space-y-4">
                {locaisConselho.map((local) => (
                  <li key={local.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src={local.imageUrl || '/placeholder-image.jpg'}
                        alt={`Local ${local.nome}`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 64px) 100vw, 64px"
                      />
                    </div>

                    <div>
                      <p className="font-bold">{local.nome}</p>

                      <p className="text-sm text-gray-500">{local.morada}</p>
                      {local.tempoEstimado && (
                        <p className="text-sm text-gray-400">
                          Tempo estimado: {local.tempoEstimado}
                        </p>
                      )}

                      {local.mapLink && (
                        <a
                          href={local.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-500 px-2 py-1 text-white"
                        >
                          <MapPin className="size-5" />
                          Ver no mapa
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
