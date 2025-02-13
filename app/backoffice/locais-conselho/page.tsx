// app/backoffice/locais-concelho/route.js

import dayjs from 'dayjs'
import Image from 'next/image'

import { getLocais } from '@/http/get-locais'

import { LocalForm } from './components/local-form'

export default async function LocaisConselhoPage() {
  const locais = await getLocais()

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Gerenciar Locais de Conselho
      </h1>

      {/* Formulário - Client Component */}
      <LocalForm />

      {/* Lista de Locais */}
      <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Lista de Locais</h2>

        {locais.length === 0 ? (
          <p className="text-gray-500">Nenhum local cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Morada</th>
                  <th className="border border-gray-300 p-2">Nome</th>
                  <th className="border border-gray-300 p-2">Imagem</th>
                  <th className="border border-gray-300 p-2">Tempo Estimado</th>
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
                        <div className="relative h-16 w-16">
                          <Image
                            src={local.imageUrl}
                            alt={`Imagem de ${local.nome}`}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {dayjs(local.tempoEstimado).format('DD/MM/YYYY HH:mm')}
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
