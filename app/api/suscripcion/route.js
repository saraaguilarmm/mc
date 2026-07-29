import { db } from '@/lib/db'

export async function POST(req) {
  try {
    const { nombre, correo, numero_tarjeta } = await req.json()

    if (!nombre || !correo || !numero_tarjeta) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 })
    }

    await db.execute(
      'INSERT INTO suscripciones (nombre, correo, numero_tarjeta) VALUES (?, ?, ?)',
      [nombre, correo, numero_tarjeta]
    )

    return new Response(JSON.stringify({ message: 'Suscripción guardada con éxito' }), { status: 200 })
  } catch (error) {
    console.error('Error al guardar suscripción:', error)
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 })
  }
}
