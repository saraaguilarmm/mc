// ✅ app/api/bebidas/route.js
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM nombreplatillo WHERE categoriaingredientes_id = 13')
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener bebidas' }, { status: 500 })
  }
}

// ✅ app/api/postres/route.js
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM nombreplatillo WHERE categoriaingredientes_id IN (2, 4, 8)')
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener postres' }, { status: 500 })
  }
}

// ✅ app/bebidas/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatilloCard from '@/components/PlatilloCard'

export default function BebidasPage() {
  const router = useRouter()
  const [bebidas, setBebidas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBebidas = async () => {
      try {
        const response = await fetch('/api/bebidas')
        const data = await response.json()
        setBebidas(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error cargando bebidas:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBebidas()
  }, [])

  return (
    <div className="min-h-screen bg-green-800 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center">BEBIDAS MEXICANAS</h1>
        <p className="text-center mt-4">Disfruta de las bebidas tradicionales de México</p>
      </header>

      {loading ? (
        <div className="text-center">Cargando bebidas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bebidas.length === 0 ? (
            <div className="col-span-full text-center text-gray-300">No hay bebidas disponibles.</div>
          ) : (
            bebidas.map((bebida) => (
              <PlatilloCard
                key={bebida.id}
                platillo={bebida}
                onClick={() => router.push(`/bebidas/${bebida.id}`)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
