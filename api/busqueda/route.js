import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req) {
  try {
    const { query } = await req.json()
    const palabra = `%${query}%`

    const [platillos] = await db.execute(`
      SELECT * FROM nombreplatillo 
      WHERE nombre LIKE ? OR descripcion LIKE ?
    `, [palabra, palabra])

    if (platillos.length === 0) {
      return NextResponse.json({ resultados: [], mensaje: '❌ No se encontró ningún resultado con esa búsqueda.' })
    }

    return NextResponse.json({ resultados: platillos })
  } catch (error) {
    console.error('Error en búsqueda:', error)
    return NextResponse.json({ error: 'Error en la búsqueda' }, { status: 500 })
  }
}
