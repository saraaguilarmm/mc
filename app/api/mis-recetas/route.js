import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { writeFile } from 'fs/promises'
import path from 'path'

// Obtener recetas
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM misrecetas ORDER BY fecha DESC')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error al obtener recetas:', error)
    return NextResponse.json({ error: 'Error al obtener recetas' }, { status: 500 })
  }
}

// Subir receta con imagen
export async function POST(req) {
  try {
    const formData = await req.formData()
    const nombre = formData.get('nombre')
    const descripcion = formData.get('descripcion')
    const ingredientes = formData.get('ingredientes')
    const imagen = formData.get('imagen')

    // Validar campos
    if (!nombre || !descripcion || !ingredientes || !imagen) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Guardar imagen localmente
    const bytes = await imagen.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${imagen.name.replaceAll(' ', '_')}`
    const filepath = path.join(process.cwd(), 'public/uploads', filename)

    await writeFile(filepath, buffer)
    const imagen_url = `/uploads/${filename}`

    // Insertar en la base de datos
    const [result] = await db.query(
      'INSERT INTO misrecetas (nombre, descripcion, ingredientes, imagen_url, fecha) VALUES (?, ?, ?, ?, NOW())',
      [nombre, descripcion, ingredientes, imagen_url]
    )

    return NextResponse.json({ id: result.insertId, message: 'Receta guardada' })
  } catch (error) {
    console.error('Error al guardar receta:', error)
    return NextResponse.json({ error: 'Error al guardar receta' }, { status: 500 })
  }
}
