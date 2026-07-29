import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  const [resultados] = await connection.execute(
    `SELECT np.* FROM nombreplatillo np
     LEFT JOIN platilloingrediente pi ON np.id = pi.nombre_platillo_id
     LEFT JOIN ingrediente i ON pi.ingrediente_id = i.id
     WHERE LOWER(np.nombre) LIKE ? OR LOWER(i.nombre) LIKE ?`,
    [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`]
  )

  await connection.end()
  return NextResponse.json(resultados)
}
