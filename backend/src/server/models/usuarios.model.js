const db = require('../database/db_connect.js')

const register = ({ nombre, apellido, email, pass, rol }) => {
  return db('INSERT INTO usuarios (usuario_id, nombre, apellido, email, pass, rol) VALUES (DEFAULT, $1, $2, $3, $4, $5);', [nombre, apellido, email, pass, rol])
}

// export const register = ({ nombre, apellido, email, pass, rol }) => db('INSERT INTO usuarios (usuario_id,nombre, apellido, email, pass, rol) VALUES (DEFAULT,$1,$2,$3,$4, "cliente");',[nombre, apellido,email, pass])

const login = ({ email, pass }) => {
  return db('SELECT usuario_id, nombre, apellido, rol FROM usuarios WHERE email = $1 and pass = $2;', [email, pass])
}

module.exports = {
  register,
  login
}
