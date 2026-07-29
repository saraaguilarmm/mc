'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditarPlatilloPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ciudadId, setCiudadId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlatillo = async () => {
      try {
        const res = await fetch(`/api/platillos/${id}`)
        if (!res.ok) throw new Error('No encontrado')
        const data = await res.json()
        setNombre(data.nombre || '')
        setDescripcion(data.descripcion || '')
        setCiudadId(data.ciudad_id || '')
      } catch (err) {
        console.error('Error al cargar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlatillo()
  }, [id])

  const handleActualizar = async () => {
    if (!nombre || !descripcion || !ciudadId) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      const res = await fetch(`/api/platillos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          descripcion,
          ciudad_id: ciudadId
        })
      })

      if (!res.ok) throw new Error('Error al actualizar')

      alert('Platillo actualizado con éxito')
      router.push('/platillos')
    } catch (err) {
      console.error('Error al actualizar:', err)
      alert('Error al actualizar')
    }
  }

  if (loading) return <p className="text-center text-pink-700">Cargando...</p>

  return (
    <div className="min-h-screen bg-rose-50 text-brown-800 p-8">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">Editar Platillo</h1>

      <label className="block mb-2">Nombre:</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 mb-4 border border-pink-300 rounded"
      />

      <label className="block mb-2">Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-2 mb-4 border border-pink-300 rounded"
      />

      <label className="block mb-2">Ciudad ID:</label>
      <input
        value={ciudadId}
        onChange={(e) => setCiudadId(e.target.value)}
        className="w-full p-2 mb-6 border border-pink-300 rounded"
      />

      <button
        onClick={handleActualizar}
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow mr-4"
      >
        💾 Actualizar
      </button>

      <button
        onClick={() => router.push('/platillos')}
        className="bg-[#8B4513] hover:bg-[#5C3317] text-white px-4 py-2 rounded"
      >
        ← Regresar
      </button>
    </div>
  )
}



/*'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditarPlatilloPage() {
  const router = useRouter()
  const { id } = useParams()

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ciudadId, setCiudadId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlatillo = async () => {
      try {
        const res = await fetch(`/api/platillos/${id}`)
        if (!res.ok) throw new Error('No encontrado')
        const data = await res.json()
        setNombre(data.nombre || '')
        setDescripcion(data.descripcion || '')
        setCiudadId(data.ciudad_id || '')
      } catch (err) {
        console.error('Error al cargar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlatillo()
  }, [id])

  const handleActualizar = async () => {
    if (!nombre || !descripcion || !ciudadId) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      const res = await fetch(`/api/platillos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          descripcion,
          ciudad_id: ciudadId
        })
      })

      if (!res.ok) throw new Error('Error al actualizar')

      alert('Platillo actualizado con éxito')
      router.push('/platillos')
    } catch (err) {
      console.error('Error al actualizar:', err)
      alert('Error al actualizar')
    }
  }

  if (loading) return <p className="text-center text-pink-700">Cargando...</p>

  return (
    <div className="min-h-screen bg-rose-50 text-brown-800 p-8">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">Editar Platillo</h1>

      <label className="block mb-2">Nombre:</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 mb-4 border border-pink-300 rounded"
      />

      <label className="block mb-2">Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-2 mb-4 border border-pink-300 rounded"
      />

      <label className="block mb-2">Ciudad ID:</label>
      <input
        value={ciudadId}
        onChange={(e) => setCiudadId(e.target.value)}
        className="w-full p-2 mb-6 border border-pink-300 rounded"
      />

      <button
        onClick={handleActualizar}
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow mr-4"
      >
        💾 Actualizar
      </button>

      <button
        onClick={() => router.push('/platillos')}
        className="bg-[#8B4513] hover:bg-[#5C3317] text-white px-4 py-2 rounded"
      >
        ← Regresar
      </button>
    </div>
  )
}
*/