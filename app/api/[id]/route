'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function DetallePlatilloPage() {
  const router = useRouter()
  const { id } = useParams()
  const [platillo, setPlatillo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlatillo = async () => {
      try {
        const res = await fetch(`/api/platillos/${id}`)
        if (!res.ok) throw new Error('No encontrado')
        const data = await res.json()
        setPlatillo(data)
      } catch (err) {
        console.error('Error cargando detalle:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlatillo()
  }, [id])

  if (loading) return <p className="text-center text-pink-700">Cargando detalles...</p>
  if (!platillo) return <p className="text-center text-red-600">Platillo no encontrado</p>

  return (
    <div className="min-h-screen bg-rose-50 text-brown-800 p-8">
      <h1 className="text-3xl font-bold mb-4">{platillo.nombre}</h1>
      <p className="mb-4">{platillo.descripcion}</p>
      {/* Puedes agregar más campos */}
      <button
        onClick={() => router.back()}
        className="bg-[#8B4513] text-white px-4 py-2 rounded hover:bg-[#5C3317]"
      >
        ← Regresar
      </button>
    </div>
  )
}
