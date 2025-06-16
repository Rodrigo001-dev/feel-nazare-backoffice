// app/backoffice/locais-concelho/route.js

import { MapPin } from 'lucide-react'
import Image from 'next/image'

import { getLocais } from '@/http/get-locais'

import { DeleteLocaisConselho } from './components/delete-locais-conselho'
import { LocalForm } from './components/local-form'

export default async function LocaisConselhoPage() {
  const locais = await getLocais()

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Gerir Locais de Aconselhamento
      </h1>

      {/* Formulário - Client Component */}
      <LocalForm />

      {/* Lista de Locais Aconselhados */}
      <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">
          Lista de Locais Aconselhados
        </h2>

        {locais.length === 0 ? (
          <p className="text-gray-500">
            Não foram encontrados locais aconselhados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Morada</th>
                  <th className="border border-gray-300 p-2">Nome</th>
                  <th className="border border-gray-300 p-2">Imagem</th>
                  <th className="border border-gray-300 p-2">Tempo Estimado</th>
                  <th className="border border-gray-300">Link do Mapa</th>
                  <th className="border border-gray-300 p-2">Excluir</th>
                </tr>
              </thead>

              <tbody>
                {locais.map((local) => (
                  <tr key={local.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      {local.morada}
                    </td>

                    <td className="border border-gray-300 p-2">{local.nome}</td>

                    <td className="border border-gray-300 p-2">
                      {local.imageUrl && (
                        <div className="relative mx-auto h-16 w-16">
                          <Image
                            src={local.imageUrl}
                            alt={`Imagem de ${local.nome}`}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </td>

                    <td className="w-20 border border-gray-300 p-2">
                      {local.tempoEstimado}
                    </td>

                    <td className="w-20 border border-gray-300">
                      {local.mapLink && (
                        <a
                          href={local.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <MapPin className="size-5 cursor-pointer text-blue-500" />
                        </a>
                      )}
                    </td>

                    <td className="w-1/12 border border-gray-300 p-2">
                      <DeleteLocaisConselho id={local.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
