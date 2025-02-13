import type { PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

import { env } from '@/env'
import { s3Client } from '@/lib/s3-client'

interface uploadFileParams {
  file: File
  onProgress?: (progress: number) => void
}

export async function uploadFile({
  file,
  onProgress,
}: uploadFileParams): Promise<string> {
  const fileKey = `${crypto.randomUUID()}-${file.name}`

  const fileParams: PutObjectCommandInput = {
    Bucket: env.NEXT_PUBLIC_BUCKET_NAME,
    Key: fileKey,
    ContentType: file.type,
    Body: file,
  }

  const upload = new Upload({
    client: s3Client,
    params: fileParams,
    partSize: 1024 * 1024 * 5, // 5MB por parte
    queueSize: 5, // número de uploads paralelos
  })

  // Configurar o evento de progresso
  upload.on('httpUploadProgress', (progress) => {
    if (progress.loaded && progress.total) {
      const progressPercentage = Math.round(
        (progress.loaded / progress.total) * 100,
      )
      onProgress?.(progressPercentage)
    }
  })

  try {
    await upload.done()

    return `${env.NEXT_PUBLIC_BUCKET_URL}/${fileKey}`
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Failed to upload file')
  }
}
