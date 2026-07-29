import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(_req, { params }) {
  const { id } = params

  try {
    const [platilloRows] = await db.query(
      `SELECT np.id, np.nombre, np.descripcion, np.imagen_url,
              c.nombre AS ciudad, e.nombre AS estado
       FROM nombreplatillo np
       JOIN ciudad c ON np.ciudad_id = c.id
       JOIN estado e ON c.estado_id = e.id
       WHERE np.id = ?`,
      [id]
    )

    if (platilloRows.length === 0) {
      return NextResponse.json({ error: 'Platillo no encontrado' }, { status: 404 })
    }

    const platillo = platilloRows[0]

    const [ingredientes] = await db.query(
      `SELECT i.nombre
       FROM platilloingrediente pi
       JOIN ingrediente i ON pi.ingrediente_id = i.id
       WHERE pi.platillo_id = ?`,
      [id]
    )

    platillo.ingredientes = ingredientes.map(i => i.nombre)

    return NextResponse.json(platillo)
  } catch (error) {
    console.error('Error al obtener el platillo:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
