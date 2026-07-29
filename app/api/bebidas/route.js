import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT * FROM nombreplatillo WHERE categoriaingrediente_id = 13
    `)
    return NextResponse.json(rows)
  } catch (err) {
    console.error('Error al obtener bebidas:', err)
    return NextResponse.json({ error: 'Error al obtener bebidas' }, { status: 500 })
  }
}
