'use client'
import { useState } from 'react'

export default function Calificar() {
  const [usuario, setUsuario] = useState('')
  const [calificacion, setCalificacion] = useState(5)
  const [comentario, setComentario] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/calificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, calificacion, comentario })
    })

    const data = await res.json()
    setMensaje(data.mensaje || data.error)
  }

  return (
    <div className="p-6 bg-rose-100 text-brown-800 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">⭐ Califica</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow max-w-md mx-auto">
        <input
          type="text"
          placeholder="Tu nombre o usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={calificacion}
          onChange={(e) => setCalificacion(parseInt(e.target.value))}
          className="w-full border p-2 rounded"
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>
          ))}
        </select>
        <textarea
          placeholder="Tu comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
          Enviar Calificación
        </button>
        {mensaje && <p className="mt-2 text-center font-semibold">{mensaje}</p>}
      </form>
    </div>
  )
}
