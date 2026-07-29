'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditarReceta({ params }) {
  const router = useRouter()
  const { id } = params

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [imagen_url, setImagenUrl] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const cargarReceta = async () => {
      const res = await fetch(`/api/mis-recetas/${id}`)
      const data = await res.json()
      setNombre(data.nombre || '')
      setDescripcion(data.descripcion || '')
      setIngredientes(data.ingredientes || '')
      setImagenUrl(data.imagen_url || '')
    }
    cargarReceta()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/mis-recetas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        ingredientes,
        imagen_url,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Error al actualizar receta:', errorText)
      setMensaje('❌ Error al actualizar')
      return
    }

    setMensaje('✅ Receta actualizada con éxito')
    setTimeout(() => router.push('/mis-recetas'), 1500)
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-rose-100 p-8 rounded-xl shadow-xl border border-rose-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-800">Editar Receta</h2>

      {mensaje && (
        <p className="mb-4 text-center font-semibold text-green-700">{mensaje}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-pink-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border border-pink-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
        />
        <textarea
          placeholder="Ingredientes (separados por comas)"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          className="w-full border border-pink-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen_url}
          onChange={(e) => setImagenUrl(e.target.value)}
          className="w-full border border-pink-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
        />
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => router.push('/mis-recetas')}
            className="text-brown-800 bg-pink-200 px-4 py-2 rounded hover:bg-pink-300"
          >
            ← Regresar
          </button>
        </div>
      </form>
    </div>
  )
}
