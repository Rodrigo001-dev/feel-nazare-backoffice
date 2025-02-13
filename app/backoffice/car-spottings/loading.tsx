import { Loader2 } from 'lucide-react'

export default function CarSpottingsPageLoading() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Gerenciar Car Spottings
      </h1>

      {/* Skeleton do Formulário */}
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>

        <div className="space-y-4">
          {/* Skeleton dos campos do formulário */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
            </div>
          ))}

          {/* Skeleton do botão */}
          <div className="h-10 w-full animate-pulse rounded-lg bg-blue-200" />
        </div>
      </div>

      {/* Skeleton da Lista */}
      <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-8 w-40 animate-pulse rounded-md bg-gray-200" />
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </th>
                <th className="border border-gray-300 p-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </th>
                <th className="border border-gray-300 p-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </th>
                <th className="border border-gray-300 p-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Skeleton das linhas da tabela */}
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="relative h-16 w-16">
                      <div className="h-full w-full animate-pulse rounded-lg bg-gray-200" />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
