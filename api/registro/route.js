import { db } from '@/lib/db'

export async function POST(req) {
  try {
    const { nombre, correo, contraseña } = await req.json()

    if (!nombre || !correo || !contraseña) {
      return Response.json({ error: 'Faltan datos' }, { status: 400 })
    }

    // Verificar si ya existe
    const [existe] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo])
    if (existe.length > 0) {
      return Response.json({ error: 'El correo ya está registrado' }, { status: 409 })
    }

    // Insertar en la tabla
    await db.execute('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)', [
      nombre,
      correo,
      contraseña
    ])

    return Response.json({ message: 'Registro exitoso' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
