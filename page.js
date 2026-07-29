'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, ChevronDown, Utensils, MapPin, Carrot } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [mostrarAcerca, setMostrarAcerca] = useState(false)
  const [showVamosMenu, setShowVamosMenu] = useState(false)

  return (
    <div className="min-h-screen bg-pistachio-green text-black font-distillery relative">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${openMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-green-700">Menú</h2>
          <button onClick={() => setOpenMenu(false)}>
            <X className="text-black" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-left">
          <button onClick={() => router.push('/')} className="hover:underline text-green-800">🏠 Inicio</button>
          <button onClick={() => router.push('/platillos')} className="hover:underline text-green-800">🍽️ Ver Platillos</button>
          <button onClick={() => router.push('/estados')} className="hover:underline text-green-800">🗺️ Ver Estados</button>
          <button onClick={() => router.push('/ingredientes')} className="hover:underline text-green-800">🧄 Ver Ingredientes</button>
          <button onClick={() => router.push('/favoritos')} className="hover:underline text-green-800">⭐ Ver Favoritos</button>
          <button onClick={() => router.push('/calendario')} className="hover:underline text-green-800">🗓️ Calendario por Semana</button>
          <button onClick={() => router.push('/mis-recetas')} className="hover:underline text-green-800">🧾 Mis Recetas</button>
          <button onClick={() => router.push('/colecciones')} className="hover:underline text-green-800">📚 Colecciones</button>
          <button onClick={() => router.push('/calificar')} className="hover:underline text-green-800">⭐ Calificar</button>
        </nav>
      </div>

      {/* Encabezado */}
      <header className="flex items-center justify-between px-6 py-4 bg-pistachio-green text-black shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={() => setOpenMenu(true)}>
            <Menu className="text-green-900" />
          </button>
          <h1 className="text-2xl font-bold text-green-900">Mexico Culture</h1>
        </div>
        <input
          type="text"
          placeholder="Busca recetas, ingredientes, técnicas..."
          className="w-1/2 px-4 py-2 border rounded-full focus:outline-none"
        />
        <button className="bg-red-600 text-white px-4 py-2 rounded-full">
          Conviértete en mexicano
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center px-6 py-12 text-center relative">
        {!mostrarAcerca ? (
          <>
            <Image
              src="/centro.png"
              alt="Imagen Centro"
              width={800}
              height={400}
              className="rounded shadow-lg"
            />
            <button
              className="mt-6 bg-green-900 text-white px-6 py-2 rounded hover:bg-green-800"
              onClick={() => setMostrarAcerca(true)}
            >
              ➡️
            </button>
          </>
        ) : (
          <>
            <Image
              src="/acerca.png"
              alt="Acerca de México Cultura"
              width={800}
              height={400}
              className="rounded shadow-lg"
            />
            <button
              className="mt-6 bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
              onClick={() => setMostrarAcerca(false)}
            >
              ⬅️ Volver
            </button>
          </>
        )}

        {/* Botón lateral: Ver Platillos */}
        <div className="absolute top-32 right-6 flex flex-col items-center space-y-4 z-50">
          <button
            className="bg-green-700 text-white px-3 py-2 rounded hover:bg-green-600"
            onClick={() => router.push('/platillos')}
          >
            Ver Platillos
          </button>
          <Image
            src="/bandera-mexico.png"
            alt="Bandera de México"
            width={40}
            height={40}
            className="rounded-full shadow-md"
          />
        </div>

        {/* Nuevo botón "Vamos a" con menú desplegable */}
        <div className="fixed bottom-6 left-6 z-[60]">
          <div className="relative">
            <button
              className="bg-green-700 text-white px-5 py-3 rounded-full hover:bg-green-600 shadow-lg flex items-center gap-2 text-lg font-medium"
              onClick={() => setShowVamosMenu(!showVamosMenu)}
            >
              <span>✈️ Vamos a</span>
              <ChevronDown className={`transition-transform ${showVamosMenu ? 'rotate-180' : ''}`} size={20} />
            </button>

            {showVamosMenu && (
              <div className="absolute bottom-full mb-2 left-0 w-48 bg-green-700 rounded-lg shadow-xl overflow-hidden">
                <button
                  onClick={() => router.push('/platillos')}
                  className="w-full px-4 py-3 text-left hover:bg-green-600 flex items-center gap-2"
                >
                  <Utensils size={18} />
                  Platillos
                </button>
                <button
                  onClick={() => router.push('/estados')}
                  className="w-full px-4 py-3 text-left hover:bg-green-600 flex items-center gap-2"
                >
                  <MapPin size={18} />
                  Estados
                </button>
                <button
                  onClick={() => router.push('/ingredientes')}
                  className="w-full px-4 py-3 text-left hover:bg-green-600 flex items-center gap-2"
                >
                  <Carrot size={18} />
                  Ingredientes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}