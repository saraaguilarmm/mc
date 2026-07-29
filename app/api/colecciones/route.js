import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT np.*
      FROM colecciones c
      JOIN nombreplatillo np ON c.platillo_id = np.id
    `)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error al obtener colecciones:', error)
    return NextResponse.json({ error: 'Error al obtener colecciones' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { platillo_id } = body

    await db.query(
      'INSERT IGNORE INTO colecciones (platillo_id) VALUES (?)',
      [platillo_id]
    )

    return NextResponse.json({ mensaje: 'Agregado a colecciones' })
  } catch (error) {
    console.error('Error al agregar a colecciones:', error)
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { platillo_id } = body

    await db.query(
      'DELETE FROM colecciones WHERE platillo_id = ?',
      [platillo_id]
    )

    return NextResponse.json({ mensaje: 'Eliminado de colecciones' })
  } catch (error) {
    console.error('Error al eliminar de colecciones:', error)
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
