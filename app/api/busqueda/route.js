import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req) {
  try {
    const { query } = await req.json()
    const like = `%${query.toLowerCase()}%`

    const [rows] = await db.query(
      `SELECT DISTINCT p.id, p.nombre, p.descripcion, i.ruta_archivo AS imagen_url
       FROM nombreplatillo p
       LEFT JOIN imagen i ON i.objeto_id = p.id AND i.tipo_objeto = 'platillo'
       LEFT JOIN platilloingrediente pi ON pi.nombre_platillo_id = p.id
       LEFT JOIN ingrediente ing ON ing.id = pi.ingrediente_id
       WHERE LOWER(p.nombre) LIKE ?
          OR LOWER(p.descripcion) LIKE ?
          OR LOWER(ing.nombre) LIKE ?`,
      [like, like, like]
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error en búsqueda:', error)
    return NextResponse.json({ error: 'Error en búsqueda' }, { status: 500 })
  }
}
