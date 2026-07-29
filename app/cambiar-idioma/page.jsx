'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css' // ✅ Ruta correcta desde cambiar-idioma

import { useIdioma } from '@/context/IdiomaContext'
import { traducciones } from '@/lib/i18n'

export default function PlanearMenuPage() {
  const router = useRouter()
  const { idioma } = useIdioma()
  const t = traducciones[idioma]

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date())
  const [nota, setNota] = useState('')
  const [notasGuardadas, setNotasGuardadas] = useState({})

  const fechaKey = fechaSeleccionada.toDateString()

  useEffect(() => {
    const notasGuardadasEnLS = localStorage.getItem('notas_menu')
    if (notasGuardadasEnLS) {
      setNotasGuardadas(JSON.parse(notasGuardadasEnLS))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notas_menu', JSON.stringify(notasGuardadas))
  }, [notasGuardadas])

  const guardarNota = () => {
    if (!nota.trim()) return
    setNotasGuardadas((prev) => ({ ...prev, [fechaKey]: nota }))
    setNota('')
  }

  const borrarNota = () => {
    const nuevasNotas = { ...notasGuardadas }
    delete nuevasNotas[fechaKey]
    setNotasGuardadas(nuevasNotas)
    setNota('')
  }

  return (
    <div className="min-h-screen bg-rose-50 p-8 text-brown-800">
      <button onClick={() => router.back()} className="mb-6 text-brown-600 underline">
        {t.regresar}
      </button>

      <h1 className="text-3xl font-bold text-center mb-6 text-brown-900">{t.titulo}</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <Calendar
          onChange={setFechaSeleccionada}
          value={fechaSeleccionada}
          className="mx-auto mb-6"
          tileContent={({ date }) => {
            const key = date.toDateString()
            const notaDia = notasGuardadas[key]
            return notaDia ? (
              <div className="text-[10px] mt-1 text-pink-600 text-center truncate">
                {notaDia.slice(0, 15)}
              </div>
            ) : null
          }}
        />

        <h2 className="text-lg font-semibold mb-2">{t.diaSeleccionado}: {fechaKey}</h2>

        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder={t.placeholder}
          className="w-full border border-rose-300 p-3 rounded mb-4"
          rows={4}
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={guardarNota}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded"
          >
            {t.guardar}
          </button>

          {notasGuardadas[fechaKey] && (
            <button
              onClick={borrarNota}
              className="bg-brown-400 hover:bg-brown-500 text-white font-bold py-2 px-6 rounded"
            >
              {t.borrar}
            </button>
          )}
        </div>

        {notasGuardadas[fechaKey] && (
          <div className="mt-6 bg-pink-100 p-4 rounded">
            <h3 className="font-bold text-brown-800">{t.notaGuardada}</h3>
            <p>{notasGuardadas[fechaKey]}</p>
          </div>
        )}
      </div>
    </div>
  )
}