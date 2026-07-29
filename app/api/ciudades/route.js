import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const estado_id = searchParams.get('estado_id')

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  const [rows] = await connection.execute(
    'SELECT id, nombre FROM ciudad WHERE estado_id = ?',
    [estado_id]
  )

  return NextResponse.json(rows)
}
