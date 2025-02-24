import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    MY_AWS_ACCESS_KEY_ID: z.string(),
    MY_AWS_SECRET_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_TOKEN: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_BUCKET_NAME: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_BUCKET_URL: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    MY_AWS_ACCESS_KEY_ID: process.env.MY_AWS_ACCESS_KEY_ID,
    MY_AWS_SECRET_ACCESS_KEY_ID: process.env.MY_AWS_SECRET_ACCESS_KEY_ID,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
    NEXT_PUBLIC_BUCKET_NAME: process.env.NEXT_PUBLIC_BUCKET_NAME,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL,
  },
  emptyStringAsUndefined: true,
})
