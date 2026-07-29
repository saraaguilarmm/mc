import { NextResponse } from 'next/server'
import db from '@/lib/db'

// Obtener una receta por ID
export async function GET(_req, context) {
  const params = await context.params
  const { id } = params

  try {
    const [rows] = await db.query('SELECT * FROM misrecetas WHERE id = ?', [id])
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Error al obtener receta:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// Actualizar una receta por ID
export async function PUT(req, context) {
  const params = await context.params
  const { id } = params

  try {
    const body = await req.json()
    const { nombre, descripcion, ingredientes, imagen_url } = body

    const [result] = await db.query(
      `UPDATE misrecetas SET nombre = ?, descripcion = ?, ingredientes = ?, imagen_url = ? WHERE id = ?`,
      [nombre, descripcion, ingredientes, imagen_url, id]
    )

    return NextResponse.json({ message: 'Receta actualizada con éxito' })
  } catch (error) {
    console.error('Error al actualizar receta:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
// Eliminar una receta por ID
export async function DELETE(_req, context) {
  const params = await context.params
  const { id } = params

  try {
    const [result] = await db.query('DELETE FROM misrecetas WHERE id = ?', [id])
    return NextResponse.json({ message: 'Receta eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar receta:', error)
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
