'use client'
import { useRouter } from 'next/navigation'

export default function CategoriasPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-rose-50 text-brown-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Selecciona una categoría</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        <div
          onClick={() => router.push('/platillos')}
          className="bg-pink-200 p-6 rounded-xl text-center cursor-pointer hover:bg-pink-300 shadow transition"
        >
          🍽 Platillos
        </div>
        <div
          onClick={() => router.push('/bebidas')}
          className="bg-rose-300 p-6 rounded-xl text-center cursor-pointer hover:bg-rose-400 shadow transition"
        >
          🧃 Bebidas
        </div>
        <div
          onClick={() => router.push('/postres')}
          className="bg-pink-100 p-6 rounded-xl text-center cursor-pointer hover:bg-pink-200 shadow transition"
        >
          🍰 Postres
        </div>
      </div>

      {/* Botón para volver al inicio */}
      <div className="text-center">
        <button
          onClick={() => router.push('/')}
          className="bg-brown-600 hover:bg-brown-700 text-black font-semibold py-2 px-6 rounded-full shadow"
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  )
}
