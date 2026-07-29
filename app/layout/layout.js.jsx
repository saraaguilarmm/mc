import '../styles/globals.css'
import { IdiomaProvider } from '@/context/IdiomaContext'

export const metadata = {
  title: 'Catálogo de Platillos',
  description: 'Descubre platillos mexicanos tradicionales.',
  keywords: ['platillos', 'recetas', 'gastronomía', 'México', 'cultura mexicana'],
  authors: [{ name: 'Tu Nombre o Proyecto' }],
  creator: 'Tu Nombre o Marca',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <IdiomaProvider>
          {children}
        </IdiomaProvider>
      </body>
    </html>
  )
}
