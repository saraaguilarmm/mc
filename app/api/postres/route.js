import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT p.*, MAX(i.ruta_archivo) AS imagen_url
      FROM nombreplatillo p
      LEFT JOIN imagen i
        ON i.tipo_objeto = 'platillo' AND i.objeto_id = p.id
      WHERE p.categoriaingrediente_id IN (2, 8, 14)
      GROUP BY p.id
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error en /api/postres:', error)
    return NextResponse.json({ error: 'Error al obtener postres' }, { status: 500 })
  }
}


/*import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT p.*, i.ruta_archivo AS imagen_url
      FROM nombreplatillo p
      LEFT JOIN imagen i
        ON i.tipo_objeto = 'platillo' AND i.objeto_id = p.id
      WHERE p.categoriaingrediente_id IN (2, 8, 14)
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error en /api/postres:', error)
    return NextResponse.json({ error: 'Error al obtener postres' }, { status: 500 })
  }
}
  */

/*import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT * FROM nombreplatillo
      WHERE categoriaingrediente_id IN (2, 8, 14)
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error en /api/postres:', error)
    return NextResponse.json({ error: 'Error al obtener postres' }, { status: 500 })
  }
}
*/