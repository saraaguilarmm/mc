'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SuscripcionMexicanoPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [numeroTarjeta, setNumeroTarjeta] = useState('')
  const [cvv, setCvv] = useState('')
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setMensaje('✅ ¡Gracias por suscribirte a México Culture!')
    setNombre('')
    setNumeroTarjeta('')
    setCvv('')
    setFecha('')
  }

  return (
    <div className="min-h-screen bg-rose-50 text-brown-800 p-8">
      <button onClick={() => router.back()} className="mb-6 text-brown-600 underline">
        🔙 Regresar
      </button>
      <h1 className="text-3xl font-bold text-center mb-6 text-brown-900">💳 Suscripción Mexicano</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Nombre del titular"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-rose-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Número de tarjeta"
          value={numeroTarjeta}
          onChange={(e) => setNumeroTarjeta(e.target.value)}
          className="w-full p-2 border border-rose-300 rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="MM/AA"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-1/2 p-2 border border-rose-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-1/2 p-2 border border-rose-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded hover:bg-pink-700"
        >
          🔐 Suscribirme
        </button>
        {mensaje && <p className="text-center font-semibold mt-4">{mensaje}</p>}
      </form>
    </div>
  )
}
