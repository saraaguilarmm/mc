'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

export default function DetallePlatillo() {
  const router = useRouter()
  const params = useParams()
  const [platillo, setPlatillo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlatillo = async () => {
      try {
        const response = await fetch(`/api/platillos/${params.id}`)
        const data = await response.json()
        setPlatillo(data)
      } catch (error) {
        console.error('Error fetching platillo:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlatillo()
  }, [params.id])

  if (loading) return <div className="text-center p-8">Cargando...</div>
  if (!platillo) return <div className="text-center p-8">Platillo no encontrado</div>

  return (
    <div className="min-h-screen bg-pistachio-green text-white p-8">
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-green-200 hover:text-white"
      >
        ← Volver a Platillos
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
            <Image
              src={platillo.imagen || '/default-food.jpg'}
              alt={platillo.nombre}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{platillo.nombre}</h1>
            <p className="mb-6">{platillo.descripcion}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Ingredientes:</h2>
              <ul className="list-disc pl-5">
                {platillo.ingredientes.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Ciudad de Origen:</h3>
                <p>{platillo.ciudadOrigen}</p>
              </div>
              <div>
                <h3 className="font-semibold">Tipo:</h3>
                <p>{platillo.tipo}</p>
              </div>
              <div>
                <h3 className="font-semibold">Dificultad:</h3>
                <p>{platillo.dificultad}</p>
              </div>
              <div>
                <h3 className="font-semibold">Tiempo:</h3>
                <p>{platillo.tiempoPreparacion}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded flex items-center gap-2">
                ❤️ Favorito
              </button>
              <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded flex items-center gap-2">
                🗓️ Agendar
              </button>
              <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded flex items-center gap-2">
                📚 Añadir a colección
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}