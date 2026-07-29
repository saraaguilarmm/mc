'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PlatilloCard from '@/components/PlatilloCard'

export default function ColeccionesPage() {
  const router = useRouter()
  const [colecciones, setColecciones] = useState([])

  useEffect(() => {
    const obtenerColecciones = async () => {
      try {
        const res = await fetch('/api/colecciones')
        const data = await res.json()
        if (Array.isArray(data)) {
          setColecciones(data)
        } else {
          setColecciones([])
        }
      } catch (error) {
        console.error('Error al obtener colecciones:', error)
        setColecciones([])
      }
    }

    obtenerColecciones()
  }, [])

  const eliminarColeccion = async (id) => {
    try {
      await fetch('/api/colecciones', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platillo_id: id }),
      })

      setColecciones(colecciones.filter((c) => c.id !== id))
    } catch (error) {
      console.error('Error al eliminar de colecciones:', error)
    }
  }

  return (
    <div className="min-h-screen bg-rose-100 text-brown-800 p-8">
      <button
        onClick={() => router.push('/')}
        className="mb-6 text-brown-600 underline hover:text-brown-800 transition"
      >
        🔙 Regresar
      </button>

      <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">🗂 Colecciones</h1>

      {colecciones.length === 0 ? (
        <p className="text-center text-gray-600">No tienes elementos en colecciones.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colecciones.map((platillo) => (
            <div key={platillo.id} className="relative">
              <PlatilloCard
                platillo={platillo}
                onClick={() => router.push(`/platillos/${platillo.id}`)}
              />
              <button
                onClick={() => eliminarColeccion(platillo.id)}
                className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-800 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                title="Eliminar de colecciones"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
