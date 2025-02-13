import '../globals.css'

import Link from 'next/link'

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Comum */}
      <header
        className="bg-blue-600 p-4 shadow-lg"
        style={{ backgroundColor: '#90B7E1' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Título */}
          <Link href="/backoffice" className="flex items-center space-x-2">
            <img
              src="/feelnazare-horizontal_white.png" // Caminho para a imagem
              alt="Logo Feel Nazaré"
              className="h-10" // Ajuste o tamanho da imagem conforme necessário
            />
          </Link>

          {/* Menu de Navegação Centralizado */}
          <nav className="flex flex-1 justify-center space-x-6">
            <Link
              href="/backoffice/car-spottings"
              className="text-white hover:text-gray-200"
            >
              Car Spottings
            </Link>
            <Link
              href="/backoffice/locais-conselho"
              className="text-white hover:text-gray-200"
            >
              Locais de Conselho
            </Link>
          </nav>

          {/* Link "Sair" à Direita */}
          <Link href="/login" className="text-white hover:text-gray-200">
            Sair
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal das Páginas */}
      <main className="flex-1 p-4">{children}</main>

      {/* Rodapé (opcional) */}
      <footer className="bg-gray-800 p-4 text-center text-white">
        <p>&copy; 2024 Meu BackOffice. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
