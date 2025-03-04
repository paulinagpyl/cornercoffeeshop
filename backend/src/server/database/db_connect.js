const pg = require('pg')

const { Pool } = pg

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)

pool.connect()
  // .then(() => console.log('✅ Conexión exitosa a PostgreSQL'))
  .catch((err) => console.error('❌ Error de conexión:', err.message, err.code))

const db = (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch((error) => {
    console.error('❌ Error en query:', error.message)
    return error
  })

module.exports = db
