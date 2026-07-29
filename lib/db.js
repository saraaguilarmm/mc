// lib/db.js
import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sarai3005',
  database: 'catalogo_alimento',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default db
