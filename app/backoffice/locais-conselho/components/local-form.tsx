/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { uploadFile } from '@/http/upload-file'
import { customRevalidateTag } from '@/utils/next/revalidate-tag'

import { LocalConselhoFormData, localConselhoSchema } from '../schema'

interface FileWithStatus {
  id: string
  file: File
  progress: number
  status: 'waiting' | 'uploading' | 'completed' | 'error'
  url?: string
  error?: string
}

export function LocalForm() {
  const [selectedFile, setSelectedFile] = useState<FileWithStatus | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LocalConselhoFormData>({
    resolver: zodResolver(localConselhoSchema),
  })

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: 'waiting',
    })
  }

  async function handleFileUpload(file: File): Promise<string> {
    try {
      setSelectedFile((current) =>
        current ? { ...current, status: 'uploading' } : null,
      )

      const fileUrl = await uploadFile({
        file,
        onProgress: (progress) => {
          setSelectedFile((current) =>
            current ? { ...current, progress } : null,
          )
        },
      })

      setSelectedFile((current) =>
        current ? { ...current, status: 'completed', url: fileUrl } : null,
      )

      return fileUrl
    } catch (error) {
      setSelectedFile((current) =>
        current
          ? {
              ...current,
              status: 'error',
              error: 'Erro ao fazer upload do arquivo',
            }
          : null,
      )
      throw error
    }
  }

  async function onSubmit(data: LocalConselhoFormData) {
    try {
      let imageUrl: string | undefined

      if (selectedFile?.file && selectedFile.status !== 'completed') {
        imageUrl = await handleFileUpload(selectedFile.file)
      } else if (selectedFile?.status === 'completed') {
        imageUrl = selectedFile.url
      }

      const response = await fetch('/api/locais-concelho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          morada: data.morada,
          nome: data.nome,
          tempoEstimado: data.tempoEstimado,
          imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar local')
      }

      customRevalidateTag('api/locais-concelho')
      toast.success('Local guardado com sucesso!!')
      reset()
      setSelectedFile(null)
    } catch (error) {
      toast.error('Erro ao salvar local')
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Adicionar Novo Local</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Morada</label>
          <input
            type="text"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Insira a morada"
            {...register('morada')}
          />
          {errors.morada && (
            <span className="text-sm text-red-500">
              {errors.morada.message}
            </span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Nome</label>
          <input
            type="text"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Insira o nome do local"
            {...register('nome')}
          />
          {errors.nome && (
            <span className="text-sm text-red-500">{errors.nome.message}</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Imagem</label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{selectedFile.file.name}</span>
                {selectedFile.status === 'uploading' && (
                  <span className="text-sm text-blue-500">
                    {selectedFile.progress}%
                  </span>
                )}
              </div>
              {selectedFile.status === 'uploading' && (
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${selectedFile.progress}%` }}
                  />
                </div>
              )}
              {selectedFile.status === 'error' && (
                <span className="text-sm text-red-500">
                  {selectedFile.error}
                </span>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tempo Estimado
          </label>
          <input
            type="time"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('tempoEstimado')}
          />
          {errors.tempoEstimado && (
            <span className="text-sm text-red-500">
              {errors.tempoEstimado.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || selectedFile?.status === 'uploading'}
          className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        >
          {isSubmitting || selectedFile?.status === 'uploading'
            ? 'Salvando...'
            : 'Adicionar Local'}
        </button>
      </form>
    </div>
  )
}
