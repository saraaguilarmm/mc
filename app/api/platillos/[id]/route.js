import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

// GET: Obtener un platillo por ID
export async function GET(req, context) {
  const params = await context.params
  const { id } = params

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  const [rows] = await connection.execute(
    'SELECT * FROM nombreplatillo WHERE id = ?',
    [id]
  )

  await connection.end()

  if (rows.length === 0) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}

// PUT: Actualizar platillo por ID
export async function PUT(req, context) {
  const params = await context.params
  const { id } = params
  const body = await req.json()
  const { nombre, descripcion, ciudad_id } = body

  if (!nombre || !descripcion || !ciudad_id) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 })
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  try {
    const [result] = await connection.execute(
      'UPDATE nombreplatillo SET nombre = ?, descripcion = ?, ciudad_id = ? WHERE id = ?',
      [nombre, descripcion, ciudad_id, id]
    )

    await connection.end()

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'No se encontró el platillo' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Actualizado correctamente' }, { status: 200 })
  } catch (err) {
    console.error('Error al actualizar:', err)
    await connection.end()
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

// DELETE: Eliminar un platillo por ID (y sus ingredientes relacionados)
export async function DELETE(req, context) {
  const params = await context.params
  const { id } = params

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  try {
    await connection.execute(
      'DELETE FROM platilloingrediente WHERE nombre_platillo_id = ?',
      [id]
    )

    const [result] = await connection.execute(
      'DELETE FROM nombreplatillo WHERE id = ?',
      [id]
    )

    await connection.end()

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Platillo no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Platillo eliminado' }, { status: 200 })
  } catch (err) {
    console.error('Error al eliminar platillo:', err)
    await connection.end()
    return NextResponse.json({ error: 'Error al eliminar platillo' }, { status: 500 })
  }
}


/*import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

export async function GET(req, context) {
  const { id } = context.params  // ❌ No uses `await` aquí

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  const [rows] = await connection.execute(
    'SELECT * FROM nombreplatillo WHERE id = ?',
    [id]
  )

  await connection.end()

  if (rows.length === 0) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}

export async function PUT(req, context) {
  const { id } = context.params
  const body = await req.json()

  const { nombre, descripcion, ciudad_id } = body

  // Validación para evitar undefined
  if (!nombre || !descripcion || !ciudad_id) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 })
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  try {
    const [result] = await connection.execute(
      'UPDATE nombreplatillo SET nombre = ?, descripcion = ?, ciudad_id = ? WHERE id = ?',
      [nombre, descripcion, ciudad_id, id]
    )

    return NextResponse.json({ message: 'Actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  } finally {
    await connection.end()
  }
}
*/

/*import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

export async function GET(req, context) {
  const { id } = context.params  // sin await aquí

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sarai3005',
    database: 'catalogo_alimento',
  })

  const [rows] = await connection.execute(
    'SELECT * FROM nombreplatillo WHERE id = ?',
    [id]
  )

  await connection.end()

  if (rows.length === 0) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}
*/