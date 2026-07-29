import { db } from '@/lib/db'

export async function POST(req) {
  try {
    const { correo, contraseña } = await req.json()

    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?',
      [correo, contraseña]
    )

    if (rows.length === 0) {
      return Response.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 })
    }

    return Response.json({ message: 'Inicio de sesión exitoso', usuario: rows[0] })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
