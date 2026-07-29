import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET: obtener todos los platillos en colecciones
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

// POST: agregar un platillo a colecciones
export async function POST(request) {
  try {
    const body = await request.json()
    const { platillo_id } = body

    if (!platillo_id) {
      return NextResponse.json({ error: 'Falta platillo_id' }, { status: 400 })
    }

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

// DELETE: eliminar un platillo de colecciones
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { platillo_id } = body

    if (!platillo_id) {
      return NextResponse.json({ error: 'Falta platillo_id' }, { status: 400 })
    }

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
