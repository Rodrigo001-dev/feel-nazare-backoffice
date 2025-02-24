import { Upload } from '@aws-sdk/lib-storage'
import { NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'
import { s3Client } from '@/lib/s3-client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileKey = `${crypto.randomUUID()}-${file.name}`

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: env.NEXT_PUBLIC_BUCKET_NAME,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      },
    })

    await upload.done()

    const fileUrl = `${env.NEXT_PUBLIC_BUCKET_URL}/${fileKey}`

    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 },
    )
  }
}
