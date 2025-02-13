import { S3Client } from '@aws-sdk/client-s3'

import { env } from '@/env'

export const s3Client = new S3Client({
  endpoint: `https://${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.NEXT_PUBLIC_MY_AWS_SECRET_ACCESS_KEY_ID,
  },
})
