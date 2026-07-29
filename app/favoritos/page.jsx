'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PlatilloCard from '@/components/PlatilloCard'

export default function FavoritosPage() {
  const router = useRouter()
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const res = await fetch('/api/favoritos')
        const data = await res.json()
        setFavoritos(data)
      } catch (error) {
        console.error('Error al cargar favoritos:', error)
      } finally {
        setLoading(false)
      }
    }

    obtenerFavoritos()
  }, [])

  const eliminarFavorito = async (id) => {
    try {
      await fetch('/api/favoritos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platillo_id: id })
      })

      setFavoritos(favoritos.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Error al eliminar favorito:', error)
    }
  }

  const eliminarTodos = async () => {
    try {
      // Elimina uno por uno
      for (const item of favoritos) {
        await eliminarFavorito(item.id)
      }
    } catch (error) {
      console.error('Error al eliminar todos:', error)
    }
  }

  if (loading) return <p className="p-8 text-center">Cargando favoritos...</p>

  return (
    <div className="min-h-screen bg-rose-100 text-brown-800 p-8">
      <button
        onClick={() => router.push('/')}
        className="mb-6 text-brown-600 underline hover:text-brown-800 transition"
      >
        🔙 Regresar
      </button>

      <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">⭐ Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="text-center text-gray-600">No tienes platillos en favoritos.</p>
      ) : (
        <>
          <div className="text-center mb-6">
            <button
              onClick={eliminarTodos}
              className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow"
            >
              🗑 Eliminar Todos los Favoritos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritos.map((platillo) => (
              <div key={platillo.id} className="relative">
                <PlatilloCard
                  platillo={platillo}
                  onClick={() => router.push(`/platillos/${platillo.id}`)}
                />
                <button
                  onClick={() => eliminarFavorito(platillo.id)}
                  className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-800 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                  title="Eliminar de favoritos"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
