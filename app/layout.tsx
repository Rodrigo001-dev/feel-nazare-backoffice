import './globals.css'

import { Providers } from './providers'

export const metadata = {
  title: 'Feel Nazaré',
  description: 'Feel Nazaré Back office',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
