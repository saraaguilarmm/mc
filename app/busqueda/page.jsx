'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function BusquedaPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const router = useRouter()
  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch('/api/busqueda', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        })
        const data = await res.json()
        setResultados(data)
      } catch (error) {
        console.error('Error al buscar:', error)
      } finally {
        setLoading(false)
      }
    }

    if (query) buscar()
  }, [query])

  if (loading) return <p className="text-center text-pink-600 mt-10">Cargando resultados...</p>

  return (
    <div className="p-8 bg-[#fbe4e4] min-h-screen">
      <h1 className="text-3xl font-bold text-[#5c4033] mb-4">
        Resultados para: <span className="text-[#d977a5]">{query}</span>
      </h1>

      {resultados.length === 0 ? (
        <p className="text-red-600 font-semibold">No se encontraron resultados</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resultados.map((item) => (
            <li key={item.id} className="border border-[#dcb39b] p-4 rounded-2xl shadow-md bg-[#fff8f2]">
              <h2 className="font-bold text-[#5c4033]">{item.nombre}</h2>
              <p className="text-[#6d4c41]">{item.descripcion}</p>
              {item.imagen_url && (
                <img
                  src={item.imagen_url}
                  alt="Imagen"
                  className="w-full mt-2 rounded-xl border border-[#c48b6f]"
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <button
          onClick={() => router.push('/')}
          className="bg-[#d977a5] hover:bg-[#c24d86] text-white px-6 py-2 rounded-xl shadow-lg transition"
        >
          ← Regresar al Inicio
        </button>
      </div>
    </div>
  )
}
