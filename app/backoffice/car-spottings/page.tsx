import dayjs from 'dayjs'
import Image from 'next/image'

import { getCarSpottings } from '@/http/get-car-spottings'

import { SpottingForm } from './components/spotting-form'

export default async function CarSpottingsPage() {
  const spottings = await getCarSpottings()

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Gerir Car Spottings
      </h1>

      {/* Formulário - Client Component */}
      <SpottingForm />

      {/* Lista de Car Spottings */}
      <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Lista de Car Spottings</h2>

        {spottings.length === 0 ? (
          <p className="text-gray-500">Não foram encontrados Car Spottings.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Morada</th>
                  <th className="border border-gray-300 p-2">Nome do Local</th>
                  <th className="border border-gray-300 p-2">Imagem</th>
                  <th className="border border-gray-300 p-2">Tempo Estimado</th>
                </tr>
              </thead>

              <tbody>
                {spottings.map((spotting) => (
                  <tr key={spotting.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      {spotting.morada}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {spotting.nome}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {spotting.imageUrl && (
                        <div className="relative h-16 w-16">
                          <Image
                            src={spotting.imageUrl}
                            alt={`Imagem de ${spotting.nome}`}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {dayjs(spotting.tempoEstimado).format('DD/MM/YYYY HH:mm')}
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
