import { env } from '@/env'

interface uploadFileParams {
  file: File
  onProgress?: (progress: number) => void
}

export async function uploadFile({
  file,
  onProgress,
}: uploadFileParams): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('file', file)

    // Configurar eventos de progresso
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progressPercentage = Math.round(
          (event.loaded / event.total) * 100,
        )
        onProgress?.(progressPercentage)
      }
    })

    // Configurar evento de conclusão
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText)
        resolve(response.url)
      } else {
        reject(new Error('Failed to upload file'))
      }
    })

    // Configurar evento de erro
    xhr.addEventListener('error', () => {
      reject(new Error('Failed to upload file'))
    })

    // Iniciar o upload
    xhr.open('POST', `${env.NEXT_PUBLIC_API_URL}/upload`)
    xhr.send(formData)
  })
}
