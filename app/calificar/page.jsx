'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CalificarPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('')
  const [calificacion, setCalificacion] = useState(0)
  const [comentario, setComentario] = useState('')
  const [mensaje, setMensaje] = useState('')

  const enviarCalificacion = async () => {
    const res = await fetch('/api/calificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, calificacion, comentario })
    })

    const data = await res.json()
    if (res.ok) {
      setMensaje('✅ ¡Gracias por tu calificación!')
      setUsuario('')
      setComentario('')
      setCalificacion(0)
    } else {
      setMensaje(`❌ ${data.error || 'No se pudo enviar tu calificación'}`)
    }
  }

  return (
    <div className="min-h-screen bg-rose-100 p-8 text-brown-800">
      <button onClick={() => router.back()} className="mb-4 text-brown-700 underline">
        🔙 Regresar
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">⭐ Califica Nuestra Página</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Tu nombre o correo"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full mb-4 p-2 border border-rose-300 rounded"
          required
        />

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setCalificacion(star)}
              className={`text-3xl ${calificacion >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="Escribe un comentario (opcional)"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full mb-4 p-2 border border-rose-300 rounded"
          rows={4}
        />

        <button
          onClick={enviarCalificacion}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar Calificación
        </button>

        {mensaje && <p className="mt-4 text-center font-semibold">{mensaje}</p>}
      </div>
    </div>
  )
}
