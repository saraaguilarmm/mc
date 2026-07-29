'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatilloCard from '../../components/PlatilloCard'

export default function BebidasPage() {
  const router = useRouter()
  const [bebidas, setBebidas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const response = await fetch('/api/bebidas')
        if (!response.ok) throw new Error('Error al obtener las bebidas')
        const data = await response.json()
        setBebidas(data)
      } catch (error) {
        console.error('Error fetching bebidas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBebidas()
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de borrar esta bebida?')
    if (!confirm) return

    try {
      const response = await fetch(`/api/platillos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Error al borrar bebida')

      // Actualizar lista local
      setBebidas((prev) => prev.filter((b) => b.id !== id))
    } catch (error) {
      console.error('Error al borrar bebida:', error)
    }
  }

  return (
    <div className="min-h-screen bg-rose-100 text-brown-800 p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center text-pink-700">BEBIDAS MEXICANAS</h1>
        <p className="text-center mt-4 text-brown-700">Refresca tu paladar con bebidas tradicionales</p>
      </header>

      <div className="mb-6 text-center">
        <button
          onClick={() => router.push('/')}
          className="bg-[#8B4513] hover:bg-[#5C3317] text-white font-semibold py-2 px-6 rounded-full shadow"
        >
          ← Regresar al inicio
        </button>
      </div>

      {loading ? (
        <div className="text-center text-brown-600 font-semibold">Cargando bebidas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bebidas.length === 0 ? (
            <div className="col-span-full text-center text-pink-500 font-semibold">
              No hay bebidas disponibles.
            </div>
          ) : (
            bebidas.map((bebida) => (
              <div key={bebida.id} className="relative">
                <PlatilloCard
                  platillo={bebida}
                  onClick={() => router.push(`/platillos/${bebida.id}`)}
                />
                <button
                  onClick={() => handleDelete(bebida.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full shadow"
                >
                  🗑 Borrar
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
