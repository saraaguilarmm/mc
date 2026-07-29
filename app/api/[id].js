import { db } from '@/lib/db'

export default async function handler(req, res) {
  const { id } = req.query
  try {
    const [platillo] = await db.query('SELECT * FROM nombreplatillo WHERE id = ?', [id])
    if (!platillo || platillo.length === 0) {
      return res.status(404).json({ error: 'Platillo no encontrado' })
    }
    res.status(200).json(platillo[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener platillo' })
  }
}
