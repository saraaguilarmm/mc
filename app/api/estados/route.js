import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  const [rows] = await connection.execute('SELECT id, nombre FROM estado')
  return NextResponse.json(rows)
}
