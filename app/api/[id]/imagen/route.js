import { writeFile } from 'fs/promises'
import path from 'path'
import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request, { params }) {
  const { id } = params
  const formData = await request.formData()
  const file = formData.get('imagen')

  if (!file || typeof file === 'string') {
    return new Response(JSON.stringify({ error: 'Archivo no válido' }), {
      status: 400,
    })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split('.').pop()
    const nombreArchivo = `${uuidv4()}.${ext}`
    const rutaArchivo = path.join(process.cwd(), 'public', 'uploads', nombreArchivo)

    await writeFile(rutaArchivo, buffer)

    const rutaImagen = `/uploads/${nombreArchivo}`

    // Conexión a la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'sarai3005',
      database: 'catalogo_alimento',
    })

    // Actualizar imagen_url del platillo
    await connection.execute(
      'UPDATE nombreplatillo SET imagen_url = ? WHERE id = ?',
      [rutaImagen, id]
    )

    // Obtener el platillo actualizado
    const [rows] = await connection.execute(
      'SELECT * FROM nombreplatillo WHERE id = ?',
      [id]
    )

    return Response.json(rows[0])
  } catch (error) {
    console.error('Error al guardar imagen:', error)
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
    })
  }
}
