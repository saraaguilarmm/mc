import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import path from 'path'
import { writeFile } from 'fs/promises'

export const config = {
  api: { bodyParser: false },
}

export async function POST(request, { params }) {
  const { id } = params
  const formData = await request.formData()
  const file = formData.get('imagen')

  if (!file || typeof file.name !== 'string') {
    return NextResponse.json({ error: 'Imagen no válida' }, { status: 400 })
  }

  // Guarda el archivo físicamente
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)
  await writeFile(filePath, buffer)
  const imageUrl = `/uploads/${fileName}`

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  // Inserta en imagen con las columnas correctas
  const [result] = await connection.execute(
    `INSERT INTO imagen (ruta_archivo, tipo_objeto, objeto_id)
     VALUES (?, 'platillo', ?)`,
    [imageUrl, id]
  )
  const imagenId = result.insertId

  // Actualiza el platillo
  await connection.execute(
    'UPDATE nombreplatillo SET imagen_id = ? WHERE id = ?',
    [imagenId, id]
  )

  // Devuelve el platillo actualizado
  const [updated] = await connection.execute(
    `SELECT p.*, i.ruta_archivo AS imagen_url
     FROM nombreplatillo p
     LEFT JOIN imagen i
       ON i.tipo_objeto = 'platillo' AND i.objeto_id = p.id
     WHERE p.id = ?`,
    [id]
  )

  return NextResponse.json(updated[0])
}
