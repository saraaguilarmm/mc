import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { usuario, calificacion, comentario } = body

    if (!usuario || !calificacion) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }

    // Ajustamos para que el campo 'correo' se llene con el valor de 'usuario'
    await db.execute(
      'INSERT INTO calificaciones (usuario, correo, calificacion, comentario) VALUES (?, ?, ?, ?)',
      [usuario, usuario, calificacion, comentario]
    )

    return NextResponse.json({ message: 'Calificación guardada con éxito' })
  } catch (error) {
    console.error('Error en calificación:', error)
    return NextResponse.json({ error: 'Error al guardar la calificación' }, { status: 500 })
  }
}
