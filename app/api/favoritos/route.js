import { NextResponse } from 'next/server'
import db from '@/lib/db'

// Obtener todos los favoritos
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT np.* 
      FROM favoritos f
      JOIN nombreplatillo np ON f.platillo_id = np.id
      WHERE f.usuario_id = 1
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error al obtener favoritos:', error)
    return NextResponse.json({ error: 'Error al obtener favoritos' }, { status: 500 })
  }
}

// Agregar un platillo a favoritos
export async function POST(request) {
  try {
    const body = await request.json()
    const { platillo_id } = body

    if (!platillo_id) {
      return NextResponse.json({ error: 'platillo_id es requerido' }, { status: 400 })
    }

    await db.query(
      'INSERT IGNORE INTO favoritos (platillo_id, usuario_id, tipo) VALUES (?, 1, "platillo")',
      [platillo_id]
    )

    return NextResponse.json({ mensaje: 'Favorito guardado' })
  } catch (error) {
    console.error('Error al guardar favorito:', error)
    return NextResponse.json({ error: 'Error al guardar favorito' }, { status: 500 })
  }
}

// Eliminar un platillo de favoritos
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { platillo_id } = body

    if (!platillo_id) {
      return NextResponse.json({ error: 'platillo_id es requerido' }, { status: 400 })
    }

    await db.query(
      'DELETE FROM favoritos WHERE platillo_id = ? AND usuario_id = 1',
      [platillo_id]
    )

    return NextResponse.json({ mensaje: 'Favorito eliminado' })
  } catch (error) {
    console.error('Error al eliminar favorito:', error)
    return NextResponse.json({ error: 'Error al eliminar favorito' }, { status: 500 })
  }
}
