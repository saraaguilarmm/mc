import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req) {
  const formData = await req.formData()
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const ingredientes = formData.get('ingredientes')
  const imagen = formData.get('imagen')

  if (!nombre || !descripcion || !ingredientes || !imagen) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  try {
    const bytes = await imagen.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const nombreArchivo = Date.now() + '-' + imagen.name.replace(/\s+/g, '-')
    const filePath = path.join(process.cwd(), 'public/uploads', nombreArchivo)

    await writeFile(filePath, buffer)
    const imagen_url = '/uploads/' + nombreArchivo

    await db.query(
      'INSERT INTO misrecetas (nombre, descripcion, ingredientes, imagen_url) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, ingredientes, imagen_url]
    )

    return NextResponse.json({ mensaje: 'Receta guardada correctamente' })
  } catch (error) {
    console.error('Error al guardar receta:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
