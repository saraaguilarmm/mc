import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT id, nombre, descripcion, imagen_url 
      FROM nombreplatillo
    `)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error en GET /api/platillos:', error)
    return NextResponse.json({ error: 'Error al obtener platillos' }, { status: 500 })
  }
}
