'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'

export default function CalificarPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comentario, setComentario] = useState('')
  const [mensaje, setMensaje] = useState('')

  const enviarReseña = async () => {
    if (rating === 0 || comentario.trim() === '') {
      setMensaje('❌ Debes seleccionar una calificación y escribir un comentario.')
      return
    }

    const res = await fetch('/api/calificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comentario }),
    })

    const data = await res.json()
    if (res.ok) {
      setMensaje('✅ ¡Gracias por tu calificación!')
      setRating(0)
      setComentario('')
    } else {
      setMensaje('❌ Ocurrió un error al guardar tu calificación.')
    }
  }

  return (
    <div className="min-h-screen bg-rose-100 text-brown-800 p-8">
      <button onClick={() => router.back()} className="mb-6 text-brown-600 underline">🔙 Regresar</button>
      <h1 className="text-3xl font-bold mb-4 text-center text-brown-900">⭐ Calificar</h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
        <p className="font-semibold text-lg mb-4 text-center">¿Qué te pareció esta experiencia?</p>

        {/* Estrellas */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              size={32}
              onClick={() => setRating(num)}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(0)}
              className={`cursor-pointer transition-colors ${
                (hovered || rating) >= num ? 'text-yellow-500' : 'text-gray-300'
              }`}
              fill={(hovered || rating) >= num ? 'currentColor' : 'none'}
            />
          ))}
        </div>

        {/* Comentario */}
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full border border-rose-300 p-3 rounded mb-4"
          rows={4}
          placeholder="Escribe un comentario..."
        />

        <button
          onClick={enviarReseña}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded"
        >
          📤 Enviar Reseña
        </button>

        {mensaje && <p className="mt-4 text-center font-semibold">{mensaje}</p>}
      </div>
    </div>
  )
}
