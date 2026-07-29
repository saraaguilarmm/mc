'use client'

/* ✅ /app/bebidas/page.jsx */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatilloCard from '@/components/PlatilloCard'

// el resto del componente...


export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM nombreplatillo WHERE categoriaingredientes = "Bebidas y fermentados"')
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener bebidas' }, { status: 500 })
  }
}

// ✅ /app/api/postres/route.js
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM nombreplatillo WHERE categoriaingredientes IN ("Azúcares y dulces", "Frutas", "Pan y productos de panadería")')
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener postres' }, { status: 500 })
  }
}

// ✅ /app/bebidas/page.jsx
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

// ✅ /app/postres/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatilloCard from '@/components/PlatilloCard'

export default function PostresPage() {
  const router = useRouter()
  const [postres, setPostres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPostres = async () => {
      try {
        const response = await fetch('/api/postres')
        const data = await response.json()
        setPostres(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error cargando postres:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPostres()
  }, [])

  return (
    <div className="min-h-screen bg-yellow-800 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center">POSTRES MEXICANOS</h1>
        <p className="text-center mt-4">Deléitate con los sabores dulces de México</p>
      </header>

      {loading ? (
        <div className="text-center">Cargando postres...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postres.length === 0 ? (
            <div className="col-span-full text-center text-gray-300">No hay postres disponibles.</div>
          ) : (
            postres.map((postre) => (
              <PlatilloCard
                key={postre.id}
                platillo={postre}
                onClick={() => router.push(`/postres/${postre.id}`)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
