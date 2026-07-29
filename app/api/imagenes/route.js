import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(request) {
  try {
    const data = await request.json()
    const { ruta_archivo, objeto_id, tipo_objeto } = data

    if (!ruta_archivo || !objeto_id || !tipo_objeto) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'sarai3005',
      database: 'catalogo_alimento'
    })

    // Insertar imagen con campos correctos
    const [result] = await connection.execute(
      `INSERT INTO imagen (ruta_archivo, tipo_objeto, objeto_id)
       VALUES (?, ?, ?)`,
      [ruta_archivo, tipo_objeto, objeto_id]
    )

    return NextResponse.json({ mensaje: 'Imagen guardada correctamente', id: result.insertId })
  } catch (error) {
    console.error('Error al guardar imagen:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
